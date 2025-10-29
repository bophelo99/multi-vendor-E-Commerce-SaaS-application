export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly details?: any;

    constructor(message: string, statusCode: number, isOperational = true, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;

        if ((Error as any).captureStackTrace) {
            (Error as any).captureStackTrace(this, this.constructor) 
        }
    }
}

//not found error
export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

//validation error
export class ValidationError extends AppError {
    constructor(message = "Invalid request data", details?: any) {
        super(message, 400, true, details);
    }
}

//authentication error
export class AuthError extends AppError {
    constructor(message = "Unauthorized access") {
        super(message, 401);
    }
}

//forbidden error -> insufficient permissions to administer
export class ForbiddenError extends AppError {
    constructor(message = "Forbidden access") {
        super(message, 403);
    }
}

//database error -> for MangoDB/Postgres database related issues
export class DatabaseError extends AppError {
    constructor(message = "Database error occurred", details?: any) {
        super(message, 500, true, details);
    }
}

//ratelimit error, when user exceeds API request limit
export class RateLimitError extends AppError {
    constructor(message = "Too many requests, please try again later.") {
        super(message, 429);
    }
}