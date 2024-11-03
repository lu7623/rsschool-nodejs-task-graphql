import { userType } from './user.js';
import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { prisma } from '../resolvers.js';
import { Post } from '@prisma/client';

export interface PostInput {
  title: string;
  content: string;
  authorId: string;
}

export interface ChangePostInput {
  title: string;
  content: string;
}

export const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: UUIDType },
    author: {
      type: userType as GraphQLObjectType,
      resolve: async (source: Post) =>
        await prisma.user.findUnique({
          where: {
            id: source.authorId,
          },
        }),
    },
  },
});

export const createPostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
});

export const changePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});
