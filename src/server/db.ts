import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { VERIFIED_NTRO_EMPLOYEES } from '../data/mockEmployees.js';
import { HOTSPOTS_DATA } from '../data/mockHotspots.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, '../../data_store.json');

export interface ActionLog {
  id: number;
  action_type: string;
  hotspot_id: string;
  employee_id: string;
  timestamp: string;
  details: string;
}

export interface DataStore {
  profiles: typeof VERIFIED_NTRO_EMPLOYEES;
  hotspots: typeof HOTSPOTS_DATA;
  action_logs: ActionLog[];
}

let store: DataStore | null = null;

function saveStore() {
  if (!store) return;
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save data_store.json', err);
  }
}

export async function initDb() {
  if (store) return createDbAdapter(store);

  if (fs.existsSync(DB_FILE)) {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      store = JSON.parse(data);
    } catch (err) {
      console.warn('Failed to parse existing data_store.json, creating new store');
    }
  }

  if (!store) {
    store = {
      profiles: [...VERIFIED_NTRO_EMPLOYEES],
      hotspots: [...HOTSPOTS_DATA],
      action_logs: []
    };
    saveStore();
  }

  return createDbAdapter(store);
}

function createDbAdapter(currentStore: DataStore) {
  return {
    async all(query: string, ...params: any[]): Promise<any[]> {
      const q = query.trim().toUpperCase();
      
      if (q.includes('FROM PROFILES')) {
        return currentStore.profiles;
      }

      if (q.includes('FROM HOTSPOTS')) {
        return currentStore.hotspots;
      }

      if (q.includes('FROM HOTSPOT_HISTORY')) {
        const hotspotId = params[0];
        const hs = currentStore.hotspots.find((h) => h.id === hotspotId);
        return hs?.historical30Day || [];
      }

      if (q.includes('FROM ACTION_LOGS')) {
        return currentStore.action_logs;
      }

      return [];
    },

    async run(query: string, params: any[] = []): Promise<{ lastID: number }> {
      const q = query.trim().toUpperCase();

      if (q.includes('INSERT INTO ACTION_LOGS')) {
        const [action_type, hotspot_id, employee_id, timestamp, details] = params;
        const newId = (currentStore.action_logs.length > 0 ? Math.max(...currentStore.action_logs.map(l => l.id)) : 0) + 1;
        
        const newLog: ActionLog = {
          id: newId,
          action_type,
          hotspot_id,
          employee_id,
          timestamp,
          details: typeof details === 'string' ? details : JSON.stringify(details || {})
        };

        currentStore.action_logs.push(newLog);
        saveStore();
        return { lastID: newId };
      }

      return { lastID: 0 };
    }
  };
}
