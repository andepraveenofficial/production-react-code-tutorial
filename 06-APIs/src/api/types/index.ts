// User types
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
}

export interface UserUpdatePayload {
    firstName?: string;
    lastName?: string;
}

// Todo types
export interface Todo {
    id: string;
    title: string;
    description: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface TodoCreatePayload {
    title: string;
    description: string;
}

export interface TodoUpdatePayload extends TodoCreatePayload {
    status?: Todo['status'];
}

// Auth types
export interface SignupPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: string;
}

export interface SigninPayload {
    email: string;
    password: string;
}

// Common types for pagination
export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
