import { Vector3 } from "fivem-js";
import { Teams, ServerId, Identifier, Player, Team } from "../typings";
import { getPlayerIdentifier, wrapIntoVec3 } from "./";

export class Member {
  private player: Player
  public constructor(serverId: ServerId, team: Team) {
    this.player = {serverId: serverId, name: GetPlayerName(serverId), identifier: getPlayerIdentifier(serverId) as Identifier, team}
  }
    // TODO! testing
  public get coords(): Vector3 {
    return wrapIntoVec3(GetEntityCoords(GetPlayerPed(this.player.serverId)))
  }
  public set setLoadout(loadout: string) {
    emitNet("TXPVP:CORE:setLoadout", this.player.serverId, loadout, this.player.team)
  }
}