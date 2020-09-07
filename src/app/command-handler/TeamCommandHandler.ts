import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TeamNameBadRequestException } from '../../app/exceptions/TeamNameBadRequestException';
import { Team } from '../../domain/models/Team';
import { TeamRepositoryInterface } from '../../domain/repositories/TeamRepositoryInterface';
import { TeamCommand } from '../command/TeamCommand';

@CommandHandler(TeamCommand)
export class TeamCommandHandler implements ICommandHandler {
    constructor(
        @Inject('TeamRepositoryInterface') private readonly teamRepo: TeamRepositoryInterface,
    ) { }

    async execute(command: TeamCommand): Promise<Team> {
        const newTeam = Team.create(command);
        const checkTeamName: Team = await this.teamRepo.findOneByName(command.teamName);
        if (checkTeamName) { throw new TeamNameBadRequestException(command.teamName); }
        const newNameFromDatabase: Team = await this.teamRepo.createTeam(newTeam);
        return newNameFromDatabase;
    }

}
