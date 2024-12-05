import * as z from 'zod';

export const userUpdateSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters').optional(),
    lastName: z.string().min(2, 'Last name must be at least 2 characters').optional(),
});

export const userQuerySchema = z.object({
    page: z.number().min(1, 'Page must be greater than 0').optional(),
    limit: z.number().min(1, 'Limit must be greater than 0').max(100, 'Limit cannot exceed 100').optional(),
    sort: z.string().regex(/^[a-zA-Z]+:(asc|desc)$/, 'Invalid sort format').optional(),
});

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
export type UserQuerySchema = z.infer<typeof userQuerySchema>;
