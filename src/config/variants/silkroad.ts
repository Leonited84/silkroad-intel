// Silk Road Intel variant — MENA-China trade corridor focus
// Derived from commodity variant, narrowed to Arab importer → China supplier flows
import type { PanelConfig, MapLayers } from '@/types';

// Re-export base config
export * from './base';

// Commodity-specific data exports
export { COMMODITY_SECTORS, COMMODITY_PRICES, COMMODITY_MARKET_SYMBOLS } from '@/config/commodity-markets';
export type { MineralType, MineSiteStatus, MineSite, ProcessingPlant, CommodityPort } from '@/config/commodity-geo';
export { MINING_SITES, PROCESSING_PLANTS, COMMODITY_PORTS } from '@/config/commodity-geo';

// ─────────────────────────────────────────────────────────────────────────────
// PANEL CONFIGURATION — MENA-China corridor only
// ─────────────────────────────────────────────────────────────────────────────
export const DEFAULT_PANELS: Record<string, PanelConfig> = {
  // Core
  map: { name: 'Trade Corridor Map', enabled: true, priority: 1 },
  'live-news': { name: 'MENA Trade Headlines', enabled: true, priority: 1 },
  // Markets
  commodities: { name: 'Live Commodity Prices', enabled: true, priority: 1 },
  'macro-signals': { name: 'Market Radar', enabled: true, priority: 1 },
  // Trade corridor feeds
  'gulf-economies': { name: 'Gulf & OPEC Economies', enabled: true, priority: 1 },
  'china-trade': { name: 'China Export & Factory Data', enabled: true, priority: 1 },
  'halal-food': { name: 'Halal Food & Agri Trade', enabled: true, priority: 1 },
  'energy': { name: 'Energy Markets', enabled: true, priority: 1 },
  'base-metals': { name: 'Base Metals (Cu, Al, Zn, Ni)', enabled: true, priority: 1 },
  'critical-minerals': { name: 'Critical Minerals & Battery Metals', enabled: true, priority: 1 },
  'mining-news': { name: 'Mining & Materials', enabled: true, priority: 2 },
  // Operations & supply
  'supply-chain': { name: 'Shipping & Chokepoints', enabled: true, priority: 1 },
  'commodity-regulation': { name: 'Trade Policy & Compliance', enabled: true, priority: 2 },
  'sanctions': { name: 'Sanctions & Tariffs Monitor', enabled: true, priority: 2 },
  // Regional
  'gcc-investments': { name: 'GCC Sovereign Investment', enabled: true, priority: 2 },
  // Tracking
  monitors: { name: 'My Monitors', enabled: true, priority: 2 },
};

// ─────────────────────────────────────────────────────────────────────────────
// MAP LAYERS — MENA-China corridor focused
// ─────────────────────────────────────────────────────────────────────────────
export const DEFAULT_MAP_LAYERS: MapLayers = {
  // ── Core trade corridor layers (ENABLED) ────────────────────────────────────
  minerals: true,           // Critical minerals projects
  miningSites: true,        // Mine sites
  processingPlants: true,   // Smelters, refineries
  commodityPorts: true,     // MENA & China ports
  commodityHubs: true,      // Commodity exchanges
  pipelines: true,          // Oil & gas pipelines
  waterways: true,          // Strategic shipping chokepoints
  tradeRoutes: true,        // MENA-China trade routes
  natural: true,            // Natural events affecting trade
  weather: true,            // Weather impacting shipping

  // ── Shipping & tracking ─────────────────────────────────────────────────────
  ais: true,                // Tanker & bulk carrier tracking

  // ── Infrastructure ──────────────────────────────────────────────────────────
  cables: true,             // Undersea cables (trade comms)
  outages: true,            // Power outages affect operations

  // ── Sanctions & compliance ──────────────────────────────────────────────────
  sanctions: true,          // Sanctions impact trade
  economic: true,           // Economic centers = demand signals

  // ── Environmental risk ──────────────────────────────────────────────────────
  fires: true,              // Fires near operations
  climate: true,            // Climate events disrupt supply chains

  // ── All other layers (DISABLED) ─────────────────────────────────────────────
  gpsJamming: false,
  satellites: false,
  iranAttacks: false,
  conflicts: false,
  bases: false,
  hotspots: false,
  nuclear: false,
  irradiators: false,
  military: false,
  spaceports: false,
  ucdpEvents: false,
  displacement: false,
  protests: false,
  flights: false,
  datacenters: false,
  startupHubs: false,
  cloudRegions: false,
  accelerators: false,
  techHQs: false,
  techEvents: false,
  stockExchanges: false,
  financialCenters: false,
  centralBanks: false,
  gulfInvestments: false,
  positiveEvents: false,
  kindness: false,
  happiness: false,
  speciesRecovery: false,
  renewableInstallations: false,
  dayNight: false,
  cyberThreats: false,
  ciiChoropleth: false,
  resilienceScore: false,
  webcams: false,
  diseaseOutbreaks: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE MAP LAYERS — Minimal set for trade corridor mobile view
// ─────────────────────────────────────────────────────────────────────────────
export const MOBILE_DEFAULT_MAP_LAYERS: MapLayers = {
  minerals: true,
  miningSites: true,
  processingPlants: false,
  commodityPorts: false,
  commodityHubs: true,
  pipelines: false,
  waterways: false,
  tradeRoutes: false,
  natural: true,
  weather: false,
  ais: true,
  cables: false,
  outages: false,
  sanctions: false,
  economic: false,
  fires: false,
  climate: false,
  gpsJamming: false,
  satellites: false,
  iranAttacks: false,
  conflicts: false,
  bases: false,
  hotspots: false,
  nuclear: false,
  irradiators: false,
  military: false,
  spaceports: false,
  ucdpEvents: false,
  displacement: false,
  protests: false,
  flights: false,
  datacenters: false,
  startupHubs: false,
  cloudRegions: false,
  accelerators: false,
  techHQs: false,
  techEvents: false,
  stockExchanges: false,
  financialCenters: false,
  centralBanks: false,
  gulfInvestments: false,
  positiveEvents: false,
  kindness: false,
  happiness: false,
  speciesRecovery: false,
  renewableInstallations: false,
  dayNight: false,
  cyberThreats: false,
  ciiChoropleth: false,
  resilienceScore: false,
  webcams: false,
  diseaseOutbreaks: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// PANEL LAYOUTS — Desktop: grid positions for trade corridor panels
// Priority 1 panels are larger; priority 2 are smaller side panels.
// ─────────────────────────────────────────────────────────────────────────────
export const DEFAULT_PANEL_LAYOUT = {
  main: [
    { id: 'map', x: 0, y: 0, w: 8, h: 6 },
    { id: 'supply-chain', x: 8, y: 0, w: 4, h: 4 },
    { id: 'commodities', x: 8, y: 4, w: 4, h: 4 },
    { id: 'live-news', x: 0, y: 6, w: 6, h: 4 },
    { id: 'china-trade', x: 6, y: 6, w: 6, h: 4 },
    { id: 'gulf-economies', x: 0, y: 10, w: 4, h: 4 },
    { id: 'energy', x: 4, y: 10, w: 4, h: 4 },
    { id: 'base-metals', x: 8, y: 10, w: 4, h: 4 },
  ],
  side: [
    { id: 'macro-signals', w: 4, h: 3 },
    { id: 'halal-food', w: 4, h: 3 },
    { id: 'sanctions', w: 4, h: 3 },
    { id: 'commodity-regulation', w: 4, h: 3 },
    { id: 'gcc-investments', w: 4, h: 3 },
    { id: 'mining-news', w: 4, h: 3 },
    { id: 'critical-minerals', w: 4, h: 3 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE PANEL PRIORITY — Which panels stay visible on small screens
// ─────────────────────────────────────────────────────────────────────────────
export const MOBILE_VISIBLE_PANELS = [
  'map',
  'live-news',
  'commodities',
  'supply-chain',
  'china-trade',
  'gulf-economies',
  'energy',
];

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT FILTERS — Start focused on MENA-China corridor
// ─────────────────────────────────────────────────────────────────────────────
export const DEFAULT_FILTERS = {
  regions: ['MENA', 'East Asia'],
  corridors: ['china-mena', 'gulf-asia'],
};
