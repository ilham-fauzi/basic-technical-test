export interface PlayerSQLStructure {
    id: string;
    name: string;
    back_number: number;
    team_id: number;
    created_at: string;
    updated_at: string;
    tbl_team?: TeamSQLStructure;
}

export interface TeamSQLStructure {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}