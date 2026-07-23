import type { GlobeConfig } from '@/components/ui/globe'

/** Hanoi HQ — arcs radiate outward for the contact “global reach” visual. */
const HANOI = { lat: 21.0285, lng: 105.8542 }

const ARC_COLOR = '#b8d4c4'

export const CONTACT_GLOBE_CONFIG: GlobeConfig = {
  pointSize: 1.25,
  globeColor: '#243a31',
  showAtmosphere: true,
  atmosphereColor: '#9bb8a4',
  atmosphereAltitude: 0.18,
  emissive: '#3d5c4a',
  emissiveIntensity: 0.55,
  shininess: 0.7,
  polygonColor: 'rgba(210, 230, 218, 0.92)',
  ambientLight: '#ffffff',
  directionalLeftLight: '#f2f7f4',
  directionalTopLight: '#a8c4b4',
  pointLight: '#ffffff',
  arcTime: 2400,
  arcLength: 0.85,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.65,
  initialPosition: { lat: HANOI.lat, lng: HANOI.lng },
}

export const CONTACT_GLOBE_ARCS = [
  {
    order: 1,
    startLat: HANOI.lat,
    startLng: HANOI.lng,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.18,
    color: ARC_COLOR,
  },
  {
    order: 1,
    startLat: HANOI.lat,
    startLng: HANOI.lng,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.28,
    color: ARC_COLOR,
  },
  {
    order: 2,
    startLat: HANOI.lat,
    startLng: HANOI.lng,
    endLat: 37.5665,
    endLng: 126.978,
    arcAlt: 0.22,
    color: ARC_COLOR,
  },
  {
    order: 2,
    startLat: HANOI.lat,
    startLng: HANOI.lng,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.35,
    color: ARC_COLOR,
  },
  {
    order: 3,
    startLat: HANOI.lat,
    startLng: HANOI.lng,
    endLat: 48.8566,
    endLng: 2.3522,
    arcAlt: 0.42,
    color: ARC_COLOR,
  },
  {
    order: 3,
    startLat: HANOI.lat,
    startLng: HANOI.lng,
    endLat: 52.52,
    endLng: 13.405,
    arcAlt: 0.4,
    color: ARC_COLOR,
  },
  {
    order: 4,
    startLat: HANOI.lat,
    startLng: HANOI.lng,
    endLat: 38.9072,
    endLng: -77.0369,
    arcAlt: 0.48,
    color: ARC_COLOR,
  },
  {
    order: 4,
    startLat: HANOI.lat,
    startLng: HANOI.lng,
    endLat: 25.2048,
    endLng: 55.2708,
    arcAlt: 0.32,
    color: ARC_COLOR,
  },
]
