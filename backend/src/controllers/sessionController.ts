import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ 1. Create a new session (called by mentor)
export const createSession = async (req: Request & { user?: any }, res: Response): Promise<void> => {
  const { menteeId, topic, scheduledAt } = req.body;

  try {
    const session = await prisma.session.create({
      data: {
        mentorId: req.user.id,
        menteeId,
        topic,
        scheduledAt: new Date(scheduledAt),
      },
    });

    res.status(201).json(session); // ✅ no return
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Session creation failed' }); // ✅ no return
  }
};



// ✅ 2. Update session with feedback
export const updateFeedback = async (req: Request & { user?: any }, res: Response) => {
  const { id } = req.params;
  const { feedback } = req.body;

  try {
    const session = await prisma.session.update({
      where: { id: parseInt(id) },
      data: { feedback },
    });

    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update feedback' });
  }
};

export const getMenteeSessions = async (req: Request & { user?: any }, res: Response) => {
  try {
    const sessions = await prisma.session.findMany({
      where: { menteeId: req.user.id },
      include: {
        mentor: {
          select: { firstName: true, lastName: true, email: true }
        }
      },
      orderBy: { scheduledAt: 'desc' },
    });

    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch sessions' });
  }
};


export const getMentorSessions = async (req: Request & { user?: any }, res: Response) => {
  try {
    const sessions = await prisma.session.findMany({
      where: { mentorId: req.user.id },
      include: {
        mentee: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { scheduledAt: 'desc' },
    });

    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch mentor sessions' });
  }
};
