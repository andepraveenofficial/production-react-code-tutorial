import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services';
import type { SignupRequest, SigninRequest, AuthResponse } from '../types/auth.types';
import { authSchema } from '../schemas';

export const signin = async (data: SigninRequest): Promise<AuthResponse | null> => {
    const validatedData = authSchema.signinSchema.parse(data);
    return await authService.signin(validatedData);
};

export const signup = async (data: SignupRequest): Promise<AuthResponse | null> => {
    const validatedData = authSchema.signupSchema.parse(data);
    return await authService.signup(validatedData);
};

export const signout = async (): Promise<void> => {
    await authService.signout();
};

export const useAuthState = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleAuth = useCallback(async (
        authFn: () => Promise<any>,
        successPath: string
    ) => {
        try {
            setLoading(true);
            setError(null);
            await authFn();
            navigate(successPath);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    return {
        loading,
        error,
        handleAuth,
        isAuthenticated: authService.isAuthenticated(),
    };
};
