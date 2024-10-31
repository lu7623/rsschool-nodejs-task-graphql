import { PrismaClient } from '@prisma/client';
import { UserInput } from './types/user.js';
import { UUID } from 'node:crypto';
import { ProfileInput } from './types/profile.js';

const prisma = new PrismaClient();

const getUser = async (args: { id: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: args.id,
    },
  });
  return user;
};

const getUsers = async () => {
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

const getProfile = async (args: { id: string }) => {
  const profile = await prisma.profile.findUnique({
    where: {
      id: args.id,
    },
  });
  return profile;
};

const getProfiles = async () => {
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

export default {
  user: getUser,
  users: getUsers,
  createUser,
  changeUser,
  deleteUser,
  profile: getProfile,
  profiles: getProfiles,
  createProfile,
  changeProfile,
  deleteProfile,
};
