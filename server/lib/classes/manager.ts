import { ServerCallback, getTeams } from "..";
import { ServerId, Team } from "../../typings";
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
    onNet("TXPVP:CORE:globalizeBlip", (targets: ServerId[] | Team, coords: number[], sprite: number, color: number, id: string, visibility: number, title: string) => {
      const src = source
      if (typeof targets == "object") {
        targets.forEach((idx: ServerId) => {
          if (idx != src) { // prevent dupe blips
            emitNet("TXPVP:CORE:createBlip", idx, coords, sprite, color, id, visibility, title)
          }
        })
      } else {
        const teams = getTeams()[targets]
        for (const [k, v] of Object.entries(teams)) {
          if (k != src) {
            emitNet("TXPVP:CORE:createBlip", k, coords, sprite, color, id, visibility, title)
          }
        }
      }
    })
  }
}