import { Request, Response } from 'express';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const getProfile = async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        firstName: true,
        lastName:true,
        email: true,
        role: true,
        bio: true,
        skills: true,
        goals: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

export const updateProfile = async (req: Request & { user?: any }, res: Response) => {
  const { bio, skills, goals } = req.body;

  try {
    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        bio,
        skills,
        goals,
      },
    });

    res.json({ message: 'Profile updated', profile: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};


// ✅ Get all users by role (e.g., mentors only)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const role = req.query.role as Role;
  const skill = req.query.skill as string;

  try {
    const users = await prisma.user.findMany({
      where: {
        role,
        ...(skill && {
          skills: {
            contains: skill, // partial match filtering
          },
        }),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        bio: true,
        skills: true,
      },
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};
