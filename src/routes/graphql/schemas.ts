import { Type } from '@fastify/type-provider-typebox';
import { changePostInputType, createPostInputType, postType } from './types/posts.js';
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { createUserInputType, changeUserInputType, userType } from './types/user.js';
import { UUIDType } from './types/uuid.js';
import {
  changeProfileInputType,
  createProfileInputType,
  profileType,
} from './types/profile.js';
import { memberType, memberTypeIdEnum } from './types/memberType.js';

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
      type: userType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    users: {
      type: new GraphQLList(userType),
    },
    profile: {
      type: profileType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    profiles: {
      type: new GraphQLList(profileType),
    },
    memberType: {
      type: memberType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(memberTypeIdEnum) },
      },
    },
    memberTypes: {
      type: new GraphQLList(memberType),
    },
    post: {
      type: postType as GraphQLObjectType,
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
      type: userType as GraphQLObjectType,
      args: {
        dto: { type: createUserInputType },
      },
    },
    changeUser: {
      type: userType as GraphQLObjectType,
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
      type: profileType as GraphQLObjectType,
      args: {
        dto: { type: createProfileInputType },
      },
    },
    changeProfile: {
      type: profileType as GraphQLObjectType,
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
      type: postType as GraphQLObjectType,
      args: {
        dto: { type: createPostInputType },
      },
    },
    changePost: {
      type: postType as GraphQLObjectType,
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
    subscribeTo: {
      type: userType as GraphQLObjectType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    unsubscribeFrom: {
      type: GraphQLString,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
    },
  },
});

export const gqlSchema = new GraphQLSchema({ query, mutation });
