import { IsNotEmpty, IsString, MinLength, IsIn, IsNumber, IsDateString } from 'class-validator';

export type taskId = number;

export class CreateTaskDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    description: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(['to-do', 'in-progress', 'done'])
    status: string;
    
    @IsNotEmpty()
    @IsNumber()
    assigned_user: number;

    @IsNotEmpty()
    @IsDateString()
    date_limit: Date;

    @IsNotEmpty()
    @IsString()
    @IsIn(['low', 'medium', 'high'])
    priority: string;
}
