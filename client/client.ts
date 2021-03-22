import * as Cfx from 'fivem-js';


RegisterCommand("warpIsland", async (source: string, args: string[]) => {
  emit("TXPVP:CORE:loadIsland");
}, true);


RegisterCommand('car', async (source: number, args: string[]) => {
  const vehicle = await Cfx.World.createVehicle(new Cfx.Model(args[0]), Cfx.Game.PlayerPed.Position, Cfx.Game.PlayerPed.Heading);
  Cfx.Game.PlayerPed.setIntoVehicle(vehicle, Cfx.VehicleSeat.Driver);
}, true);