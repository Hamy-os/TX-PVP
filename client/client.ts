import * as Cfx from 'fivem-js';
import { giveLoadoutToPlayer } from "./lib/loadouts";
import {spawnLocations, eventFn} from "./lib"
import { Team } from "./typings";

eventFn()

RegisterCommand("warpIsland", async (source: string, args: string[]) => {
  try {
    emit("TXPVP:CORE:loadIsland", spawnLocations.get("airField"));
  } catch (err) {
    console.log("ERR", err)
  }
  giveLoadoutToPlayer("basic", "DEA")
}, true);



RegisterCommand('car', async (source: number, args: string[]) => {
  const vehicle = await Cfx.World.createVehicle(new Cfx.Model(args[0]), Cfx.Game.PlayerPed.Position, Cfx.Game.PlayerPed.Heading);
  Cfx.Game.PlayerPed.setIntoVehicle(vehicle, Cfx.VehicleSeat.Driver);
}, true);





RegisterCommand("tp", (source: string, args: string[]) => {
  Cfx.Game.PlayerPed.Position = spawnLocations.get(args[0]) || spawnLocations.get("airField")
}, true)




 
RegisterCommand("getLoadout", (source: string, args: string[]) => {
  giveLoadoutToPlayer(args[0], args[1] as Team)
}, true)