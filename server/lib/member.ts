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
    return GetEntityCoords(GetPlayerPed(this.player.serverId)) as unknown as Vector3 // weird ass type cast 
  }
}