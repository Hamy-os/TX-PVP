import * as Cfx from 'fivem-js';
import {spawnLocations} from "./coords";

let playerCount = 0;

export function TestingFunction() {
    onNet("TXPVP:CORE:SPAWNPLAYERONLOBBY", (coords: Cfx.Vector3) => {
        console.log("Received event")
        Cfx.Game.PlayerPed.Position = coords
        // i will do chat messages here soon
    })

}