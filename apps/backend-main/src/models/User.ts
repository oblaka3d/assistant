import bcrypt from 'bcryptjs';
import mongoose, { Document, Schema } from 'mongoose';

export interface OAuthProvider {
  provider: 'google' | 'yandex' | 'github';
  providerId: string;
}

export interface IUser extends Document {
  email: string;
  password?: string; // Опционально для OAuth пользователей
  name: string;
  oauthProviders?: OAuthProvider[];
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: function (this: IUser) {
        // Пароль обязателен только если нет OAuth провайдеров
        return !this.oauthProviders || this.oauthProviders.length === 0;
      },
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Не возвращать пароль по умолчанию
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    oauthProviders: [
      {
        provider: {
          type: String,
          enum: ['google', 'yandex', 'github'],
          required: true,
        },
        providerId: {
          type: String,
          required: true,
        },
      },
    ],
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Хеширование пароля перед сохранением
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Метод для сравнения пароля
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) {
    return false;
  }
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);
