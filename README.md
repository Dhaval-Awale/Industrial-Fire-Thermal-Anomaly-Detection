# Satellite Thermal Anomaly & Industrial Fire Classification System

## 1. SYSTEM OVERVIEW & INFORMATION

This system is an automated spaceborne thermal intelligence and machine learning classification platform. It ingests near-real-time thermal radiance data from NASA FIRMS (MODIS and VIIRS SNPP / NOAA-20 satellites) and classifies anomalies into four mutually exclusive operational archetypes:

1. **Industrial Emergencies** (Tier-1 Catastrophic fires, ruptures, sudden FRP spikes)
2. **Industrial Flares** (Permitted, routine refinery & petrochemical bleed stacks)
3. **Forest Fires** (Wildfires across protected reserves & vegetative biomes)
4. **Agricultural Burns** (Seasonal crop stubble burning across farmland)

### Key Architectural Capabilities:
- **Sub-pixel Radiometry:** Calculates Fire Radiative Power (FRP in Megawatts) and brightness temperatures at 3.9µm / 11µm spectral bands.
- **Spatial Cadastral Join:** Matches thermal coordinates against OpenStreetMap industrial plant polygons, factory boundaries, and land-use geometries.
- **30-Day Temporal Persistence:** Bayesian heuristics distinguish recurrent licensed flare stacks from sudden baseline violations.
- **Interactive Geospatial Canvas:** Dual-band Leaflet map supporting live NASA FIRMS WMS layers, ESRI satellite imagery, and high-resolution OpenStreetMap basemaps.
- **Inter-Agency Dossiers:** Generates statutory incident dossiers and NDRF/SDRF emergency dispatch directives.

---

## 2. WHAT IS DONE / IMPLEMENTED FEATURES

The following features have been completely implemented in the current codebase:

- **Authentication System:** Secure classified NTRO Employee Login Portal with Local Storage session persistence.
- **Interactive Dashboard & Navigation:** Clean, modern UI with Header, Tab Navigation (Overview, Map, Analytics), and real-time telemetry indicators.
- **Overview Module:** Displays architecture diagrams, sensor fusion pipeline details, and taxonomy matrix.
- **Tactical Map View:** Interactive geospatial mapping using Leaflet. Renders thermal hotspots, NASA FIRMS WMS layers, satellite basemaps, and cadastral polygons.
- **Analytics & Reports Module:** Data visualization including scatter plots, temporal persistence distributions, filtered audit registries, and statutory compliance export tools.
- **Incident Dossiers:** Detailed Incident Dossier Modals for inspecting specific hotspots, generating reports, and tracking incident metadata.
- **NDRF Dispatch System:** NDRF/SDRF Dispatch Modals for initiating emergency response protocols based on Tier-1 catastrophic classifications.
- **Backend API Integration:** Fetching dynamic thermal hotspot data through local/remote `/api/hotspots` endpoints.
- **Modern Tech Stack Setup:** Fully configured Vite, React 19, Tailwind CSS v4, Lucide Icons, and Motion for smooth animations and responsive design.

---

## 3. PREREQUISITES

Before running the application locally on your machine, ensure you have:

1. **Node.js** (Version 18.x or higher, Node 20 LTS or Node 22 recommended) - [Download](https://nodejs.org/)
2. **npm** (Node Package Manager - comes bundled automatically with Node.js)
3. A modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari)
4. Terminal or Command Prompt application

To verify that Node.js and npm are installed, open your terminal and run:
```bash
node -v
npm -v
```

---

## 4. SETUP & RUN GUIDE

### STEP 1: Extract and Navigate
Extract the downloaded ZIP file and navigate into the project directory via terminal:
```bash
cd path/to/thermal-fire-system
```

### STEP 2: (Optional) Configure Environment Variables
The system includes an active, pre-configured NASA FIRMS MAP Key for WMS services. If you wish to configure your own:
```bash
cp .env.example .env
```
Open `.env` and set your key: `VITE_FIRMS_MAP_KEY=your_key_here`

### STEP 3: Install Dependencies
```bash
npm install
```

### STEP 4: Launch Local Development Server
```bash
npm run dev
```
Open your web browser and navigate to: `http://localhost:5173` (or the port specified in terminal).

---

## 5. PRODUCTION BUILD (OPTIONAL)

If you want to create an optimized production build for deployment:
```bash
npm run build
npm run preview
```
The compiled production assets will be generated in the `dist/` directory.

---

## 6. TROUBLESHOOTING & FAQ

- **Port already in use:** Run `npx vite --port 5173` to use a different port.
- **npm command not found:** Ensure Node.js is installed and added to your system's PATH.
- **EACCES permission denied:** Ensure you have write permissions. Avoid using `sudo` for `npm install` in user directories.
- **Blank Leaflet maps:** Verify active internet connection for streaming satellite tiles and WMS layers.

================================================================================
  End of Guide • Developed for Satellite Thermal Anomaly & Fire Classification
================================================================================
