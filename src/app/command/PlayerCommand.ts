export class PlayerCommand {
    public playerName: string;
    public backNumber: number;
    public teamId: number;

    constructor(
        playerName: string,
        backNumber: number,
        teamId: number,
    ) {
        this.playerName = playerName;
        this.backNumber = backNumber;
        this.teamId = teamId;
    }
}
