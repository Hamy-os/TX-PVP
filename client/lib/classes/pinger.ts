import { Blip, castVec3, ClientCallback, Notification } from "../";
import { BlipId, Team } from "../../typings";
export class Pinger {
  private static ping: Blip
  public static async castPing(): Promise<void> {
    if (Pinger.ping) {
      Pinger.ping.globalDelete()
      Pinger.ping.delete()
    }
    Pinger.ping = new Blip(castVec3(GetEntityCoords(PlayerPedId(), true)), 161, 7, `PING`, 6, `ply_name 's ping`)
    const result = await ClientCallback.triggerServerCallback<[Team, string]>("getPlayerTeam")
    Pinger.ping.globalize(result[0] as Team, `%name's ping`)
    Pinger.ping.hide() // hide it so the user wont see his own ping
    Notification.onMap("~g~Pinged location!")
  }
}