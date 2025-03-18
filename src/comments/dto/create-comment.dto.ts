import { IsDate, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    content: string;

    @IsNotEmpty()
    @IsNumber()
    task_id: number;

    // @IsNotEmpty()
    // @IsNumber()
    // user_id: number;

    @IsDate()
    @IsNotEmpty()
    created_at: Date;
}
