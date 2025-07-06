import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const getAllSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await prisma.session.findMany({
      include: {
        mentor: {
          select: { firstName: true, lastName: true },
        },
        mentee: {
          select: { firstName: true, lastName: true },
        },
      },
      orderBy: { scheduledAt: 'desc' },
    });

    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch sessions' });
  }
};
