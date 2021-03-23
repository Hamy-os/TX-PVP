import { spawnLocations } from "./";
import * as Cfx from 'fivem-js';


export function getRandomLocationOnIsland(): Cfx.Vector3 {
    const items = Array.from<Cfx.Vector3>(spawnLocations as unknown as Iterable<Cfx.Vector3>); // smh scuffed shit
    return items[Math.floor(Math.random() * items.length)];
}

