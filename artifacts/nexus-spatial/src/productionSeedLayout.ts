export interface ProductionSeedLayoutArea {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface ProductionSeedLayout {
  readonly unit: number;
  readonly left: number;
  readonly top: number;
}

export const DESKTOP_OVERVIEW_UNIT = 40;
export const FIXED_CAMERA_TILT_DEGREES = 10;
export const FIXED_CAMERA_FRAMING_SCALE = 0.82;
const UNFRAMED_DESKTOP_OVERVIEW_UNIT = DESKTOP_OVERVIEW_UNIT / FIXED_CAMERA_FRAMING_SCALE;
const RESPONSIVE_MIN_UNIT = 16;
const RESPONSIVE_MAX_UNIT = 36;
const HORIZONTAL_GUTTER = 64;
const VERTICAL_GUTTER = 92;
const VERTICAL_OPTICAL_OFFSET = 10;

function pixel(value: number): number {
  return Math.round(value);
}

export function deriveProductionSeedLayout(
  viewportWidth: number,
  viewportHeight: number,
  areas: readonly ProductionSeedLayoutArea[],
  desktopOverview: boolean,
  framingScale = FIXED_CAMERA_FRAMING_SCALE,
): ProductionSeedLayout {
  if (areas.length === 0) return { unit: RESPONSIVE_MIN_UNIT, left: 0, top: 0 };

  const minimumX = Math.min(...areas.map((area) => area.x));
  const minimumY = Math.min(...areas.map((area) => area.y));
  const maximumX = Math.max(...areas.map((area) => area.x + area.width));
  const maximumY = Math.max(...areas.map((area) => area.y + area.height));
  const worldWidth = Math.max(1, maximumX - minimumX);
  const worldHeight = Math.max(1, maximumY - minimumY);
  const unit = desktopOverview
    ? pixel(UNFRAMED_DESKTOP_OVERVIEW_UNIT * framingScale)
    : pixel(Math.max(
      RESPONSIVE_MIN_UNIT,
      Math.min(
        RESPONSIVE_MAX_UNIT,
        (viewportWidth - HORIZONTAL_GUTTER) / worldWidth,
        (viewportHeight - VERTICAL_GUTTER) / worldHeight,
      ),
    ));

  return {
    unit,
    left: pixel((viewportWidth - worldWidth * unit) / 2 - minimumX * unit),
    top: pixel((viewportHeight - worldHeight * unit) / 2 - minimumY * unit) + VERTICAL_OPTICAL_OFFSET,
  };
}
