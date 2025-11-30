import { Document, Schema, model } from 'mongoose';

import type { IApplication } from './Application';
import type { IUser } from './User';

export interface IUserApplication extends Document {
  user: IUser['_id'];
  application: IApplication['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const UserApplicationSchema = new Schema<IUserApplication>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

UserApplicationSchema.index({ user: 1, application: 1 }, { unique: true });

export const UserApplication = model<IUserApplication>('UserApplication', UserApplicationSchema);
