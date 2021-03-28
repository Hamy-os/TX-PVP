import { ServerCallback } from "..";

export class Manager {
  private static droneModel = GetHashKey("rcmavic")
  private static currDrones: { [key: string]: number } = {}
  public static listen(): void {
    ServerCallback.registerCallback("createDrone", (src: string) => {
      const entity = GetPlayerPed(src)
      const coords = GetEntityCoords(entity)
      Manager.currDrones[src] = CreateVehicle(Manager.droneModel, coords[0] + 5.0, coords[1] + 5.0, coords[2] + 5.0, GetEntityHeading(entity), true, true)
      SetPedIntoVehicle(entity, Manager.currDrones[src], -1)
      SetPlayerInvincible(parseInt(src), true)
      return Manager.currDrones[src]
    })
    onNet("TXPVP:CORE:DeleteDrone", () => {
      const src = source
      if (Manager.currDrones[src]) {
        DeleteEntity(Manager.currDrones[src])
        SetPlayerInvincible(parseInt(src), false)
        Manager.currDrones[src] = undefined
      } else {
        console.log("Hm weird")
      }
    })
  }
}