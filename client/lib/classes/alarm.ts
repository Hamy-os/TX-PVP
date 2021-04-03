import * as Cfx from 'fivem-js';
import { AlarmRegistry, ServerId, Team } from "../../typings";
import { castVec3, ClientCallback, Ui } from "../";

// event TXPVP:ALARM:action:triggerMotionAlarm
export class Alarm {
  private static alarms: AlarmRegistry[] = []
  private static trickId: NodeJS.Timeout
  private static isChecking = false
  public static startDistanceChecker(): void {
    if (!Alarm.isChecking) {
      Alarm.trickId = setInterval(() => {
        Alarm.alarms.forEach((alarm: AlarmRegistry, idx: number) => {
          if (Cfx.Game.PlayerPed.Position.distance(alarm.coords) < 10.0) {
            emitNet("TXPVP:ALARM:action:triggerMotionAlarm", idx)
          }
        })
      }, 500)
    }
  }
  public static stopDistanceChecker(): void {
    clearInterval(Alarm.trickId)
  }
  public static listen(): void {
    onNet("TXPVP:ALARM:action:placed", (coords: number[], placer: ServerId, name: string) => {
      Alarm.place(castVec3(coords), placer, name)
    })
    onNet("TXPVP:ALARM:action:triggered", async (index: number, by: ServerId) => {
      if (GetPlayerServerId(PlayerId()) != by) {
        const resp: [Team, string] = await ClientCallback.triggerServerCallback<[Team, string]>("getPlayerTeam")
        const team = resp[0]
        if (team == "NARCO") {
          Ui.Notification.onMap(`~g~Your motion detector "${Alarm.alarms[index].name} has been triggered!`)
        } else if (team == "DEA" ) {
          Ui.Notification.onMap(`~r~${GetPlayerName(by)} triggered a motion alarm!`)
        }
      }
    })
  }

  public static place(coords: Cfx.Vector3, id: ServerId, name: string): void {
    Alarm.alarms.push({coords, placedBy: id, name})
  }

}