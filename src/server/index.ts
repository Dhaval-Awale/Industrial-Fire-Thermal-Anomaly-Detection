import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/profiles', async (req, res) => {
  try {
    const db = await initDb();
    const profiles = await db.all('SELECT * FROM profiles');
    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

app.get('/api/hotspots', async (req, res) => {
  try {
    const db = await initDb();
    const hotspots = await db.all('SELECT * FROM hotspots');
    
    // Attach historical data
    for (const hs of hotspots) {
      const history = await db.all('SELECT date, frp FROM hotspot_history WHERE hotspot_id = ? ORDER BY date ASC', hs.id);
      hs.historical30Day = history;
    }
    
    res.json(hotspots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch hotspots' });
  }
});

app.post('/api/actions', async (req, res) => {
  try {
    const { action_type, hotspot_id, employee_id, details } = req.body;
    const db = await initDb();
    
    const timestamp = new Date().toISOString();
    
    const result = await db.run(
      'INSERT INTO action_logs (action_type, hotspot_id, employee_id, timestamp, details) VALUES (?, ?, ?, ?, ?)',
      [action_type, hotspot_id, employee_id, timestamp, JSON.stringify(details || {})]
    );
    
    res.status(201).json({ id: result.lastID, timestamp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log action' });
  }
});

// Serve frontend in production
const distPath = path.resolve(__dirname, '../../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Backend API & Web Server listening on port ${port}`);
});
