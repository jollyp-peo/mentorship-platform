import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMentorAvailability = async (req: Request, res: Response): Promise<void> => {
  const mentorId = Number(req.query.mentorId);

  if (!mentorId) {
    res.status(400).json({ message: 'mentorId is required' }); // ❌ don't return this
    return;
  }

  try {
    const slots = await prisma.availability.findMany({
      where: { mentorId },
    });

    res.json(slots); // ✅ just send response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch availability' });
  }
};

export const addAvailability = async (req: Request & { user?: any }, res: Response) => {
  const { day, from, to } = req.body;
  try {
    const slot = await prisma.availability.create({
      data: {
        mentorId: req.user.id,
        day,
        from,
        to,
      },
    });
    res.status(201).json(slot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating slot' });
  }
};

// ✅ GET current mentor's own availability (for use in their dashboard)
export const getOwnAvailability = async (req: Request & { user?: any }, res: Response) => {
  try {
    const slots = await prisma.availability.findMany({
      where: { mentorId: req.user.id },
    });
    res.json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch your availability' });
  }
};
