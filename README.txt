================================================================================
  SATELLITE THERMAL ANOMALY & INDUSTRIAL FIRE CLASSIFICATION SYSTEM
  Localhost Installation & Deployment Guide (All Operating Systems)
================================================================================

--------------------------------------------------------------------------------
1. SYSTEM OVERVIEW & INFORMATION
--------------------------------------------------------------------------------
This system is an automated spaceborne thermal intelligence and machine learning
classification platform. It ingests near-real-time thermal radiance data from
NASA FIRMS (MODIS and VIIRS SNPP / NOAA-20 satellites) and classifies anomalies 
into four mutually exclusive operational archetypes:

  1. Industrial Emergencies (Tier-1 Catastrophic fires, ruptures, sudden FRP spikes)
  2. Industrial Flares (Permitted, routine refinery & petrochemical bleed stacks)
  3. Forest Fires (Wildfires across protected reserves & vegetative biomes)
  4. Agricultural Burns (Seasonal crop stubble burning across farmland)

Key Architectural Capabilities:
  - Sub-pixel Radiometry: Calculates Fire Radiative Power (FRP in Megawatts) and
    brightness temperatures at 3.9µm / 11µm spectral bands.
  - Spatial Cadastral Join: Matches thermal coordinates against OpenStreetMap
    industrial plant polygons, factory boundaries, and land-use geometries.
  - 30-Day Temporal Persistence: Bayesian heuristics distinguish recurrent licensed
    flare stacks from sudden baseline violations.
  - Interactive Geospatial Canvas: Dual-band Leaflet map supporting live NASA FIRMS
    WMS layers, ESRI satellite imagery, and high-resolution OpenStreetMap basemaps.
  - Inter-Agency Dossiers: Generates statutory incident dossiers and NDRF/SDRF
    emergency dispatch directives.

--------------------------------------------------------------------------------
2. PREREQUISITES
--------------------------------------------------------------------------------
Before running the application locally on your machine, ensure you have:

  1. Node.js (Version 18.x or higher, Node 20 LTS or Node 22 recommended)
     Download from: https://nodejs.org/ (LTS version recommended)
  2. npm (Node Package Manager - comes bundled automatically with Node.js)
  3. A web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari)
  4. Terminal or Command Prompt application on your operating system:
       - Windows: PowerShell or Command Prompt (cmd.exe) or Git Bash
       - macOS: Terminal (Applications > Utilities > Terminal)
       - Linux: Any terminal emulator (Bash, Zsh, GNOME Terminal, etc.)

To verify that Node.js and npm are installed, open your terminal and run:
  node -v
  npm -v

You should see version numbers printed (e.g., v20.x.x and 10.x.x).

--------------------------------------------------------------------------------
3. STEP-BY-STEP SETUP & RUN GUIDE
--------------------------------------------------------------------------------

----------------------------------------
STEP 1: EXTRACT THE ZIP FILE
----------------------------------------
After downloading the ZIP file from Google AI Studio:

  * On Windows:
      Right-click the downloaded .zip file -> "Extract All..." -> Choose a destination folder.
      Alternatively, open PowerShell in the directory and run:
        Expand-Archive -Path "your-downloaded-file.zip" -DestinationPath "./thermal-fire-system"

  * On macOS:
      Double-click the .zip file in Finder to extract it automatically, or in Terminal:
        unzip your-downloaded-file.zip -d ./thermal-fire-system

  * On Linux:
      In your terminal, run:
        unzip your-downloaded-file.zip -d ./thermal-fire-system

----------------------------------------
STEP 2: OPEN TERMINAL & NAVIGATE TO PROJECT FOLDER
----------------------------------------
Open your terminal and change directory (`cd`) into the extracted project folder:

  * Windows (Command Prompt / PowerShell):
      cd C:\path\to\your\extracted-folder
      (Example: cd C:\Users\YourName\Downloads\thermal-fire-system)

  * macOS / Linux:
      cd /path/to/your/extracted-folder
      (Example: cd ~/Downloads/thermal-fire-system)

Confirm you are in the correct directory by listing files:
  - Windows: dir
  - macOS/Linux: ls
You should see `package.json`, `src/`, `vite.config.ts`, and `index.html`.

----------------------------------------
STEP 3: (OPTIONAL) CONFIGURE ENVIRONMENT VARIABLES
----------------------------------------
The system includes an active, pre-configured NASA FIRMS MAP Key for WMS services.
If you wish to configure or override it with your own personal key:

  1. Copy the example file to `.env`:
       - Windows (PowerShell):
           Copy-Item .env.example .env
       - Windows (Command Prompt):
           copy .env.example .env
       - macOS / Linux:
           cp .env.example .env

  2. Open the `.env` file in any text editor and set your key:
       VITE_FIRMS_MAP_KEY=7e80b4ca0966a8480a0a5ee423372782

(Note: If you don't create a `.env` file, the app automatically falls back to the
configured default NASA FIRMS key).

----------------------------------------
STEP 4: INSTALL DEPENDENCIES
----------------------------------------
In your terminal inside the project directory, run:

  npm install

This will download and install all required packages (React, Vite, Leaflet, 
Tailwind CSS, Lucide Icons, Motion, etc.) into a `node_modules` folder.
This process usually takes 20 to 60 seconds depending on your internet connection.

----------------------------------------
STEP 5: LAUNCH THE LOCAL DEVELOPMENT SERVER
----------------------------------------
Once installation is complete, start the local server by running:

  npm run dev

You will see output in the terminal similar to:
  VITE v6.x.x  ready in 250 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://<your-ip>:3000/
  ➜  press h + enter to show help

----------------------------------------
STEP 6: ACCESS THE APPLICATION IN YOUR BROWSER
----------------------------------------
Open your web browser and navigate to:

  http://localhost:3000

The application will load immediately with all three core modules:
  - Overview: Architecture, sensor fusion pipeline & taxonomy matrix
  - Tactical Map: Interactive geospatial map with NASA FIRMS WMS layers,
    satellite basemaps, cadastral polygons, and hotspot inspector
  - Analytics & Reports: Scatter plots, temporal persistence distributions,
    filtered audit registries, and statutory compliance export tools

To stop the server at any time, press `Ctrl + C` in the terminal.

--------------------------------------------------------------------------------
4. PRODUCTION BUILD (OPTIONAL)
--------------------------------------------------------------------------------
If you want to create an optimized production build for deployment:

  1. Build the static bundle:
       npm run build

  2. Preview the built application locally:
       npm run preview

The compiled production assets will be generated in the `dist/` directory.

--------------------------------------------------------------------------------
5. TROUBLESHOOTING & FAQ
--------------------------------------------------------------------------------

Q1: "Port 3000 is already in use"
  Fix: Another application is using port 3000. You can run Vite on another port
  by running:
    npx vite --port 5173
  Then open http://localhost:5173 in your browser.

Q2: "npm: command not found" or "'node' is not recognized as an internal or external command"
  Fix: Node.js is not installed or not added to your system's PATH.
  Download and install Node.js from https://nodejs.org/ and restart your terminal.

Q3: "EACCES: permission denied" (on macOS / Linux)
  Fix: Ensure you have write permissions in your directory. Avoid running npm install
  as root (`sudo`). Instead, extract the ZIP into your user home folder (`~/`).

Q4: Leaflet map tiles look blank or are loading slowly
  Fix: Make sure your machine has an active internet connection to stream satellite
  tiles (OpenStreetMap and ESRI World Imagery) and NASA FIRMS WMS raster layers.

================================================================================
  End of Guide • Developed for Satellite Thermal Anomaly & Fire Classification
================================================================================
