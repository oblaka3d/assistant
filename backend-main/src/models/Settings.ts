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
  accentColorLight: string;
  accentColorDark: string;
  sttProviderName: string | null;
  llmProviderName: string | null;
  llmModel: string | null;
  ttsProviderName: string | null;
  welcomeTitle: string;
  idleTimeoutSeconds: number;
  idleMode: 'api' | 'custom';
  idleCustomImagePath: string;
  idleRemoteEndpoint: string;
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
    accentColorLight: {
      type: String,
      default: '#4a90e2',
      match: /^#[0-9A-Fa-f]{6}$/, // Валидация hex цвета
    },
    accentColorDark: {
      type: String,
      default: '#4a90e2',
      match: /^#[0-9A-Fa-f]{6}$/, // Валидация hex цвета
    },
    sttProviderName: {
      type: String,
      default: null,
    },
    llmProviderName: {
      type: String,
      default: null,
    },
    llmModel: {
      type: String,
      default: null,
    },
    ttsProviderName: {
      type: String,
      default: null,
    },
    welcomeTitle: {
      type: String,
      default: '',
    },
    idleTimeoutSeconds: {
      type: Number,
      default: 0,
      min: 0,
    },
    idleMode: {
      type: String,
      enum: ['api', 'custom'],
      default: 'api',
    },
    idleCustomImagePath: {
      type: String,
      default: '',
    },
    idleRemoteEndpoint: {
      type: String,
      default: '',
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
