import { IsOptional, isNotEmpty } from "class-validator";

export class PaginRequest {

    @IsOptional()
    limit: number;

    @IsOptional()
    page: number;
}