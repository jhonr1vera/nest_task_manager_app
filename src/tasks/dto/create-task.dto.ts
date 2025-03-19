import { IsNotEmpty, IsString, MinLength, IsIn, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsIn(['to-do', 'in-progress', 'done'])
    status: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    assigned_user: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    date_limit: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsIn(['low', 'medium', 'high'])
    priority: string;
}
