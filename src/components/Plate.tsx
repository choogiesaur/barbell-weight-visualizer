import { getPlateColor } from '../utils/calculatePlates';

interface PlateProps {
  weight: number;
}

// Get thickness based on weight (width of the plate)
function getPlateThickness(weight: number): number {
  switch (weight) {
    case 45:
      return 20; // thickest
    case 35:
      return 18;
    case 25:
      return 16;
    case 10:
      return 12;
    case 5:
    case 2.5:
      return 6; // small plates same thickness
    default:
      return 8;
  }
}

// Get height based on weight
function getPlateHeight(weight: number): number {
  if (weight === 5 || weight === 2.5) {
    return 48; // half height for smallest plates
  }
  return 96; // standard height for 45, 35, 25, 10
}

export function Plate({ weight }: PlateProps) {
  const colorClass = getPlateColor(weight);
  const thickness = getPlateThickness(weight);
  const height = getPlateHeight(weight);

  return (
    <div
      className={`${colorClass} rounded-lg shadow-sm`}
      style={{
        width: `${thickness}px`,
        height: `${height}px`,
      }}
    />
  );
}

