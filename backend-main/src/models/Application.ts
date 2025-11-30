import { Document, Schema, model } from 'mongoose';

export type ApplicationType = 'widget' | 'screen' | 'service';
export type ApplicationStatus = 'draft' | 'pending' | 'published' | 'rejected';

export interface ApplicationEntryPoints {
  frontend?: string;
  backend?: string;
}

export interface ApplicationStorageMeta {
  rootDir?: string;
  archivePath?: string;
  contentPath?: string;
  manifestPath?: string;
}

export interface ApplicationVersionHistoryEntry {
  version: string;
  status: ApplicationStatus;
  releaseNotes?: string;
  description?: string;
  createdAt?: Date;
  entryPoints?: ApplicationEntryPoints;
  permissions?: string[];
  storage?: ApplicationStorageMeta;
  manifest?: Record<string, unknown>;
}

export interface IApplication extends Document {
  key: string;
  name: string;
  version: string;
  type: ApplicationType;
  description?: string;
  status: ApplicationStatus;
  isPublished: boolean;
  owner?: Schema.Types.ObjectId;
  entryPoints?: ApplicationEntryPoints;
  permissions?: string[];
  storage?: ApplicationStorageMeta;
  manifest?: Record<string, unknown>;
  icon?: string;
  versionHistory: ApplicationVersionHistoryEntry[];
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9-]+$/, 'Key must include only English letters, digits, or hyphen'],
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    version: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    type: {
      type: String,
      required: true,
      enum: ['widget', 'screen', 'service'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    status: {
      type: String,
      enum: ['draft', 'pending', 'published', 'rejected'],
      default: 'draft',
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    entryPoints: {
      frontend: { type: String },
      backend: { type: String },
    },
    permissions: {
      type: [String],
      default: [],
    },
    storage: {
      rootDir: String,
      archivePath: String,
      contentPath: String,
      manifestPath: String,
    },
    manifest: {
      type: Schema.Types.Mixed,
    },
    icon: {
      type: String,
    },
    versionHistory: {
      type: [
        {
          version: { type: String, required: true },
          status: {
            type: String,
            enum: ['draft', 'pending', 'published', 'rejected'],
            required: true,
          },
          releaseNotes: String,
          description: String,
          createdAt: { type: Date, default: Date.now },
          entryPoints: {
            frontend: String,
            backend: String,
          },
          permissions: [String],
          storage: {
            rootDir: String,
            archivePath: String,
            contentPath: String,
            manifestPath: String,
          },
          manifest: Schema.Types.Mixed,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

ApplicationSchema.index({ key: 1 }, { unique: true });

export const Application = model<IApplication>('Application', ApplicationSchema);
