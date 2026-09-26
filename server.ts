import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Health check endpoint for Cloud Run container monitoring
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

// Dist directory path
const distPath = path.resolve(__dirname, 'dist');

// Serve static assets from dist
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, { maxAge: '1h' }));

  // Fallback to index.html for SPA routes (HTML5 history mode)
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (_req, res) => {
    res.status(200).send('Application is initializing...');
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on 0.0.0.0:${PORT}`);
});
