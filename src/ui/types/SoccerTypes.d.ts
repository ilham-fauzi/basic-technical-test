import { ApiProperty } from "@nestjs/swagger";

export interface playerDTO {
    name: string;
    back_number: number;
    team_id: number;
}

export interface teamDTO {
    name: string;
}
