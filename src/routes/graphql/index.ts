import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, parse, validate } from 'graphql';
import { createGqlResponseSchema, gqlResponseSchema, gqlSchema } from './schemas.js';
import rootValue from './resolvers.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const errArr = validate(gqlSchema, parse(req.body.query), [depthLimit(5)]);
      if (errArr.length > 0) return { errors: errArr };
      const response = await graphql({
        schema: gqlSchema,
        rootValue,
        source: req.body.query,
        variableValues: req.body.variables,
      });
      return response;
    },
  });
};

export default plugin;
