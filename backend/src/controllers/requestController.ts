import { Request, Response } from 'express';
import { PrismaClient, RequestStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const createRequest = async (req: Request & { user?: any }, res: Response) => {
  const { mentorId } = req.body;

  try {
    const request = await prisma.request.create({
      data: {
        menteeId: req.user.id,
        mentorId,
        status: RequestStatus.PENDING
      }
    });

    res.status(201).json({ message: 'Request sent', request });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send request', error: err });
  }
};

export const getSentRequests = async (req: Request & { user?: any }, res: Response) => {
  try {
    const requests = await prisma.request.findMany({
      where: { menteeId: req.user.id },
      include: { mentor: true }
    });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get sent requests' });
  }
};

export const getReceivedRequests = async (req: Request & { user?: any }, res: Response) => {
  try {
    const requests = await prisma.request.findMany({
      where: { mentorId: req.user.id },
      include: {
        mentee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            goals: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get received requests' });
  }
};

export const respondToRequest = async (req: Request & { user?: any }, res: Response) => {
  const { id } = req.params;
  const { status } = req.body; // "ACCEPTED" or "REJECTED"

  try {
    const updated = await prisma.request.update({
      where: { id: Number(id) },
      data: { status }
    });

    res.json({ message: `Request ${status.toLowerCase()}`, updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update request' });
  }
};

export const updateRequestStatus = async (req: Request & { user?: any }, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const updated = await prisma.request.update({
    where: { id: parseInt(id) },
    data: { status },
  });

  res.json(updated);
};


