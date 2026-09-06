export type HotspotArchetype =
  | 'emergency'
  | 'flare'
  | 'forest'
  | 'agro';

export type SensorSatellite =
  | 'VIIRS NOAA-20'
  | 'VIIRS SNPP'
  | 'Aqua MODIS'
  | 'Terra MODIS'
  | 'VIIRS NOAA-21';

export interface ThermalHotspot {
  id: string;
  signatureId: string;
  name: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  frpMw: number; // Fire Radiative Power in Megawatts
  brightnessTempK: number; // Kelvin (e.g. 488.2 K)
  satellite: SensorSatellite;
  detectionTimeIst: string;
  overpassType: 'Ascending' | 'Descending';
  landCoverCadastre: string;
  osmPolygonId: string;
  persistenceProb: number; // 0 to 1
  archetype: HotspotArchetype;
  confidenceScore: number; // e.g. 99.4%
  baselineFrpMw: number; // 30-day baseline average
  spikeFactor: number; // e.g. 8.5x
  interAgencyDirectives: string;
  alertLevel: 'TIER-1 CAT' | 'ROUTINE' | 'ELEVATED' | 'WATCH';
  historical30Day: { date: string; frp: number }[];
  osmBufferDistanceM: number;
  statusNotes: string;
}

export interface CadastralPolygon {
  id: string;
  name: string;
  type: 'industrial' | 'refinery' | 'forest' | 'farmland';
  coordinates: [number, number][]; // [lat, lng]
  fillColor: string;
  strokeColor: string;
  details: string;
}

export interface PassSchedule {
  satellite: string;
  instrument: string;
  resolution: string;
  nextPassIn: string;
  overpassRegion: string;
  snrDb: number;
}
