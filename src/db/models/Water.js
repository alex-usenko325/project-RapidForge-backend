import { Schema, model, Types } from 'mongoose';

import { UsersCollection } from './user.js';

const waterSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: UsersCollection, required: true },
    date: { type: Date, required: true },
    volume: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const waterCollection = model('water', waterSchema);
