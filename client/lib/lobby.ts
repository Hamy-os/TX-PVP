import * as Cfx from 'fivem-js';
import { spawnLocations } from "./coords";
import { Cameras, Drones, Alarm } from "./";
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
                Cameras.setUpCameraUtils()
                Cameras.showBlips()
                Alarm.stopDistanceChecker()
            } else {
                Drones.setUpDroneUtils()
                Cameras.hideBlips()
                //TODO! move this to a better location so it starts only when an alarm is placed = less overhead
                Alarm.startDistanceChecker()
            }
        })
    }
    public static get team(): Team {
            return Lobby.playerTeam
    }

}