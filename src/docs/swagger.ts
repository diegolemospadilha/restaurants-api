import fp from 'fastify-plugin';

import { FastifyInstance } from 'fastify'

export const options = {
  routePrefix: '/docs',
    openapi: {
        info: {
          title: 'Test swagger',
          description: 'testing the fastify swagger api',
          version: '0.1.0'
        },
        servers: [{
          url: 'http://localhost:3333'
        }],
        components: {
          securitySchemes: {
            apiKey: {
              type: 'apiKey',
              name: 'apiKey',
              in: 'header'
            }
          }
        }
      },
      hideUntagged: true,
      exposeRoute: true 
}
    