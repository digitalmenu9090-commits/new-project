import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // Determine base path for GitHub Pages and development environments
  let base = './';
  if (process.env.BASE_PATH) {
    base = process.env.BASE_PATH.endsWith('/') ? process.env.BASE_PATH : `${process.env.BASE_PATH}/`;
  } else if (process.env.GITHUB_REPOSITORY) {
    const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
    if (repo) {
      base = repo.endsWith('.github.io') ? '/' : `/${repo}/`;
    }
  }

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'file-upload-handler',
        configureServer(server) {
          server.middlewares.use('/api/upload', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk.toString();
              });
              req.on('end', () => {
                try {
                  const data = JSON.parse(body);
                  let imageBuffer;
                  if (data.image && data.image.startsWith('data:')) {
                    const base64Data = data.image.replace(/^data:image\/\w+;base64,/, '');
                    imageBuffer = Buffer.from(base64Data, 'base64');
                  } else if (data.image) {
                    imageBuffer = Buffer.from(data.image, 'base64');
                  } else {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'No image provided' }));
                    return;
                  }

                  const publicPath = path.resolve(__dirname, 'public');
                  if (!fs.existsSync(publicPath)) {
                    fs.mkdirSync(publicPath, { recursive: true });
                  }
                  const filename = `uploaded_photo_${Date.now()}.jpg`;
                  fs.writeFileSync(path.join(publicPath, filename), imageBuffer);
                  fs.writeFileSync(path.join(publicPath, 'sip_cafe_storefront.jpg'), imageBuffer);

                  const distPath = path.resolve(__dirname, 'dist');
                  if (fs.existsSync(distPath)) {
                    fs.writeFileSync(path.join(distPath, filename), imageBuffer);
                    fs.writeFileSync(path.join(distPath, 'sip_cafe_storefront.jpg'), imageBuffer);
                  }

                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, url: `./sip_cafe_storefront.jpg?v=${Date.now()}` }));
                } catch (err: any) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: err.message }));
                }
              });
            } else {
              res.statusCode = 405;
              res.end('Method not allowed');
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
