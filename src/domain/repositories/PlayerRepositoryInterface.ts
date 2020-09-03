import { Player } from '../models/Player';

export interface PlayerRepositoryInterface {
    createPlayer(player: Player): Promise<any>;

    listPlayer(include: object[], page: number, perPage: number): Promise<{ data: Player[], total: number }>;
}
