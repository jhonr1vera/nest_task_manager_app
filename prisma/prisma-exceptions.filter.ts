import { Prisma } from "@prisma/client";
import { Response } from "express";
import { ArgumentsHost, HttpStatus, Catch } from "@nestjs/common";
import { BaseExceptionFilter} from "@nestjs/core";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'There was an error in database';

    switch (exception.code) {
      case 'P2002':
        statusCode = HttpStatus.CONFLICT;
        message = `There was a violation in unique field: ${exception.meta?.target}`;
        break;
      case 'P2025':
        statusCode = HttpStatus.NOT_FOUND;
        message = 'The record was not found';
        break;
      case 'P2003':
        statusCode = HttpStatus.BAD_REQUEST;
        message = `There was an error in the foreign key: ${exception.meta?.field_name}`;
        break;
      case 'P1016':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'The query parameters do not match expected parameters';
        break;
      default:
        console.error('Prisma Error:', exception);
        break;
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error: exception.code,
    });
  }
}