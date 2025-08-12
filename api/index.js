import Fastify from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyStatic from '@fastify/static';
import { serverUrl, pages, externalPages, getAltPrefix } from '../src/routes.mjs';
import { tryReadFile, preloaded404 } from '../src/templates.mjs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Vercel serverless function handler
export default async function handler(req, res) {
  // Create Fastify instance
  const app = Fastify({
    ignoreDuplicateSlashes: true,
    ignoreTrailingSlash: true,
    logger: false,
  });

  // Register plugins
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });

  // Serve static files
  await app.register(fastifyStatic, {
    root: join(process.cwd(), 'views'),
    prefix: '/',
  });

  // Register routes
  await app.register(async (fastify) => {
    // Main page routes
    for (const [path, page] of Object.entries(pages)) {
      fastify.get(path, async (request, reply) => {
        try {
          const content = await tryReadFile(page);
          return reply.type('text/html').send(content);
        } catch (error) {
          return reply.status(404).send(preloaded404);
        }
      });
    }

    // External page routes
    for (const [path, page] of Object.entries(externalPages)) {
      fastify.get(path, async (request, reply) => {
        try {
          const content = await tryReadFile(page);
          return reply.type('text/html').send(content);
        } catch (error) {
          return reply.status(404).send(preloaded404);
        }
      });
    }

    // Proxy routes (simplified for Vercel)
    fastify.get('/uv', async (request, reply) => {
      return reply.redirect(302, '/ultraviolet.html');
    });

    fastify.get('/rammerhead', async (request, reply) => {
      return reply.redirect(302, '/rammerhead.html');
    });

    fastify.get('/scramjet', async (request, reply) => {
      return reply.redirect(302, '/scramjet.html');
    });

    // API routes
    fastify.get('/api/status', async (request, reply) => {
      return { status: 'ok', service: 'Shift Engine', version: '1.0.0' };
    });
  });

  // Convert Vercel request to Fastify request
  const fastifyReq = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  };

  const fastifyRes = {
    status: (code) => {
      res.status(code);
      return fastifyRes;
    },
    send: (data) => {
      res.send(data);
      return fastifyRes;
    },
    type: (type) => {
      res.setHeader('Content-Type', type);
      return fastifyRes;
    },
    redirect: (code, url) => {
      res.redirect(code, url);
      return fastifyRes;
    },
  };

  try {
    await app.inject(fastifyReq, fastifyRes);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
} 