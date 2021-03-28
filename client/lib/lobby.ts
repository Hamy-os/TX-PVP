import * as Cfx from 'fivem-js';
import { spawnLocations } from "./coords";
import { Cameras } from "./";
import { Team } from "../typings";
const playerCount = 0;

export class Lobby {
    private static playerTeam: Team
    public static listen(): void {
        onNet("TXPVP:CORE:spawnPlayerOnLobby", (coords: Cfx.Vector3) => {
            console.log("Received event")
            Cfx.Game.PlayerPed.Position = coords
            // i will do chat messages here soon
        })

        onNet("TXPVP:CORE:setTeam", (team: Team) => {
            Lobby.playerTeam = team
            console.log(`Assigned player to ${team}`)
            if (team == "NARCO") {
                Cameras.showBlips()
            } else {
                Cameras.hideBlips()
            }
        })
    }
    public static get team(): Team {
            return Lobby.playerTeam
    }

}