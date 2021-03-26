import * as Cfx from 'fivem-js';
import { giveLoadoutToPlayer } from "./lib/loadouts";
import {spawnLocations, setupMapEvents, setupLobbyEvents, setUpCameraUtils} from "./lib"
import { Team } from "./typings";
/**Init functions */

setupLobbyEvents()
setupMapEvents()
setUpCameraUtils()
RegisterCommand("join", async (source: string, args: string[]) => {
  emit("TXPVP:CORE:spawnPlayerOnLobby", (spawnLocations.get("lobbySpawn")))
  giveLoadoutToPlayer("basic", "NARCO")
}, false);



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

RegisterCommand("warpIsland", (source: string, args: string[]) => {
  emit("TXPVP:CORE:loadIsland")
  Cfx.Game.PlayerPed.Position = spawnLocations.get(args[0]) || spawnLocations.get("airField")
}, true)

RegisterCommand("warpYankton", (source: string, args: string[]) => {
  emit("TXPVP:CORE:loadNorthYankton")
  Cfx.Game.PlayerPed.Position = spawnLocations.get("northYankton")
}, true)