// import type { Request, Response, NextFunction } from 'express';

// export interface AppError extends Error {
//     status?: string;
//     statusCode?: number;
//     isOperational?: boolean;
// }

// export default function errorMiddleware(err: AppError, req: Request, res: Response, next: NextFunction) {
//     const statusCode = err.statusCode || (err as any).status || 500;
//     const status = statusCode >= 500 ? 'error' : 'fail';
//     const payload: any = {
//         status,
//         message: err.message || 'Internal Server Error'
//     };
//     if (process.env.NODE_ENV === 'development') payload.stack = err.stack;
//     res.status(statusCode).json(payload);
// }