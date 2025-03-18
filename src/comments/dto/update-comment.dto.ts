import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import {
    IsString,
    MinLength,
    IsNotEmpty,
    IsDate
} from 'class-validator'

export class UpdateCommentDto {
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    content?: string;
}
