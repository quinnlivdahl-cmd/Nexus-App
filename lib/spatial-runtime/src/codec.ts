import { cloneValue, immutableCopy } from "./immutable.js";
import { validateCampaignLocationState } from "./fixture.js";
import {
  CAMPAIGN_LOCATION_CODEC,
  CAMPAIGN_LOCATION_CODEC_VERSION,
  type CampaignLocationEnvelopeV1,
  type CampaignLocationState,
} from "./types.js";

export type DecodeCampaignLocationResult =
  | {
      readonly ok: true;
      readonly state: CampaignLocationState;
      readonly extensions: Readonly<Record<string, unknown>>;
    }
  | { readonly ok: false; readonly error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasLocationShape(value: unknown): value is CampaignLocationState {
  if (!isRecord(value) || !isRecord(value.location)) return false;
  const location = value.location;
  return (
    typeof value.campaignId === "string" &&
    typeof value.activeLocationId === "string" &&
    typeof value.committedRevision === "number" &&
    typeof value.lastDurableRevision === "number" &&
    typeof value.frame === "number" &&
    typeof location.id === "string" &&
    Array.isArray(location.areas) &&
    Array.isArray(location.joins) &&
    Array.isArray(location.navigation) &&
    Array.isArray(location.interactionPositions) &&
    Array.isArray(location.coverPositions) &&
    Array.isArray(location.objects) &&
    Array.isArray(location.hazards) &&
    Array.isArray(location.objectives) &&
    Array.isArray(location.actors) &&
    typeof location.selectedActorId === "string" &&
    isRecord(location.camera)
  );
}

export function encodeCampaignLocation(
  state: CampaignLocationState,
  extensions: Readonly<Record<string, unknown>> = {},
): string {
  const validation = validateCampaignLocationState(state);
  if (!validation.ok) {
    throw new Error(`Campaign/Location state is invalid: ${validation.issues.join(" ")}`);
  }

  const envelope: CampaignLocationEnvelopeV1 = {
    format: CAMPAIGN_LOCATION_CODEC,
    version: CAMPAIGN_LOCATION_CODEC_VERSION,
    extensions: cloneValue(extensions),
    payload: cloneValue(state),
  };
  return JSON.stringify(envelope);
}

export function decodeCampaignLocation(raw: string): DecodeCampaignLocationResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Save data is not valid JSON." };
  }

  if (!isRecord(parsed) || parsed.format !== CAMPAIGN_LOCATION_CODEC) {
    return { ok: false, error: `Save data must use format ${CAMPAIGN_LOCATION_CODEC}.` };
  }
  if (parsed.version !== CAMPAIGN_LOCATION_CODEC_VERSION) {
    return { ok: false, error: `Unsupported Campaign/Location codec version ${String(parsed.version)}.` };
  }
  if (!isRecord(parsed.extensions)) {
    return { ok: false, error: "Save data extensions must be an object." };
  }
  if (!hasLocationShape(parsed.payload)) {
    return { ok: false, error: "Save data is missing required Campaign/Location fields." };
  }

  try {
    const validation = validateCampaignLocationState(parsed.payload);
    if (!validation.ok) {
      return { ok: false, error: `Campaign/Location state is invalid: ${validation.issues.join(" ")}` };
    }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Campaign/Location validation failed." };
  }

  return {
    ok: true,
    state: immutableCopy(parsed.payload) as CampaignLocationState,
    extensions: immutableCopy(parsed.extensions),
  };
}
