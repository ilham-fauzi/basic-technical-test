import moment = require('moment');
import { Team } from '../../domain/models/Team';
import { TeamRepositoryInterface } from '../../domain/repositories/TeamRepositoryInterface';
import { BaseSQLRepository } from './base/BaseSQLRepository';

export class TeamRepository extends BaseSQLRepository implements TeamRepositoryInterface {
    constructor() {
        super('tbl_team');
    }

    async findOneById(id: number): Promise<Team> {
        return this.findOne({ id }).then((res: any) => {
            if (res) {
                return new Team(res.name, res.id);
            }
            return null;
        });
    }

    async findOneByName(name: string): Promise<Team> {
        return this.findOne({ name }).then((res: any) => {
            if (res) {
                return new Team(res.name, res.id);
            }
            return null;
        });
    }

    async createTeam(team: Team): Promise<any> {
        return this.upsert({
            id: team.getId,
            name: team.getTeamName,
            created_at: team.getCreatedAt,
            updated_at: team.getUpdatedAt,
        });
    }

}
