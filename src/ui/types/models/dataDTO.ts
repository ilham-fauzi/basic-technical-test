import { ApiProperty } from '@nestjs/swagger';

export class PlayerDTO {
    @ApiProperty({ type: String, description: 'player name', name: 'name', example: 'Luis Alberto Suárez Díaz'})
    name: string;
    @ApiProperty({ type: Number, description: 'back number player', name: 'back_number', example: 10})
    // tslint:disable-next-line: variable-name
    back_number: number;
    @ApiProperty({ type: Number, description: 'team id', name: 'team_id', example: 1})
    // tslint:disable-next-line: variable-name
    team_id: number;
}

// tslint:disable-next-line: max-classes-per-file
export class TeamDTO {
    @ApiProperty({ type: String, description: 'team name', name: 'name', example: 'barcelona'})
    name: string;
}

// tslint:disable-next-line: max-classes-per-file
export class PlayerListDTO {
    @ApiProperty({ type: Number, description: 'pahge number', name: 'page', example: 1})
    page: number;
    @ApiProperty({ type: Number, description: 'data per page', name: 'per_page', example: 10})
    // tslint:disable-next-line: variable-name
    per_page: number;
}

// tslint:disable-next-line: max-classes-per-file
export class GCDDTO {
    @ApiProperty({ type: Number, description: 'apple number', name: 'apple', example: 25})
    apple: number;
    @ApiProperty({ type: Number, description: 'cake number', name: 'cake', example: 20})
    cake: number;
}
