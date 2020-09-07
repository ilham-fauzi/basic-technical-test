import { Team } from "domain/models/Team";

export class TeamTransformer {
    static transformDetail(data: Team) {
        return {
            team_id: data.getId,
            team_name: data.getTeamName,
        };
    }
}
