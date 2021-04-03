import * as Cfx from 'fivem-js';
import { Loadouts } from "./lib/loadouts";
import {spawnLocations, setupMapEvents, Cameras, Drones, ClientCallback, Lobby, Blip, Pinger} from "./lib"
import { Team } from "./typings";
/**Init functions */

Lobby.listen()
setupMapEvents()
ClientCallback.listen()
Loadouts.listen()
Blip.listen()
Cameras.setUpCameraUtils()
Drones.setUpDroneUtils()

setInterval(() => {RestorePlayerStamina(PlayerId(), 1.0)}, 500)
console.log("Setting up commands")

// join command for lobby
RegisterCommand("join", async (source: string, args: string[]) => {
  emit("TXPVP:CORE:spawnPlayerOnLobby", (spawnLocations.get("lobbySpawn")))
  Loadouts.giveLoadoutToPlayer("basic", "NARCO")
}, false);

// get players team
RegisterCommand("team", async (source: string, args: string[]) => { 
  const result = await ClientCallback.triggerServerCallback<[Team, string]>("getPlayerTeam")
  console.log(result)
}, false)

// car spawner usage: /car carname
RegisterCommand('car', async (source: number, args: string[]) => {
  const vehicle = await Cfx.World.createVehicle(new Cfx.Model(args[0]), Cfx.Game.PlayerPed.Position, Cfx.Game.PlayerPed.Heading);
  Cfx.Game.PlayerPed.setIntoVehicle(vehicle, Cfx.VehicleSeat.Driver);
}, true);


// add chat suggestion for car spawn
setImmediate(() => {
  emit('chat:addSuggestion', '/car', 'spawns a car', [
    {name:"carname", help:"name of the car you want to spawn"}
  ]);
});

// ping command
RegisterCommand("ping", () => {
  Pinger.castPing()
}, false)

// tp command usage: /tp location
RegisterCommand("tp", (source: string, args: string[]) => {
  Cfx.Game.PlayerPed.Position = spawnLocations.get(args[0]) || spawnLocations.get("airField")
}, false)


// add chat suggestion for tp
setImmediate(() => {
  emit('chat:addSuggestion', '/tp', 'teleport to a predefined location', [
    {
      name: "location name", help: "the name of where you want to teleport to, the options are: lobbySpawn, smallPort, mansion, bigPort, wareHouses, partyPlace and northYankton"}
  ]);
});


// equip a loadout usage: /loadout name team 
RegisterCommand("loadout", (source: string, args: string[]) => {
  console.log("Command triggered")
  Loadouts.giveLoadoutToPlayer(args[0], args[1] as Team)
}, false)

// add chat suggestion for /jointeam
setImmediate(() => {
  emit('chat:addSuggestion', '/jointeam', 'Name of the team you wish to join', [
    {name:"Team name", help:"The options are: NARCO and DEA (case sensative)"}
  ]);
});

// add chat suggestion for loadout
setImmediate(() => {
  emit('chat:addSuggestion', '/loadout', 'equip a loadout', [
    {name:"loadout name", help:"the name of the loadout. The options for DEA are: heavy, smg, ninja, sniper and rpg. The options for narco are assault, military, ninja, explosive and sniper"},
    {name:"team name", help:"The name of the team you are currently on. Options are DEA or NARCO"}
  ]);
});

//teleport to cayo perico
RegisterCommand("cayo", (source: string, args: string[]) => {
  emit("TXPVP:CORE:loadIsland")
  Cfx.Game.PlayerPed.Position = spawnLocations.get(args[0]) || spawnLocations.get("airField")
}, false)

// teleport to north yankton
RegisterCommand("yankton", (source: string, args: string[]) => {
  emit("TXPVP:CORE:loadNorthYankton")
  Cfx.Game.PlayerPed.Position = spawnLocations.get("northYankton")
}, false)
