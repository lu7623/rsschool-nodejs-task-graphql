import { PrismaClient } from '@prisma/client';
import { SubscriptionInput, UserInput } from './types/user.js';
import { UUID } from 'node:crypto';
import { ProfileInput } from './types/profile.js';
import { PostInput } from './types/posts.js';

export const prisma = new PrismaClient();

const user = async (args: { id: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: args.id,
    },
  });
  return user;
};

const users = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const createUser = async (args: { dto: UserInput }) => {
  const user = await prisma.user.create({
    data: args.dto,
  });
  return user;
};

const changeUser = async (args: { id: UUID; dto: UserInput }) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: args.id,
      },
      data: args.dto,
    });
    return user;
  } catch {
    return null;
  }
};

const deleteUser = async (args: { id: string }) => {
  try {
    await prisma.user.delete({
      where: {
        id: args.id,
      },
    });
    return args.id;
  } catch {
    return null;
  }
};

const profile = async (args: { id: string }) => {
  const profile = await prisma.profile.findUnique({
    where: {
      id: args.id,
    },
  });
  return profile;
};

const profiles = async () => {
  const profiles = await prisma.profile.findMany();
  return profiles;
};

const createProfile = async (args: { dto: ProfileInput }) => {
  const profile = await prisma.profile.create({
    data: args.dto,
  });

  return profile;
};

const changeProfile = async (args: { id: UUID; dto: ProfileInput }) => {
  try {
    const user = await prisma.profile.update({
      where: {
        id: args.id,
      },
      data: args.dto,
    });
    return user;
  } catch {
    return null;
  }
};

const deleteProfile = async (args: { id: string }) => {
  try {
    await prisma.profile.delete({
      where: {
        id: args.id,
      },
    });
    return args.id;
  } catch {
    return null;
  }
};

const memberType = async (args: { id: string }) => {
  const memberType = await prisma.memberType.findUnique({
    where: {
      id: args.id,
    },
  });
  return memberType;
};

const memberTypes = async () => {
  const memberTypes = await prisma.memberType.findMany();
  return memberTypes;
};

const post = async (args: { id: string }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: args.id,
    },
  });
  return post;
};

const posts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

const createPost = async (args: { dto: PostInput }) => {
  const post = await prisma.post.create({
    data: args.dto,
  });

  return post;
};

const changePost = async (args: { id: UUID; dto: PostInput }) => {
  try {
    const post = await prisma.post.update({
      where: {
        id: args.id,
      },
      data: args.dto,
    });
    return post;
  } catch {
    return null;
  }
};

const deletePost = async (args: { id: string }) => {
  try {
    await prisma.post.delete({
      where: {
        id: args.id,
      },
    });
    return args.id;
  } catch {
    return null;
  }
};

const subscribeTo = async ({ userId: id, authorId }: SubscriptionInput) => {
  try {
    const user = prisma.user.update({
      where: { id },
      data: { userSubscribedTo: { create: { authorId } } },
    });
    return user;
  } catch {
    return null;
  }
};

const unsubscribeFrom = async ({ userId: subscriberId, authorId }: SubscriptionInput) => {
  try {
    await prisma.subscribersOnAuthors.delete({
      where: { subscriberId_authorId: { subscriberId, authorId } },
    });
  } catch {
    return null;
  }
};

export default {
  user,
  users,
  createUser,
  changeUser,
  deleteUser,
  profile,
  profiles,
  createProfile,
  changeProfile,
  deleteProfile,
  memberType,
  memberTypes,
  post,
  posts,
  createPost,
  changePost,
  deletePost,
  subscribeTo,
  unsubscribeFrom,
};
