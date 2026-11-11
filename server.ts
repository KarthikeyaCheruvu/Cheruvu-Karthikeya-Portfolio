/**
 * Full-Stack Express Server with Python SQLite Backend Integration
 * Handles API proxying to Python FastAPI/Server and mounts Vite middlewares in dev.
 */
import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const PYTHON_PORT = parseInt(process.env.PYTHON_PORT || '8000', 10);
const isProd = process.env.NODE_ENV === 'production';

// Start Python Backend Process
let pythonProcess: any = null;
function startPythonBackend() {
  const pythonScript = path.join(__dirname, 'backend', 'server.py');
  console.log(`[Full-Stack] Spawning Python Backend service (${pythonScript})...`);
  
  pythonProcess = spawn('python3', [pythonScript], {
    env: {
      ...process.env,
      PYTHON_PORT: String(PYTHON_PORT),
      PYTHON_HOST: '127.0.0.1',
    },
    stdio: 'inherit',
  });

  pythonProcess.on('error', (err: any) => {
    console.error('[Full-Stack] Python service error:', err);
  });

  pythonProcess.on('exit', (code: number, signal: string) => {
    console.warn(`[Full-Stack] Python service exited with code ${code} (${signal})`);
  });
}

// Ensure cleanup on process exit
process.on('exit', () => {
  if (pythonProcess) pythonProcess.kill();
});
process.on('SIGINT', () => {
  if (pythonProcess) pythonProcess.kill();
  process.exit();
});
process.on('SIGTERM', () => {
  if (pythonProcess) pythonProcess.kill();
  process.exit();
});

startPythonBackend();

async function createServer() {
  const app = express();
  app.use(express.json());

  // Proxy /api requests to Python Backend (FastAPI / native Python server)
  app.all('/api/*', async (req, res) => {
    const targetUrl = `http://127.0.0.1:${PYTHON_PORT}${req.originalUrl}`;
    
    try {
      const options: RequestInit = {
        method: req.method,
        headers: {
          'Content-Type': req.get('Content-Type') || 'application/json',
          'X-Forwarded-For': req.ip || '',
        },
      };

      if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        options.body = JSON.stringify(req.body);
      }

      const pythonRes = await fetch(targetUrl, options);
      const data = await pythonRes.json();
      res.status(pythonRes.status).json(data);
    } catch (err: any) {
      console.error('[API Proxy Error]', err.message);
      res.status(502).json({
        success: false,
        message: 'Python backend connecting... please retry in a second.',
        error: err.message,
      });
    }
  });

  // Vite middleware in dev or static files in production
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Express Server] App running on http://0.0.0.0:${PORT}`);
  });
}

createServer().catch((err) => {
  console.error('[Server Init Error]', err);
});
