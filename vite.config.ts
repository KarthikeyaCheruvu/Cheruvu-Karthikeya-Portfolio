import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { spawn, ChildProcess } from 'child_process';
import { defineConfig, Plugin } from 'vite';

let pythonProc: ChildProcess | null = null;

function pythonBackendPlugin(): Plugin {
  return {
    name: 'python-backend-runner',
    configureServer() {
      if (!pythonProc) {
        const scriptPath = path.resolve(__dirname, 'backend/server.py');
        console.log(`[Vite Plugin] Starting Python backend from ${scriptPath}...`);
        pythonProc = spawn('python3', [scriptPath], {
          stdio: 'inherit',
          env: {
            ...process.env,
            PYTHON_PORT: '8888',
            PYTHON_HOST: '127.0.0.1',
          },
        });

        pythonProc.on('error', (err) => {
          console.error('[Vite Plugin] Failed to start Python backend:', err);
        });

        process.on('exit', () => {
          if (pythonProc) pythonProc.kill();
        });
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), pythonBackendPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8888',
          changeOrigin: true,
        },
      },
    },
  };
});
