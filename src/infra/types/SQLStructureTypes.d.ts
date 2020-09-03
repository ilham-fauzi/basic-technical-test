export interface PlayerSQLStructure {
    id: string;
    name: string;
    back_number: number;
    team_id: number;
    tbl_team?: TeamSQLStructure;
}

export interface TeamSQLStructure {
    id: number;
    name: string;
}