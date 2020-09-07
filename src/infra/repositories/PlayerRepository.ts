import { PlayerSQLStructure } from '../../infra/types/SQLStructureTypes';
import { Player } from '../../domain/models/Player';
import { PlayerRepositoryInterface } from '../../domain/repositories/PlayerRepositoryInterface';
import { BaseSQLRepository } from './base/BaseSQLRepository';
import { Team } from '../../domain/models/Team';

export class PlayerRepository extends BaseSQLRepository implements PlayerRepositoryInterface {
    constructor() {
        super('tbl_player');
    }

    async listPlayer(query: object[], page: number, perPage: number): Promise<{ data: Player[]; total: number; }> {
        return this.list(query, page, perPage).then((res) => {
            if (res) {
                return {
                    data: res.rows.map((player: PlayerSQLStructure) => {
                        return new Player(
                            player.id,
                            player.name,
                            player.back_number,
                            player.team_id,
                            player.created_at,
                            player.created_at,
                            Team.fromSQL(player.tbl_team),
                        );
                    }),
                    total: res.count,
                };
            }
            return null;
        });
    }

    async createPlayer(player: Player): Promise<any> {
        return this.upsert({
            id: player.getId,
            name: player.getPlayerName,
            back_number: player.getBackNumber,
            team_id: player.getTeamId,
            created_at: player.getCreatedAt,
            updated_at: player.getUpdatedAt,
        });
    }

}
