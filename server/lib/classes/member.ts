import { Vector3 } from "fivem-js";
import { ServerId, Identifier, Player, Team } from "../../typings";
import { getPlayerIdentifier, castVec3, ServerCallback } from "../";

export class Member {
  private player: Player
  private cloneId: number
  public constructor(serverId: ServerId, team: Team) {
    this.player = { serverId: serverId, name: GetPlayerName(serverId), identifier: getPlayerIdentifier(serverId) as Identifier, team }
    console.log(`${GetPlayerName(serverId)} added to ${team}`)
    emitNet("TXPVP:CORE:setTeam", serverId, team)
  }
    // TODO! testing
  public get coords(): Vector3 {
    return castVec3(GetEntityCoords(GetPlayerPed(this.player.serverId)))
  }
  public set setLoadout(loadout: string) {
    emitNet("TXPVP:CORE:setLoadout", this.player.serverId, loadout, this.player.team)
  }
  
  public spawn(loc: Vector3): void {
    emitNet("TXPVP:CORE:spawnPlayer", this.player.serverId, loc)
  }
  public get team(): Team {
    return this.player.team
  }
  public trigger(eventName: string, ...args: unknown[]): void {
    emitNet(eventName, this.player.serverId, args)
  }
  public createClone(crds: Vector3): number {
    const ped = GetPlayerPed(this.player.serverId)
    const coords = crds || castVec3(GetEntityCoords(ped))
    const heading = GetEntityHeading(ped)
    this.cloneId = CreatePed(4, GetEntityModel(ped), coords.x, coords.y, coords.z, heading, true, true)
    return this.cloneId
  }
  public deleteClone(): void {
    try {
      if (DoesEntityExist(this.cloneId)) {
        DeleteEntity(this.cloneId)
      } else {
        console.log("Failed to delete player clone, its probably already deleted")
      }
    } catch(err) {console.log("Failed to delete player clone, its probably already deleted")}
  }
}