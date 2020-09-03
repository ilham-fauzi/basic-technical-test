import { Player } from '../../domain/models/Player';

export class PlayerListTransformer {
    public static transformList(model: Player[]): object {
        return model.map((player: Player) => ({
            number: player.getBackNumber,
            player_name: player.getPlayerName,
            team_name: player.getTeam.getTeamName,
        }));
    }
}
