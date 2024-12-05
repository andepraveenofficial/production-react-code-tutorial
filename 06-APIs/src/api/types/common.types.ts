/**
 * Common Types for API Requests and Responses
 */

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





