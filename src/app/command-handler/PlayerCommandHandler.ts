import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Player } from '../../domain/models/Player';
import { PlayerRepositoryInterface } from '../../domain/repositories/PlayerRepositoryInterface';
import { TeamRepositoryInterface } from '../../domain/repositories/TeamRepositoryInterface';
import { PlayerCommand } from '../command/PlayerCommand';
import { TeamIdNotFoundException } from '../exceptions/TeamIdNotFoundException';

@CommandHandler(PlayerCommand)
export class PlayerCommandHandler implements ICommandHandler {
    constructor(
        @Inject('PlayerRepositoryInterface') private readonly payerRepo: PlayerRepositoryInterface,
        @Inject('TeamRepositoryInterface') private readonly teamRepo: TeamRepositoryInterface,
    ) { }

    async execute(command: PlayerCommand): Promise<void> {
        const newPlayer = Player.create(command);
        const teamPlayer = await this.teamRepo.findOneById(command.teamId);
        if (!teamPlayer) { throw new TeamIdNotFoundException(command.teamId); }
        await this.payerRepo.createPlayer(newPlayer);
    }

}
