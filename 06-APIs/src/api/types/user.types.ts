/**
 * User Management Types
 */

/** User entity with all properties */
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
