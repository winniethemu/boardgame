import { Request, Response } from 'express';

import Room, { IRoom } from '../models/room';
import generateUniqueRoomCode from '../utils/roomCodeGenerator';
import { IUser } from '../models/user';
import { createUser } from './usersController';

export const createRoom = async (host: IUser): Promise<string> => {
  const code = await generateUniqueRoomCode();
  const room = new Room({ code, users: [host._id] });
  await room.save();
  return code;
};

export const joinRoom = async (
  code: string,
  userId?: string
): Promise<IRoom | null> => {
  if (!userId) {
    const user = await createUser();
    userId = user._id;
  }
  // Use $addToSet to avoid adding duplicates
  const update = { $addToSet: { users: userId } };
  // Use {new: true} to return the updated document
  const room = await Room.findOneAndUpdate({ code }, update, {
    new: true,
  });
  return room;
};

export const updateRoom = (req: Request, res: Response): void => {
  // Logic to create a new game room
  res.status(201).send('Room updated');
};

export const getRoom = async (req: Request, res: Response): Promise<void> => {
  const roomId = req.params.roomId;

  // try {
  //     // Replace with actual logic to retrieve room details, e.g. from a database
  //     const roomDetails = await someService.getRoomById(roomId);

  //     if (roomDetails) {
  //         res.status(200).json(roomDetails);
  //     } else {
  //         res.status(404).send('Room not found');
  //     }
  // } catch (error) {
  //     // Handle error, possibly a 500 internal server error
  //     res.status(500).send(error.message);
  // }
};

export const deleteRoom = (req: Request, res: Response): void => {
  res.status(201).send('Room deleted');
};