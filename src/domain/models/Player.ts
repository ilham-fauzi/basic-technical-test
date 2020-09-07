'use strict';

import { PlayerCommand } from '../../app/command/PlayerCommand';
import uuid = require('uuid');
import { Team } from './Team';
import moment = require('moment');

export class Player {
    private id: string;
    private playerName: string;
    private backNumber: number;
    private teamId: number;
    private team: Team;
    private createdAt: string;
    private updatedAt: string;

    constructor(
        id: string,
        playerName: string,
        backNumber: number,
        teamId: number,
        createdAt?: string,
        updatedAt?: string,
        team?: Team,
    ) {
        this.setId(id);
        this.setPlayerName(playerName);
        this.setBackNumber(backNumber);
        this.setTeamId(teamId);
        this.setTeam(team);
        this.setCreatedAt(createdAt);
        this.setUpdatedAt(updatedAt);
    }

    static create(data: PlayerCommand) {
        return new Player(
            uuid.v4(),
            data.playerName,
            data.backNumber,
            data.teamId,
            moment().format('YYYY-MM-DD'),
            moment().format('YYYY-MM-DD'),
        );
    }

    public setId(id: string): void {
        this.id = id;
    }

    public setPlayerName(playerName: string): void {
        this.playerName = playerName;
    }

    public setBackNumber(backNumber: number): void {
        this.backNumber = backNumber;
    }

    public setTeamId(teamId: number): void {
        this.teamId = teamId;
    }

    public setTeam(team: Team): void {
        this.team = team;
    }

    public setCreatedAt(createdAt: string): void {
        this.createdAt = createdAt;
    }

    public setUpdatedAt(updatedAt: string): void {
        this.updatedAt = updatedAt;
    }

    get getId(): string {
        return this.id;
    }

    get getPlayerName(): string {
        return this.playerName;
    }

    get getBackNumber(): number {
        return this.backNumber;
    }

    get getTeamId(): number {
        return this.teamId;
    }

    get getTeam(): Team {
        return this.team;
    }

    get getCreatedAt(): string {
        return this.createdAt;
    }

    get getUpdatedAt(): string {
        return this.updatedAt;
    }
}
