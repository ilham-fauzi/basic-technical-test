import { TeamSQLStructure } from '../../infra/types/SQLStructureTypes';
import moment = require('moment');
import { TeamCommand } from '../../app/command/TeamCommand';

export class Team {
    private id: number;
    private teamName: string;
    private createdAt: string;
    private updatedAt: string;

    constructor(
        teamName: string,
        createdAt?: string,
        updatedAt?: string,
        id?: number,
    ) {
        this.setId(id);
        this.setTeamName(teamName);
        this.setCreatedAt(createdAt);
        this.setUpdatedAt(updatedAt);
    }

    static create(data: TeamCommand) {
        return new Team(data.teamName, moment().toISOString(), moment().toISOString());
    }

    static fromSQL(team: TeamSQLStructure): Team {
        if (team) {
            return new Team(team.name, team.created_at, team.updated_at, team.id);
        }
        return new Team('', '', '', 0);
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setCreatedAt(createdAt: string): void {
        this.createdAt = createdAt;
    }

    public setUpdatedAt(updatedAt: string): void {
        this.updatedAt = updatedAt;
    }

    public setTeamName(teamName: string): void {
        this.teamName = teamName;
    }

    get getId(): number {
        return this.id;
    }

    get getTeamName(): string {
        return this.teamName;
    }

    get getCreatedAt(): string {
        return this.createdAt;
    }

    get getUpdatedAt(): string {
        return this.updatedAt;
    }
}
