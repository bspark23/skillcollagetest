import { UserSettings } from './settings';

export interface UserSession {
  deviceId: string;
  deviceType: 'iOS' | 'Android' | 'Web';
  deviceModel?: string;
  pushNotificationToken?: string;
  lastActive: string;
  lastLogin?: string;
  ipAddress?: string;
}

export enum AdminPrivilege {
  MANAGE_USERS = 'manage_users',
  MANAGE_SERVICES = 'manage_services',
  MANAGE_BILLING = 'manage_billing',
  MANAGE_CONTENT = 'manage_content',
  MANAGE_AFFILIATES = 'manage_affiliates',
}

export interface User {
  uid: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'customer';
  phone?: string;
  referralSource?: string;
  provider: 'password' | 'google';
  avatarUrl?: string;
  password?: string;
  resetToken?: string;
  resetTokenExpiry?: string;
  sessions?: UserSession[];
  preferences?: UserSettings;
  payoutBank?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  privileges?: AdminPrivilege[];
  createdAt: string;
  updatedAt: string;
}

export interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'admin' | 'customer';
}

export interface UserPasswordUpdate {
  currentPassword: string;
  newPassword: string;
}

export type UserUpdateInput = Partial<User>;
