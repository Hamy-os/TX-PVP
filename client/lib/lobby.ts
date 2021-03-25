import * as Cfx from 'fivem-js';
import {spawnLocations} from "./coords";

const playerCount = 0;

export function setupLobbyEvents() {
    onNet("TXPVP:CORE:spawnPlayerOnLobby", (coords: Cfx.Vector3) => {
        console.log("Received event")
        Cfx.Game.PlayerPed.Position = coords
        // i will do chat messages here soon
    })

}