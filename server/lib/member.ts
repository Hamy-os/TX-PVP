import { Vector3 } from "fivem-js";
import { Teams, ServerId, Identifier, Player } from "../typings";
import { getPlayerIdentifier, wrapIntoVec3 } from "./";

export class Member {
  private player: Player
  public constructor(serverId: ServerId) {
    this.player = {serverId: serverId, name: GetPlayerName(serverId), identifier: getPlayerIdentifier(serverId) as Identifier}
  }
    // TODO! testing
  public get coords(): Vector3 {
    return wrapIntoVec3(GetEntityCoords(GetPlayerPed(this.player.serverId)))
  }
}