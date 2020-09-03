import { Team } from '../models/Team';

export interface TeamRepositoryInterface {
    createTeam(team: Team): Promise<any>;

    findOneById(id: number): Promise<Team>;

    findOneByName(name: string): Promise<Team>;
}
