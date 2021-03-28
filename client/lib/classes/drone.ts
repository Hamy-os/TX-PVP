import { ClientCallback, Loadouts, castVec3 } from "../";
import { Team } from "../../typings";
import * as Cfx from 'fivem-js';
export class Drones {
  private static isDroneOpen = false;
  private static coords: number[] = []
  private static droneModel = GetHashKey("rcmavic")
  private static currDrone: number
  private static tick: number

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
    const droneId = await ClientCallback.triggerServerCallback<number>("createDrone")
    Drones.tick = setTick(() => {DisableControlAction(2, 75, true)})
    Drones.currDrone = droneId
    Drones.isDroneOpen = true
    SetEntityInvincible(NetToVeh(droneId), true)
    setTimeout(() => { DoScreenFadeIn(500),  SendNuiMessage(JSON.stringify({
      type: "droneVisible",
      value: true,
    })) }, 500)
  }
  public static closeDrone(): void {
    DoScreenFadeOut(50)
    emitNet("TXPVP:CORE:DeleteClone")
    emitNet("TXPVP:CORE:DeleteDrone")
    const ped = PlayerPedId()
    SetEntityInvincible(ped, false)
    clearTick(Drones.tick)
    ClearTimecycleModifier();
    SetEntityInvincible(NetToVeh(Drones.currDrone), true)
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