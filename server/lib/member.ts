import { Vector3 } from "fivem-js";
import { Teams, ServerId, Identifier, Player } from "../typings";
import { getPlayerIdentifier } from "./";

export class Member {
  private player: Player
  public constructor(serverId: ServerId) {
    this.player = {serverId: serverId, name: GetPlayerName(serverId), identifier: getPlayerIdentifier(serverId) as string}
  }
    // TODO! testing
  public coords(): Vector3 {
    const crs = GetEntityCoords(GetPlayerPed(this.player.serverId))
    return new Vector3(crs[0], crs[1], crs[2]) 
  }
}