import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { createRoot } from 'react-dom/client';
import { Application, Container, Graphics, Text } from 'pixi.js';
import './styles.css';

type Mode = 'Free Movement' | 'Tactical Pressure' | 'Turn-Based Mode' | 'Local Aftermath';
type Point = { x: number; y: number };
type Actor = { id: string; name: string; role: 'crew' | 'hostile'; position: Point; color: number };
type WorldState = {
  mode: Mode;
  actors: Actor[];
  hazard: { id: string; active: boolean; position: Point };
  objective: { id: string; status: 'unresolved' | 'secured'; position: Point };
  door: { id: string; state: 'sealed' | 'open'; position: Point };
  camera: { angle: 10; zoom: number; focus: Point };
  turn: number;
  activeActorId: string | null;
  log: string[];
};

const initialActors: Actor[] = [
  { id: 'actor:captain', name: 'Captain', role: 'crew', position: { x: 270, y: 335 }, color: 0x58c7d9 },
  { id: 'actor:vale', name: 'Vale', role: 'crew', position: { x: 235, y: 370 }, color: 0xe6c66a },
  { id: 'actor:rook', name: 'Rook', role: 'crew', position: { x: 305, y: 375 }, color: 0xc78ed8 },
  { id: 'actor:warden', name: 'Warden', role: 'hostile', position: { x: 610, y: 255 }, color: 0xe86452 },
];

const initialState = (): WorldState => ({
  mode: 'Free Movement', actors: structuredClone(initialActors),
  hazard: { id: 'hazard:coolant-arc', active: true, position: { x: 515, y: 335 } },
  objective: { id: 'objective:flight-recorder', status: 'unresolved', position: { x: 680, y: 365 } },
  door: { id: 'object:pressure-door', state: 'sealed', position: { x: 430, y: 300 } },
  camera: { angle: 10, zoom: 0.82, focus: { x: 450, y: 300 } }, turn: 0, activeActorId: null,
  log: ['Location loaded once: derelict/sable-echo'],
});

function nextState(s: WorldState): WorldState {
  if (s.mode === 'Free Movement') return { ...s, mode: 'Tactical Pressure', camera: { ...s.camera, zoom: 1.7 }, log: [...s.log, 'Pressure detected in-place; exact world positions captured'] };
  if (s.mode === 'Tactical Pressure') return { ...s, mode: 'Turn-Based Mode', turn: 1, activeActorId: 'actor:captain', log: [...s.log, 'Initiative fixed: Captain > Warden > Vale > Rook > coolant arc'] };
  if (s.mode === 'Turn-Based Mode') return {
    ...s, mode: 'Local Aftermath', turn: 0, activeActorId: null,
    actors: s.actors.map(a => a.id === 'actor:captain' ? { ...a, position: { x: 590, y: 315 } } : a.id === 'actor:warden' ? { ...a, position: { x: 650, y: 250 } } : a),
    hazard: { ...s.hazard, active: false }, objective: { ...s.objective, status: 'secured' }, door: { ...s.door, state: 'open' },
    log: [...s.log, 'Turn actions committed directly to Location truth', 'Aftermath: arc disabled, recorder secured, pressure door opened'],
  };
  return { ...s, mode: 'Free Movement', camera: { ...s.camera, zoom: 0.82, focus: s.actors.find(a => a.id === 'actor:captain')?.position ?? s.camera.focus }, log: [...s.log, 'Free Movement resumed in the changed Location'] };
}

type RuntimeCommand = 'advance' | 'reset';

class ContinuityRuntime {
  private snapshot = initialState();
  private listeners = new Set<() => void>();

  getSnapshot = () => this.snapshot;
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  dispatch(command: RuntimeCommand) {
    this.snapshot = command === 'reset' ? initialState() : nextState(this.snapshot);
    this.listeners.forEach(listener => listener());
  }
}

const runtime = new ContinuityRuntime();

function PixiLocation({ state }: { state: WorldState }) {
  const host = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const stateRef = useRef(state); stateRef.current = state;
  useEffect(() => {
    if (!host.current) return;
    let cancelled = false;
    let initialized = false;
    const app = new Application(); appRef.current = app;
    void app.init({ resizeTo: host.current, antialias: true, background: '#0b1116', resolution: window.devicePixelRatio || 1, autoDensity: true }).then(() => {
      initialized = true;
      if (cancelled || !host.current) return app.destroy(true);
      host.current.appendChild(app.canvas);
      const render = () => {
        const s = stateRef.current; app.stage.removeChildren();
        const world = new Container(); app.stage.addChild(world);
        const sx = app.screen.width / 900, sy = app.screen.height / 600; world.scale.set(Math.min(sx, sy));
        const room = (x:number,y:number,w:number,h:number,c:number) => world.addChild(new Graphics().roundRect(x,y,w,h,8).fill(c).stroke({ color: 0x52606a, width: 2 }));
        room(70,110,310,380,0x182329); room(380,190,150,220,0x202b30); room(530,90,300,400,0x172126);
        world.addChild(new Graphics().rect(430,190,10,220).fill(s.door.state === 'open' ? 0x3d8c72 : 0xc0843d));
        if (s.hazard.active) world.addChild(new Graphics().circle(s.hazard.position.x,s.hazard.position.y,34).fill({color:0x4db7e5,alpha:.24}).stroke({color:0x6ed7ff,width:4}));
        world.addChild(new Graphics().star(s.objective.position.x,s.objective.position.y,5,16,7).fill(s.objective.status === 'secured' ? 0x5bbf87 : 0xf0cc5e));
        for (const a of s.actors) {
          world.addChild(new Graphics().circle(a.position.x,a.position.y,18).fill(a.color).stroke({color:a.id===s.activeActorId?0xffffff:0x0b1116,width:a.id===s.activeActorId?5:3}));
          const label = new Text({ text: a.name, style: { fill: 0xeaf1f3, fontSize: 13, fontFamily: 'Arial' } }); label.anchor.set(.5,0); label.position.set(a.position.x,a.position.y+22); world.addChild(label);
        }
        if (s.mode !== 'Free Movement') world.addChild(new Graphics().rect(0,0,900,600).stroke({color:0xe38b57,width:12,alpha:.8}));
      };
      app.ticker.add(render);
    });
    return () => { cancelled = true; appRef.current = null; if (initialized) app.destroy(true); };
  }, []);
  return <div className="viewport" ref={host} />;
}

function App() {
  const state = useSyncExternalStore(runtime.subscribe, runtime.getSnapshot);
  const before = initialActors;
  const label = state.mode === 'Free Movement' && state.log.length > 1 ? 'Run again' : state.mode === 'Free Movement' ? 'Trigger pressure' : state.mode === 'Tactical Pressure' ? 'Begin turns' : state.mode === 'Turn-Based Mode' ? 'Resolve pressure' : 'Resume movement';
  return <main>
    <header><div><p className="eyebrow">THROWAWAY PROTOTYPE / CONTINUITY TEST</p><h1>Sable Echo Derelict</h1></div><div className="mode"><span>{state.mode}</span><b>Camera {state.camera.angle}° / {state.camera.zoom.toFixed(2)}x</b></div></header>
    <section className="workspace"><div className="playfield"><PixiLocation state={state}/><div className="legend"><span className="crew">Field Team</span><span className="hostile">Hostile</span><span className="hazard">Hazard</span><span className="objective">Objective</span></div></div>
      <aside><h2>Game Truth</h2><p className="location-id">location:derelict/sable-echo</p><div className="facts">
        <Fact label="Scene loads" value="1"/><Fact label="Mode" value={state.mode}/><Fact label="Turn" value={state.turn ? String(state.turn) : 'n/a'}/><Fact label="Door" value={state.door.state}/><Fact label="Hazard" value={state.hazard.active?'active':'disabled'}/><Fact label="Objective" value={state.objective.status}/>
      </div><h3>Stable actor identity / position</h3><div className="actors">{state.actors.map((a,i)=><div key={a.id}><code>{a.id}</code><span>{before[i].position.x},{before[i].position.y} → {a.position.x},{a.position.y}</span></div>)}</div>
      <h3>Commit log</h3><ol>{state.log.map((line,i)=><li key={i}>{line}</li>)}</ol></aside></section>
    <footer><button onClick={()=>runtime.dispatch('reset')}>Reset Location</button><button className="primary" onClick={()=>runtime.dispatch(state.mode==='Free Movement'&&state.log.length>1?'reset':'advance')}>{label}</button></footer>
  </main>;
}
function Fact({label,value}:{label:string,value:string}) { return <div><span>{label}</span><b>{value}</b></div>; }
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
