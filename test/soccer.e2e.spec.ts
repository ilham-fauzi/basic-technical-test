import { ModuleMetadata, Provider } from '@nestjs/common';
import { PlayerCommandHandler } from '../src/app/command-handler/PlayerCommandHandler';
import { PlayerRepositoryInterface } from '../src/domain/repositories/PlayerRepositoryInterface';
import { TeamRepositoryInterface } from '../src/domain/repositories/TeamRepositoryInterface';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { playerDTO, teamDTO } from '../src/ui/types/SoccerTypes';
import { PlayerCommand } from '../src/app/command/PlayerCommand';
import { Player } from '../src/domain/models/Player';
import { TeamCommandHandler } from '../src/app/command-handler/TeamCommandHandler';
import { TeamDTO } from '../src/ui/types/models/dataDTO';
import { TeamCommand } from '../src/app/command/TeamCommand';
import { Team } from '../src/domain/models/Team';
import { TeamSQLStructure } from '../src/infra/types/SQLStructureTypes';
import { PlayerQueryHandler } from '../src/app/query-handler/PlayerQueryhandler';
import { PlayerListQuery } from '../src/app/query/PlayerListQuery';
import { AppleCakeBundleCommandHandler } from '../src/app/command-handler/AppleCakeBundleCommandHandler';
import { AppleCakeBundleCommand } from 'app/command/AppleCakeBundleCommand';

describe('PlayerCommandHandler (e2e)', () => {
    let commandHandler: PlayerCommandHandler;
    let playerRepository: PlayerRepositoryInterface;
    let teamTeapository: TeamRepositoryInterface;

    beforeAll(async () => {
        const playerProvider: Provider = { provide: 'PlayerRepositoryInterface', useValue: {}};
        const teamProvider: Provider = { provide: 'TeamRepositoryInterface', useValue: {}};
        const provider: Provider[] = [PlayerCommandHandler, playerProvider, teamProvider];
        const moduleMetadata: ModuleMetadata = { providers: provider };

        const testModule = await Test.createTestingModule(moduleMetadata).compile();
        commandHandler = testModule.get(PlayerCommandHandler);
        playerRepository = testModule.get('PlayerRepositoryInterface');
        teamTeapository = testModule.get('TeamRepositoryInterface');
    });

    describe('insert player', () => {
        it('create player success => void return', async () => {
            const payload: playerDTO = {
                name: 'agus',
                back_number: 2,
                team_id: 1,
            };
            const teamData = { id: payload.team_id, name: 'barcelona'};
            teamTeapository.findOneById = jest.fn().mockResolvedValue(teamData);
            const command: PlayerCommand = {
                playerName: payload.name,
                backNumber: payload.back_number,
                teamId: payload.team_id,
            };
            const newPlayer = Player.create(command);
            playerRepository.createPlayer = jest.fn().mockResolvedValue(newPlayer);
            await expect(commandHandler.execute(command)).resolves.toEqual(undefined);
        });

        it('create failed => throw error team id not found', async () => {
            const payload: playerDTO = {
                name: 'agus',
                back_number: 2,
                team_id: 12,
            };
            teamTeapository.findOneById = jest.fn().mockResolvedValue(null);
            const command: PlayerCommand = {
                playerName: payload.name,
                backNumber: payload.back_number,
                teamId: payload.team_id,
            };
            await expect(commandHandler.execute(command)).rejects.toThrowError(`Team ID : ${payload.team_id} Not Found`);
        });
    });
});

describe('TeamCommandHandler (e2e)', () => {
    let commandHanler: TeamCommandHandler;
    let teamTeapository: TeamRepositoryInterface;

    beforeAll(async () => {
        const teamProvider: Provider = { provide: 'TeamRepositoryInterface', useValue: {}};
        const provider: Provider[] = [TeamCommandHandler, teamProvider];
        const moduleMetadata: ModuleMetadata = { providers: provider };

        const testModule = await Test.createTestingModule(moduleMetadata).compile();
        commandHanler = testModule.get(TeamCommandHandler);
        teamTeapository = testModule.get('TeamRepositoryInterface');
    });

    describe('insert team', () => {
        it('create team success => void return', async () => {
            const payload: TeamDTO = {
                name: 'barcelona',
            };
            teamTeapository.findOneByName = jest.fn().mockResolvedValue(null);
            const command: TeamCommand = {
                teamName: payload.name,
            };
            const newTeam = Team.create(command);
            teamTeapository.createTeam = jest.fn().mockResolvedValue(newTeam);
            await expect(commandHanler.execute(command)).resolves.toEqual(undefined);
        });

        it('create team failed => throw error team duplicate', async () => {
            const payload: TeamSQLStructure = {
                id: 1,
                name: 'barcelona',
            };
            const teamData = Team.fromSQL(payload);
            teamTeapository.findOneByName = jest.fn().mockResolvedValue(teamData);
            const command: TeamCommand = {
                teamName: payload.name,
            };
            await expect(commandHanler.execute(command)).rejects.toThrowError(`Team name : ${payload.name} ALready exist`);
        });
    });
});

describe('PlayerQueryHandler (e2e)', () => {
    let queryHandler: PlayerQueryHandler;
    let playerRepository: PlayerRepositoryInterface;

    beforeAll(async () => {
        const playerProvider: Provider = { provide: 'PlayerRepositoryInterface', useValue: {}};
        const teamProvider: Provider = { provide: 'TeamRepositoryInterface', useValue: {}};
        const provider: Provider[] = [PlayerQueryHandler, playerProvider, teamProvider];
        const moduleMetadata: ModuleMetadata = { providers: provider };

        const testModule = await Test.createTestingModule(moduleMetadata).compile();
        queryHandler = testModule.get(PlayerQueryHandler);
        playerRepository = testModule.get('PlayerRepositoryInterface');
    });

    describe('player list', () => {
        it('get player list success => void object', async () => {
            const payload = {
               page: 1,
               per_page: 1,
            };
            const query: PlayerListQuery = {
                include: [{}],
                page: payload.page,
                perPage: payload.per_page,
            };
            playerRepository.listPlayer = jest.fn().mockResolvedValue({data: {
                id: 'ab58f6cc-6d59-4fd7-b119-b8bd81baf511',
                name: 'Luis Alberto Suárez Díaz',
                back_number: 10,
                team_id: 1,
                team: {
                    id: 1,
                    name: 'barcelona',
                },
            }, total: 1});
            await expect(queryHandler.execute(query)).resolves.toEqual({
                data: {
                    id: 'ab58f6cc-6d59-4fd7-b119-b8bd81baf511',
                    name: 'Luis Alberto Suárez Díaz',
                    back_number: 10,
                    team_id: 1,
                    team: {
                        id: 1,
                        name: 'barcelona',
                    },
                },
                meta: {
                    page: 1,
                    per_page: 1,
                    total: 1,
                    total_page: 1,
                },
            });
        });
    });
});

describe('AppleCakeBundleCommandHandler (e2e)', () => {
    let commandHandler: AppleCakeBundleCommandHandler;

    beforeAll(async () => {
        const provider: Provider[] = [AppleCakeBundleCommandHandler];
        const moduleMetadata: ModuleMetadata = { providers: provider };

        const testModule = await Test.createTestingModule(moduleMetadata).compile();
        commandHandler = testModule.get(AppleCakeBundleCommandHandler);
    });

    it('GCD from 20 cakes and 25 apple => result success', async () => {
        const payload = {
            apple: 25,
            cake: 20,
        };
        const command: AppleCakeBundleCommand = {
            apple: 25,
            cake: 20,
        };
        await expect(commandHandler.execute(command)).resolves.toEqual({
            box: 5,
            apple: 5,
            cake: 4,
        });
    });
});
