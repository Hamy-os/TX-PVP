import * as Cfx from 'fivem-js';
import { AlarmRegistry, ServerId, Team } from "../../typings";
import { castVec3, ClientCallback, Notification } from "../";
export class Alarm {
  private static alarms: AlarmRegistry[] = []

  public static listen(): void {
    onNet("TXPVP:ALARM:action:placed", (coords: number[], placer: ServerId, name: string) => {
      Alarm.place(castVec3(coords), placer, name)
    })
    onNet("TXPVP:ALARM:action:triggered", async (index: number, by: ServerId) => {
      if (GetPlayerServerId(PlayerId()) != by) {
        const resp: [Team, string] = await ClientCallback.triggerServerCallback<[Team, string]>("getPlayerTeam")
        const name = resp[1]
        const team = resp[0]
        if (team == "NARCO") {
          Notification.onMap(`~g~Your motion detector "${Alarm.alarms[index].name} has been triggered!`)
        } else if (team == "DEA" ) {
          Notification.onMap(`~r~${GetPlayerName(by)} triggered a motion alarm!`)
        }
      }
    })
  }

  public static place(coords: Cfx.Vector3, id: ServerId, name: string): void {
    Alarm.alarms.push({coords, placedBy: id, name})
  }

}