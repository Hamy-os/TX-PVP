import { ServerCallback, getTeams } from "..";
import { ServerId, Team } from "../../typings";
export class Manager {
  private static droneModel = GetHashKey("rcmavic")
  private static currDrones: { [key: string]: number } = {}
  private static blipIds: string[] = []
  private static alarms: number[] = []
  public static listen(): void {
    ServerCallback.registerCallback<number>("createDrone", async (src: string) => {
      return new Promise((resolve, reject) => {
        const entity = GetPlayerPed(src)
        const coords = GetEntityCoords(entity)
        Manager.currDrones[src] = CreateVehicle(Manager.droneModel, coords[0] + 5.0, coords[1] + 5.0, coords[2] + 5.0, GetEntityHeading(entity), true, true)
        setTimeout(() => {
          if (DoesEntityExist(Manager.currDrones[src])) {
            SetPedIntoVehicle(entity, Manager.currDrones[src], -1)
            SetPlayerInvincible(parseInt(src), true)
            console.log("Resolving promise")
            resolve(Manager.currDrones[src])
          }
      }, 200) 
      })
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

    onNet("TXPVP:CORE:globalizeBlip", (targets: ServerId[] | Team, coords: number[], sprite: number, color: number, id: string, visibility: number, title: string, replace = true) => {
      const src = source
      const ttl = replace ? title.replace("ply_name ", GetPlayerName(src)) : title
      Manager.blipIds.push(`id_${GetPlayerName(src)}`)
      if (typeof targets == "object") {
        targets.forEach((idx: ServerId) => {
          if (idx != src) { // prevent dupe blips
            emitNet("TXPVP:CORE:createBlip", idx, coords, sprite, color, `id_${GetPlayerName(src)}`, visibility, ttl)
          }
        })
      } else {
        const teams = getTeams()[targets]
        for (const [k, v] of Object.entries(teams)) {
          if (k != src) {
            emitNet("TXPVP:CORE:createBlip", k, coords, sprite, color, `id_${GetPlayerName(src)}`, visibility, ttl)
          }
        }
      }
    })

    onNet("TXPVP:CORE:removeGlobalBlip", (key: string) => {
      const src = source
      Manager.blipIds.forEach((id: string, idx: number) => {
        if (id == `${key}_${GetPlayerName(src)}`) {
          delete Manager.blipIds[idx]
        }
      })
      emitNet("TXPVP:CORE:removeBlip", -1, key)
    })

    onNet("TXPVP:ALARM:action:triggerMotionAlarm", (index: number) => {
      const src = source
      console.log("Alarm trigger")
      emitNet("TXPVP:ALARM:action:triggered", -1, index, src)
    })
  }
}