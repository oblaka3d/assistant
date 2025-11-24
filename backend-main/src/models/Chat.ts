import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
  id: string;
  position: 'left' | 'right';
  type: 'text';
  text: string;
  date: Date;
}

export interface IDialog extends Document {
  userId: mongoose.Types.ObjectId;
  dialogId: string; // Уникальный ID диалога (может быть сгенерирован на клиенте)
  title: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    id: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      enum: ['left', 'right'],
      required: true,
    },
    type: {
      type: String,
      enum: ['text'],
      default: 'text',
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);

const DialogSchema = new Schema<IDialog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    dialogId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      default: 'Новый диалог',
    },
    messages: {
      type: [MessageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Составной индекс для быстрого поиска диалогов пользователя
DialogSchema.index({ userId: 1, dialogId: 1 }, { unique: true });

export const Dialog = mongoose.model<IDialog>('Dialog', DialogSchema);
