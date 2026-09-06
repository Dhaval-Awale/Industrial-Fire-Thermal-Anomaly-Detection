import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { VERIFIED_NTRO_EMPLOYEES } from '../data/mockEmployees.js';
import { HOTSPOTS_DATA } from '../data/mockHotspots.js';

let db: Database | null = null;

export async function initDb() {
  if (db) return db;
  
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      name TEXT,
      designation TEXT,
      division TEXT,
      serviceId TEXT,
      uniqueCode TEXT,
      passcode TEXT,
      clearanceLevel TEXT,
      badgeCode TEXT,
      nicEmail TEXT,
      avatarInitials TEXT,
      station TEXT
    );

    CREATE TABLE IF NOT EXISTS hotspots (
      id TEXT PRIMARY KEY,
      name TEXT,
      lat REAL,
      lng REAL,
      district TEXT,
      state TEXT,
      archetype TEXT,
      confidenceScore INTEGER,
      signatureId TEXT,
      status TEXT,
      frpMw REAL,
      brightnessTempK REAL,
      baselineFrpMw REAL,
      spikeFactor REAL,
      detectionTimeIst TEXT,
      satellite TEXT,
      osmPolygonId TEXT,
      landCoverCadastre TEXT,
      interAgencyDirectives TEXT,
      persistenceProb REAL
    );

    CREATE TABLE IF NOT EXISTS hotspot_history (
      hotspot_id TEXT,
      date TEXT,
      frp REAL,
      FOREIGN KEY(hotspot_id) REFERENCES hotspots(id)
    );

    CREATE TABLE IF NOT EXISTS action_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action_type TEXT,
      hotspot_id TEXT,
      employee_id TEXT,
      timestamp TEXT,
      details TEXT
    );
  `);

  // Seed employees if empty
  const employeeCount = await db.get('SELECT COUNT(*) as count FROM profiles');
  if (employeeCount.count === 0) {
    const stmt = await db.prepare(`
      INSERT INTO profiles (id, name, designation, division, serviceId, uniqueCode, passcode, clearanceLevel, badgeCode, nicEmail, avatarInitials, station)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const emp of VERIFIED_NTRO_EMPLOYEES) {
      await stmt.run(emp.id, emp.name, emp.designation, emp.division, emp.serviceId, emp.uniqueCode, emp.passcode, emp.clearanceLevel, emp.badgeCode, emp.nicEmail, emp.avatarInitials, emp.station);
    }
    await stmt.finalize();
  }

  // Seed hotspots if empty
  const hotspotCount = await db.get('SELECT COUNT(*) as count FROM hotspots');
  if (hotspotCount.count === 0) {
    const hsStmt = await db.prepare(`
      INSERT INTO hotspots (id, name, lat, lng, district, state, archetype, confidenceScore, signatureId, status, frpMw, brightnessTempK, baselineFrpMw, spikeFactor, detectionTimeIst, satellite, osmPolygonId, landCoverCadastre, interAgencyDirectives, persistenceProb)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const historyStmt = await db.prepare(`
      INSERT INTO hotspot_history (hotspot_id, date, frp) VALUES (?, ?, ?)
    `);

    for (const hs of HOTSPOTS_DATA) {
      await hsStmt.run(hs.id, hs.name, hs.lat, hs.lng, hs.district, hs.state, hs.archetype, hs.confidenceScore, hs.signatureId, hs.status, hs.frpMw, hs.brightnessTempK, hs.baselineFrpMw, hs.spikeFactor, hs.detectionTimeIst, hs.satellite, hs.osmPolygonId, hs.landCoverCadastre, hs.interAgencyDirectives, hs.persistenceProb);
      for (const h of hs.historical30Day) {
        await historyStmt.run(hs.id, h.date, h.frp);
      }
    }
    await hsStmt.finalize();
    await historyStmt.finalize();
  }

  return db;
}
