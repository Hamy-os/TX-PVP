import { Vector3 } from "fivem-js";
import { Teams, ServerId, Identifier, Player, Team } from "../../typings";
import { getPlayerIdentifier, castVec3 } from "../";

export class Member {
  private player: Player
  public constructor(serverId: ServerId, team: Team) {
    this.player = {serverId: serverId, name: GetPlayerName(serverId), identifier: getPlayerIdentifier(serverId) as Identifier, team}
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
}