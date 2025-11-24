import mongoose, { Document, Schema } from 'mongoose';

export interface IApiKey extends Document {
  userId: mongoose.Types.ObjectId;
  provider: string;
  encryptedKey: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApiKeySchema = new Schema<IApiKey>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    provider: {
      type: String,
      required: true,
    },
    encryptedKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ApiKeySchema.index({ userId: 1, provider: 1 }, { unique: true });

export const ApiKey = mongoose.model<IApiKey>('ApiKey', ApiKeySchema);
