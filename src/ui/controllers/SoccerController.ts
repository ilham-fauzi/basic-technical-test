import { number, string } from '@hapi/joi';
import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiCreatedResponse, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { ListPlayerRequestAdapter } from '../../ui/request-adapters/ListPlayerRequestAdapter';
import { PlayerListTransformer } from '../../ui/transformers/PlayerListTransformer';
import { PlayerDTO, PlayerListDTO, TeamDTO } from 'ui/types/models/dataDTO';
import { InsertPlayerRequestAdapter } from '../request-adapters/InsertPlayerRequestAdapter';
import { InsertTeamRequestAdapter } from '../request-adapters/InsertTeamRequestAdapter';
import { ResponseInterface } from '../types/CommonType';
import { playerDTO, teamDTO } from '../types/SoccerTypes';
import { TeamTransformer } from '../../ui/transformers/TeamTransformer';

@Controller('/soccer')
export class SoccerController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Post('insert-player')
    @ApiCreatedResponse({description: 'insert new player'})
    @ApiBody({ type: PlayerDTO})
    async insertPlayer(@Body() body): Promise<ResponseInterface> {
        const adapter = new InsertPlayerRequestAdapter();
        const command = await adapter.getCommandQuery({ body });
        await this.commandBus.execute(command);
        return {
            message: 'INSERT_PLAYER_SUCCESS',
            status: HttpStatus.CREATED,
            content: {},
        };
    }

    @Get('list-player')
    @ApiCreatedResponse({description: 'list player'})
    @ApiQuery({ type: Number, name: 'page', description: 'page number', example: 1 })
    @ApiQuery({ type: Number, name: 'per_page', description: 'total data per page', example: 10})
    async listPlayer(@Query() query): Promise<ResponseInterface> {
        const adapter = new ListPlayerRequestAdapter();
        const command = await adapter.getCommandQuery({ query });
        const { data, meta } = await this.queryBus.execute(command);
        return {
            message: 'LIST_PLAYER',
            status: HttpStatus.FOUND,
            content: {
                data: PlayerListTransformer.transformList(data),
                meta,
            },
        };
    }

    @Post('insert-team')
    @ApiCreatedResponse({description: 'create new team'})
    @ApiBody({ type: TeamDTO})
    async insertTeam(@Body() body: teamDTO): Promise<ResponseInterface> {
        const adapter = new InsertTeamRequestAdapter();
        const command = await adapter.getCommandQuery({ body });
        const newTeam = await this.commandBus.execute(command);
        return {
            message: 'INSERT_TEAM_SUCCESS',
            status: HttpStatus.CREATED,
            content: TeamTransformer.transformDetail(newTeam),
        };
    }
}
