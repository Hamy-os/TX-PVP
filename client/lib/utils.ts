import { spawnLocations } from "./";
import * as Cfx from 'fivem-js';


export function getRandomLocationOnIsland() {
    const items = Array.from<Cfx.Vector3>(spawnLocations as unknown as Iterable<Cfx.Vector3>); // smh scuffed shit
    return items[Math.floor(Math.random() * items.length)];
}


RegisterCommand("tp", (source: string, args: string[]) => {
  Cfx.Game.PlayerPed.Position = spawnLocations.get(args[0]) || spawnLocations.get("airField")
}, true)

