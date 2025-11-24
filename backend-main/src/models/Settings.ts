import mongoose, { Document, Schema } from 'mongoose';

export interface IModelSceneSettings {
  modelPath: string;
  sceneName: string | null;
  enableToonShader: boolean;
  lightIntensity: number;
  cameraDistance: number;
  animationSpeed: number;
}

export interface ISettings extends Document {
  userId: mongoose.Types.ObjectId;
  volume: number;
  language: string;
  theme: 'light' | 'dark' | 'system';
  llmProviderName: string | null;
  modelScene: IModelSceneSettings;
  createdAt: Date;
  updatedAt: Date;
}

const ModelSceneSettingsSchema = new Schema<IModelSceneSettings>(
  {
    modelPath: {
      type: String,
      default: './assets/models/character.glb',
    },
    sceneName: {
      type: String,
      default: null,
    },
    enableToonShader: {
      type: Boolean,
      default: false,
    },
    lightIntensity: {
      type: Number,
      default: 2.0,
    },
    cameraDistance: {
      type: Number,
      default: 2.0,
    },
    animationSpeed: {
      type: Number,
      default: 1.0,
    },
  },
  { _id: false }
);

const SettingsSchema = new Schema<ISettings>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    volume: {
      type: Number,
      default: 70,
      min: 0,
      max: 100,
    },
    language: {
      type: String,
      default: 'ru',
      enum: ['ru', 'en', 'zh'],
    },
    theme: {
      type: String,
      default: 'system',
      enum: ['light', 'dark', 'system'],
    },
    llmProviderName: {
      type: String,
      default: null,
    },
    modelScene: {
      type: ModelSceneSettingsSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

export const Settings = mongoose.model<ISettings>('Settings', SettingsSchema);
