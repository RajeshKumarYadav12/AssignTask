export interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface Task {
  _id: string;
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  user: User | string;
  isCompleted: boolean;
  completedAt?: string;
  isOverdue?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  high: number;
  medium: number;
  low: number;
}

export interface SystemStats {
  users: {
    total: number;
    active: number;
    inactive: number;
    admins: number;
    regular: number;
    recentlyJoined: number;
  };
  tasks: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

export interface TaskFormData {
  title: string;
  description: string;
  status?: 'pending' | 'in-progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}
