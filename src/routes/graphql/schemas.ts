import { Type } from '@fastify/type-provider-typebox';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { createUserInputType, changeUserInputType, userType } from './types/user.js';
import { UUIDType } from './types/uuid.js';
import {
  changeProfileInputType,
  createProfileInputType,
  profileType,
} from './types/profile.js';
import { memberType } from './types/memberType.js';
import { changePostInputType, createPostInputType, postType } from './types/posts.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};
const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    users: {
      type: new GraphQLList(userType),
    },
    profile: {
      type: profileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    profiles: {
      type: new GraphQLList(profileType),
    },
    memberType: {
      type: memberType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    memberTypes: {
      type: new GraphQLList(memberType),
    },
    post: {
      type: postType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    posts: {
      type: new GraphQLList(postType),
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: userType,
      args: {
        dto: { type: createUserInputType },
      },
    },
    changeUser: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: changeUserInputType },
      },
    },
    deleteUser: {
      type: UUIDType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    createProfile: {
      type: profileType,
      args: {
        dto: { type: createProfileInputType },
      },
    },
    changeProfile: {
      type: profileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: changeProfileInputType },
      },
    },
    deleteProfile: {
      type: UUIDType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    createPost: {
      type: postType,
      args: {
        dto: { type: createPostInputType },
      },
    },
    changePost: {
      type: profileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: changePostInputType },
      },
    },
    deletePost: {
      type: UUIDType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
  },
});

export const gqlSchema = new GraphQLSchema({ query, mutation });
