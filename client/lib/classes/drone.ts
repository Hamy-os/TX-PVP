import { ClientCallback, Loadouts, castVec3 } from "../";
import { Team } from "../../typings";
import * as Cfx from 'fivem-js';
export class Drones {
  private static isDroneOpen = false;
  private static coords: number[] = []
  private static droneModel = GetHashKey("rcmavic")
  private static currDrone: Cfx.Vehicle

  public static async setUpDroneUtils(): Promise<void> {
    const result = await ClientCallback.triggerServerCallback<[Team, string]>("getPlayerTeam")
    if (result[0] == "DEA") {
      RegisterCommand("openDrone", () => {
        if (Drones.isDroneOpen) {
          Drones.closeDrone()
        } else {
          Drones.openDrone()
        }
      }, false)

      RegisterCommand("castDronePing", () => {
        if (Drones.isDroneOpen) {
          Drones.ping()
        }
      }, false)

      RegisterKeyMapping('openDrone', 'Open your drone', 'keyboard', 'b')
      RegisterKeyMapping('openDrone', 'Ping your drone\'s location for your teammates ', 'keyboard', 'y')
    }
  }
  public static async openDrone(): Promise<void> {
    const ped = PlayerPedId()
    DoScreenFadeOut(100)
    SetTimecycleModifier("scanline_cam_cheap")
    SetTimecycleModifierStrength(1.0)
    Drones.coords = GetEntityCoords(ped, false)
    emitNet("TXPVP:CORE:ClonePlayer", Drones.coords, Loadouts.model)
    const position = new Cfx.Vector3(Drones.coords[0] + 5.0, Drones.coords[1] + 5.0, Drones.coords[2] + 5.0)
    const vehicle = await Cfx.World.createVehicle(new Cfx.Model(Drones.droneModel), position, Cfx.Game.PlayerPed.Heading);
    SetEntityInvincible(Cfx.Game.PlayerPed.Handle, true)
    SetEntityInvincible(vehicle.Handle, true)
    Cfx.Game.PlayerPed.setIntoVehicle(vehicle, Cfx.VehicleSeat.Driver);
    Drones.currDrone = vehicle
    Drones.isDroneOpen = true
    setTimeout(() => { DoScreenFadeIn(500),  SendNuiMessage(JSON.stringify({
      type: "droneVisible",
      value: true,
    })) }, 500)
  }
  public static closeDrone(): void {
    DoScreenFadeOut(50)
    emitNet("TXPVP:CORE:DeleteClone")
    Drones.currDrone.delete()
    const ped = PlayerPedId()
    SetEntityInvincible(ped, false)
    ClearTimecycleModifier();
    Drones.isDroneOpen = false
    SetEntityCoords(ped, Drones.coords[0], Drones.coords[1], Drones.coords[2], false, false, false, false)
    setTimeout(() => { DoScreenFadeIn(500);   SendNuiMessage(JSON.stringify({
      type: "droneVisible",
      value: false
    }))}, 500)
  }
  public static ping(): void {
    console.log("Pinging")
  }
}