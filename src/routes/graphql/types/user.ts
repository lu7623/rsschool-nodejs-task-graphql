import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { profileType } from './profile.js';
import { postType } from './posts.js';
import { User } from '@prisma/client';
import { prisma } from '../resolvers.js';

export interface UserInput {
  name: string;
  balance: number;
}

export interface UserFields extends UserInput {
  id: string;
}


export interface Subscription {
  subscriberId: string;
  authorId: string;
};

export interface SubscriptionInput {
  userId: string;
  authorId: string;
};


export const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: { 
      type: profileType as GraphQLObjectType,
      resolve: async (source: User) => await prisma.profile.findUnique({ where:  { userId: source.id } })
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async (source: User) => await prisma.post.findMany({ where: { authorId: source.id } })
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: async (source: User) => await prisma.user.findMany({   where: {
        subscribedToUser: {
          some: {
            subscriberId: source.id,
          },
        }}
    })
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async (source: User) => await prisma.user.findMany({   where: {
        userSubscribedTo: {
          some: {
            authorId: source.id,
          },
        }}
    })
    }
  }),
});

export const createUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

export const changeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});
