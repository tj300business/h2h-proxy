const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/names', async (req, res) => {
  try {
    const r = await fetch('https://api-h2h.hudstats.com/v1/participant/nba/names');
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.get('/stats', async (req, res) => {
  try {
    const name = req.query.participant;
    const r = await fetch(`https://api-h2h.hudstats.com/v1/participant/nba/stats?participant=${encodeURIComponent(name)}`);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.listen(process.env.PORT || 3000);
