export const CAMPAIGN_LOCATION_CODEC = "nexus.campaign-location" as const;
export const CAMPAIGN_LOCATION_CODEC_VERSION = 1 as const;

export type EntityId = string;
export type Revision = number;

export interface Vector2 {
  readonly x: number;
  readonly y: number;
}

export interface Bounds {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface LocationArea {
  readonly id: EntityId;
  readonly label: string;
  readonly bounds: Bounds;
}

export interface LocationJoin {
  readonly id: EntityId;
  readonly fromAreaId: EntityId;
  readonly toAreaId: EntityId;
  readonly position: Vector2;
}

export interface NavigationPolygon {
  readonly id: EntityId;
  readonly areaId: EntityId;
  readonly vertices: readonly Vector2[];
}

export interface NavigationGraphNode {
  readonly id: EntityId;
  readonly areaId: EntityId;
  readonly position: Vector2;
}

export interface NavigationGraphEdge {
  readonly id: EntityId;
  readonly fromNodeId: EntityId;
  readonly toNodeId: EntityId;
}

/** The only navigation authority accepted by fixture version 2. */
export interface AuthoredPolygonGraph {
  readonly authority: "authored-polygon-graph";
  readonly polygons: readonly NavigationPolygon[];
  readonly nodes: readonly NavigationGraphNode[];
  readonly edges: readonly NavigationGraphEdge[];
}

export interface LocationModule {
  readonly id: EntityId;
  readonly areaId: EntityId;
}

export interface SolidGeometry {
  readonly id: EntityId;
  readonly areaId: EntityId;
  readonly vertices: readonly Vector2[];
}

export interface AuthoredCoverSide {
  readonly id: EntityId;
  readonly coverPositionId: EntityId;
  readonly direction: Direction;
}

export interface LocationBlueprint {
  readonly id: EntityId;
  readonly modules: readonly LocationModule[];
  readonly solids: readonly SolidGeometry[];
  readonly coverSides: readonly AuthoredCoverSide[];
}

export interface AuthoredPosition {
  readonly id: EntityId;
  readonly areaId: EntityId;
  readonly position: Vector2;
}

export interface LocationObject {
  readonly id: EntityId;
  readonly label: string;
  readonly areaId: EntityId;
  readonly position: Vector2;
  readonly interactionPositionId: EntityId;
  readonly contextActionIds?: readonly ContextActionId[];
}

export interface LocationHazard {
  readonly id: EntityId;
  readonly label: string;
  readonly areaId: EntityId;
  readonly position: Vector2;
  readonly active: boolean;
}

export interface LocationObjective {
  readonly id: EntityId;
  readonly label: string;
  readonly areaId: EntityId;
  readonly position: Vector2;
  readonly status: "active" | "complete";
}

export type Direction =
  | "north"
  | "north-east"
  | "east"
  | "south-east"
  | "south"
  | "south-west"
  | "west"
  | "north-west";

export type Facing = Direction;

export interface ActorMovement {
  readonly path: readonly Vector2[];
  readonly interactionTargetId: EntityId | null;
}

export interface SpatialActor {
  readonly id: EntityId;
  readonly label: string;
  readonly areaId: EntityId;
  readonly position: Vector2;
  readonly facing: Facing;
  readonly semanticAnimation: "idle" | "walk";
  readonly animationStartedAtFrame: number;
  readonly moveSpeedUnitsPerSecond: number;
  readonly moveTarget: Vector2 | null;
  readonly movement?: ActorMovement | null;
  readonly partyRole?: "player-character" | "follower";
}

export interface CameraIntent {
  readonly mode: "follow-selected";
  readonly targetActorId: EntityId;
  readonly tiltDegrees: number;
  readonly framingScale: number;
}

export interface LocationState {
  readonly id: EntityId;
  readonly fixtureVersion: number;
  readonly label: string;
  readonly areas: readonly LocationArea[];
  readonly joins: readonly LocationJoin[];
  /** Version 1 fixtures retain their polygon list; version 2 requires the graph form. */
  readonly navigation: readonly NavigationPolygon[] | AuthoredPolygonGraph;
  readonly blueprint?: LocationBlueprint;
  readonly interactionPositions: readonly AuthoredPosition[];
  readonly coverPositions: readonly AuthoredPosition[];
  readonly objects: readonly LocationObject[];
  readonly hazards: readonly LocationHazard[];
  readonly objectives: readonly LocationObjective[];
  /** Additive transaction evidence; absent v1 payloads normalize to an empty list. */
  readonly contextActionTransactions?: readonly CommittedContextActionTransaction[];
  readonly actors: readonly SpatialActor[];
  readonly selectedActorId: EntityId;
  readonly camera: CameraIntent;
}

export interface CampaignLocationState {
  readonly campaignId: EntityId;
  readonly activeLocationId: EntityId;
  readonly committedRevision: Revision;
  readonly lastDurableRevision: Revision;
  readonly frame: number;
  readonly location: LocationState;
}

export interface CampaignLocationEnvelopeV1 {
  readonly format: typeof CAMPAIGN_LOCATION_CODEC;
  readonly version: typeof CAMPAIGN_LOCATION_CODEC_VERSION;
  readonly extensions: Readonly<Record<string, unknown>>;
  readonly payload: CampaignLocationState;
}

interface CommandBase {
  readonly commandId: string;
  readonly expectedRevision: Revision;
}

export interface MoveActorCommand extends CommandBase {
  readonly type: "actor.move";
  readonly actorId: EntityId;
  readonly destination: Vector2;
}

export interface MoveActorDirectionCommand extends CommandBase {
  readonly type: "actor.move-direction";
  readonly actorId: EntityId;
  readonly direction: Direction;
  readonly distance: number;
}

export interface PathActorToObjectCommand extends CommandBase {
  readonly type: "actor.path-to-object";
  readonly actorId: EntityId;
  readonly objectId: EntityId;
}

export interface SelectActorCommand extends CommandBase {
  readonly type: "actor.select";
  readonly actorId: EntityId;
}

export type SpatialCommand =
  | MoveActorCommand
  | MoveActorDirectionCommand
  | PathActorToObjectCommand
  | SelectActorCommand;

export type ContextActionId = "relay.isolate-cable-feed" | "relay.activate";

export interface ContextActionInputEnvelope {
  readonly actionId: ContextActionId;
  readonly inputId: string;
  readonly intentLineageId: string;
  readonly entrySurface: "context_action_menu";
  readonly truthRevision: Revision;
  readonly locationId: EntityId;
  readonly actorId: EntityId;
  readonly targetObjectId: EntityId;
  readonly actionSurfaceId: ContextActionId;
  readonly interactionPositionId: EntityId;
}

export type ContextActionEffect =
  | {
      readonly type: "hazard.isolated";
      readonly hazardId: "exposed-cable";
    }
  | {
      readonly type: "objective.completed";
      readonly objectiveId: "activate-relay";
    };

export type ContextActionStateDelta =
  | {
      readonly operation: "hazard.set-active";
      readonly targetId: "exposed-cable";
      readonly expectedBefore: true;
      readonly value: false;
    }
  | {
      readonly operation: "objective.set-status";
      readonly targetId: "activate-relay";
      readonly expectedBefore: "active";
      readonly value: "complete";
    };

export interface CommittedContextActionTransaction {
  readonly transactionId: string;
  readonly inputId: string;
  readonly intentLineageId: string;
  readonly actionId: ContextActionId;
  readonly actorId: EntityId;
  readonly targetObjectId: EntityId;
  readonly declaredRevision: Revision;
  readonly committedRevision: Revision;
  readonly check: "not-required";
  readonly effects: readonly ContextActionEffect[];
  readonly stateDeltas: readonly ContextActionStateDelta[];
  readonly presentation: string;
}

export interface ContextActionMenuItemProjection {
  readonly actionId: ContextActionId;
  readonly label: string;
  readonly status: "available" | "blocked" | "completed";
  readonly reason: string | null;
}

export interface ContextActionMenuProjection {
  readonly locationId: EntityId;
  readonly actorId: EntityId;
  readonly targetObjectId: EntityId;
  readonly targetLabel: string;
  readonly interactionPositionId: EntityId;
  readonly actions: readonly ContextActionMenuItemProjection[];
}

export interface ContextActionResult {
  readonly accepted: boolean;
  readonly status: "committed" | "duplicate" | "rejected";
  readonly message: string;
  readonly transaction: CommittedContextActionTransaction | null;
  readonly snapshot: CampaignLocationState;
}

/** A single rolling durable checkpoint lane. Browser and test adapters share it. */
export interface CampaignCheckpointAdapter {
  load(): string | null;
  serialize(state: CampaignLocationState): string;
  write(serialized: string): void;
}

export interface CheckpointResult {
  readonly saved: boolean;
  readonly message: string;
  readonly snapshot: CampaignLocationState;
}

export type RuntimeEvent =
  | {
      readonly type: "command.committed";
      readonly sequence: number;
      readonly revision: Revision;
      readonly commandId: string;
      readonly commandType: SpatialCommand["type"];
    }
  | {
      readonly type: "command.rejected";
      readonly sequence: number;
      readonly revision: Revision;
      readonly commandId: string;
      readonly reason: string;
    }
  | {
      readonly type: "frame.committed";
      readonly sequence: number;
      readonly revision: Revision;
      readonly frame: number;
      readonly deltaMs: number;
    }
  | {
      readonly type: "checkpoint.committed";
      readonly sequence: number;
      readonly revision: Revision;
      readonly durableRevision: Revision;
    }
  | {
      readonly type: "checkpoint.failed";
      readonly sequence: number;
      readonly revision: Revision;
      readonly reason: string;
    }
  | {
      readonly type: "checkpoint.restored";
      readonly sequence: number;
      readonly revision: Revision;
      readonly durableRevision: Revision;
    }
  | {
      readonly type: "context-action.committed";
      readonly sequence: number;
      readonly revision: Revision;
      readonly actionId: ContextActionId;
    };

export interface CommandResult {
  readonly accepted: boolean;
  readonly event: RuntimeEvent;
  readonly snapshot: CampaignLocationState;
}

export interface RenderActorProjection {
  readonly id: EntityId;
  readonly label: string;
  readonly x: number;
  readonly y: number;
  readonly facing: Facing;
  readonly semanticAnimation: SpatialActor["semanticAnimation"];
}

export interface RenderAreaProjection {
  readonly id: EntityId;
  readonly label: string;
  readonly bounds: Bounds;
}

export interface RenderDoorProjection {
  readonly id: EntityId;
  readonly x: number;
  readonly y: number;
}

export interface RenderInteractableProjection {
  readonly id: EntityId;
  readonly label: string;
  readonly x: number;
  readonly y: number;
}

export interface RenderMarkerProjection {
  readonly id: EntityId;
  readonly label: string;
  readonly x: number;
  readonly y: number;
  readonly active: boolean;
}

export interface RenderProjection {
  readonly revision: Revision;
  readonly frame: number;
  readonly locationId: EntityId;
  readonly areas: readonly RenderAreaProjection[];
  readonly doors: readonly RenderDoorProjection[];
  readonly actors: readonly RenderActorProjection[];
  readonly interactables: readonly RenderInteractableProjection[];
  readonly hazards: readonly RenderMarkerProjection[];
  readonly objectives: readonly RenderMarkerProjection[];
  readonly camera: CameraIntent;
}

export interface ShellProjection {
  readonly revision: Revision;
  readonly durableRevision: Revision;
  readonly locationLabel: string;
  readonly selectedActor: RenderActorProjection;
  readonly actors: readonly RenderActorProjection[];
  readonly camera: CameraIntent;
  readonly saveStatus: "durable" | "not-yet-durable" | "degraded";
  readonly relay: {
    readonly cableFeedIsolated: boolean;
    readonly activated: boolean;
  };
  readonly actionMessage: string | null;
  readonly durabilityMessage: string | null;
  readonly canRetryCheckpoint: boolean;
}

export interface DeveloperProjection {
  readonly committedRevision: Revision;
  readonly lastDurableRevision: Revision;
  readonly frame: number;
  readonly selectedActorId: EntityId;
  readonly camera: CameraIntent;
  readonly lastEvent: RuntimeEvent | null;
  readonly lastTransaction: CommittedContextActionTransaction | null;
}

export interface SpatialRuntime {
  dispatch(command: SpatialCommand): CommandResult;
  step(deltaMs: number): CampaignLocationState;
  hasActiveMovement(): boolean;
  getContextActionMenu(
    actorId: EntityId,
    targetObjectId: EntityId,
  ): ContextActionMenuProjection | null;
  resolveContextAction(input: ContextActionInputEnvelope): ContextActionResult;
  checkpoint(): CheckpointResult;
  retryCheckpoint(): CheckpointResult;
  continueFromCheckpoint(): CheckpointResult;
  getSnapshot(): CampaignLocationState;
  getRenderProjection(): RenderProjection;
  getShellProjection(): ShellProjection;
  getDeveloperProjection(): DeveloperProjection;
  subscribe(listener: (event: RuntimeEvent) => void): () => void;
}
