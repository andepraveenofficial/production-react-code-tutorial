import { useState, useCallback } from 'react';
import { userService } from '../services';
import type { User, UpdateUserRequest, PaginationParams } from '../types/user.types';
import { userSchema } from '../schemas';

export const getUsers = async (params?: PaginationParams) => {
    return await userService.getUsers(params);
};

export const getUserById = async (id: string): Promise<User | null> => {
    return await userService.getUserById(id);
};

export const updateUser = async (id: string, data: UpdateUserRequest): Promise<User | null> => {
    const validatedData = userSchema.userUpdateSchema.parse(data);
    return await userService.updateUser(id, validatedData);
};

export const deleteUser = async (id: string): Promise<void> => {
    await userService.deleteUser(id);
};

export const useUsersState = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUserOperation = useCallback(async <T>(
        operation: () => Promise<T>
    ): Promise<T | null> => {
        try {
            setLoading(true);
            setError(null);
            return await operation();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        handleUserOperation
    };
};
