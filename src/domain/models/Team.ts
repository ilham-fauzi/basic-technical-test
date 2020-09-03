import { TeamSQLStructure } from 'infra/types/SQLStructureTypes';
import { TeamCommand } from '../../app/command/TeamCommand';

export class Team {
    private id: number;
    private teamName: string;

    constructor(
        teamName: string,
        id?: number,
    ) {
        this.setId(id);
        this.setTeamName(teamName);
    }

    static create(data: TeamCommand) {
        return new Team(data.teamName, null);
    }

    static fromSQL(team: TeamSQLStructure): Team {
        if (team) {
            return new Team(team.name, team.id);
        }
        return new Team('', 0);
    }

    public setId(id: number): void {
        this.id = id;
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
}
