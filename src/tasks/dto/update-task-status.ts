import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class UpdateTaskStatusDto {
    
    @IsNotEmpty()
    @IsString()
    @IsIn(['to-do', 'in-progress', 'done'])
    status: string;

}