import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'INTERNAL_SERVER_ERROR';
    let message = '服务器内部错误';
    let details: unknown;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const raw = exception.getResponse();

      if (typeof raw === 'string') {
        message = raw;
      } else if (raw && typeof raw === 'object') {
        const payload = raw as Record<string, unknown>;
        const payloadMessage = payload.message;

        if (Array.isArray(payloadMessage)) {
          message = payloadMessage.join('；');
        } else if (typeof payloadMessage === 'string' && payloadMessage) {
          message = payloadMessage;
        } else if (typeof exception.message === 'string' && exception.message) {
          message = exception.message;
        }

        if (typeof payload.code === 'string' && payload.code) {
          code = payload.code;
        } else if (typeof payload.error === 'string' && payload.error) {
          code = payload.error;
        } else {
          code = HttpStatus[status] || 'HTTP_ERROR';
        }

        details = payload;
      } else {
        message = exception.message || message;
        code = HttpStatus[status] || 'HTTP_ERROR';
      }
    }

    const traceId = (request.headers['x-request-id'] as string) || (request.headers['x-correlation-id'] as string) || null;

    response.status(status).json({
      success: false,
      code,
      message,
      details,
      traceId,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
