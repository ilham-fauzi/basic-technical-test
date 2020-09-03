import { AppleCakeBundleCommandHandler } from 'app/command-handler/AppleCakeBundleCommandHandler';
import { PlayerQueryHandler } from 'app/query-handler/PlayerQueryhandler';
import { PlayerCommandHandler } from '../../app/command-handler/PlayerCommandHandler';
import { TeamCommandHandler } from '../../app/command-handler/TeamCommandHandler';
import { PlayerRepository } from '../../infra/repositories/PlayerRepository';
import { TeamRepository } from '../../infra/repositories/TeamRepository';

export const Provider = [
    PlayerCommandHandler,
    TeamCommandHandler,
    PlayerQueryHandler,

    AppleCakeBundleCommandHandler,

    {
        provide: 'PlayerRepositoryInterface',
        useClass: PlayerRepository,
    },
    {
        provide: 'TeamRepositoryInterface',
        useClass: TeamRepository,
    },
];
