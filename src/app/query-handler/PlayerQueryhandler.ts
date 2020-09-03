import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationHelper } from '../../app/helpers/PaginationHelper';
import { PlayerListQuery } from '../../app/query/PlayerListQuery';
import { IPaginationMeta } from '../../app/types/CommonTypes';
import { Player } from '../../domain/models/Player';
import { PlayerRepositoryInterface } from '../../domain/repositories/PlayerRepositoryInterface';

@QueryHandler(PlayerListQuery)
export class PlayerQueryHandler implements IQueryHandler {
    constructor(
        @Inject('PlayerRepositoryInterface') private readonly playerRepo: PlayerRepositoryInterface,
    ) { }

    async execute(query: PlayerListQuery): Promise<{data: Player[], meta: IPaginationMeta}> {
        const {data, total} = await this.playerRepo.listPlayer(query.include, query.page, query.perPage);
        return {
            data,
            meta: PaginationHelper.generateMeta(query.perPage, query.perPage, total),
        };
    }
}
