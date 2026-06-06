import type { BackdropType } from '../../../types/game';
import type { ComponentType } from 'react';

import ShipCorridor from './ShipCorridor';
import StationDock from './StationDock';
import AsteroidMine from './AsteroidMine';
import ReactorDeck from './ReactorDeck';
import Derelict from './Derelict';
import Airlock from './Airlock';
import MedicalBay from './MedicalBay';
import CommandDeck from './CommandDeck';
import SurfaceExterior from './SurfaceExterior';
import ServerRoom from './ServerRoom';
import BlackMarket from './BlackMarket';
import HabModule from './HabModule';
import EngineeringCrawl from './EngineeringCrawl';
import IndustrialPlatform from './IndustrialPlatform';
import CargoHold from './CargoHold';
import ResearchLab from './ResearchLab';
import PrisonBlock from './PrisonBlock';
import OrbitalApproach from './OrbitalApproach';

export interface BackdropProps {
  width?: number;
  height?: number;
}

export const BACKDROP_COMPONENTS: Record<BackdropType, ComponentType<BackdropProps>> = {
  'ship-corridor': ShipCorridor,
  'station-dock': StationDock,
  'asteroid-mine': AsteroidMine,
  'hab-module': HabModule,
  'reactor-deck': ReactorDeck,
  'derelict': Derelict,
  'airlock': Airlock,
  'medical-bay': MedicalBay,
  'command-deck': CommandDeck,
  'surface-exterior': SurfaceExterior,
  'black-market': BlackMarket,
  'prison-block': PrisonBlock,
  'server-room': ServerRoom,
  'engineering-crawl': EngineeringCrawl,
  'industrial-platform': IndustrialPlatform,
  'cargo-hold': CargoHold,
  'research-lab': ResearchLab,
  'orbital-approach': OrbitalApproach,
};

export const BACKDROP_LABELS: Record<BackdropType, string> = {
  'ship-corridor': 'Ship Corridor',
  'station-dock': 'Station Dock',
  'asteroid-mine': 'Asteroid Mine',
  'hab-module': 'Hab Module',
  'reactor-deck': 'Reactor Deck',
  'derelict': 'Derelict Hull',
  'airlock': 'Airlock',
  'medical-bay': 'Medical Bay',
  'command-deck': 'Command Deck',
  'surface-exterior': 'Planetary Surface',
  'black-market': 'Black Market',
  'prison-block': 'Prison Block',
  'server-room': 'Server Room / Relay Cache',
  'engineering-crawl': 'Engineering Crawlway',
  'industrial-platform': 'Industrial Platform',
  'cargo-hold': 'Cargo Hold',
  'research-lab': 'Research Laboratory',
  'orbital-approach': 'Orbital Approach',
};

export {
  ShipCorridor, StationDock, AsteroidMine, ReactorDeck,
  Derelict, Airlock, MedicalBay, CommandDeck, SurfaceExterior,
  ServerRoom, BlackMarket, HabModule, EngineeringCrawl,
  IndustrialPlatform, CargoHold, ResearchLab, PrisonBlock, OrbitalApproach,
};
