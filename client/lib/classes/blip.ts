import * as Cfx from 'fivem-js';
import { BlipSprite, BlipColor, BlipId, BlipVisibility, ServerId, Team } from "../../typings";
import { castVec3 } from "../";

export class Blip {
  private readonly blipId: BlipId
  private static blips: { [key: string]: Blip } = {}
  private readonly blipKey: string
  private readonly blipTitle: string
  public static listen(): void {
    onNet("TXPVP:CORE:createBlip", (coords: number[], sprite: BlipSprite, color: BlipColor, id: string, visibility: BlipVisibility, title: string) => {
      new Blip(castVec3(coords), sprite, color, id, visibility, title)
    })
    onNet("TXPVP:CORE:removeBlip", (key: string) => {
      if (Blip.blips[key]) {
        Blip.blips[key].delete()
      }
    })
  }

  public constructor(coords: Cfx.Vector3, sprite: BlipSprite, color: BlipColor, id: string, visibility: BlipVisibility, title: string, blipUtil?: (blipId: BlipId) => void) {
    this.blipId = AddBlipForCoord(coords.x, coords.y, coords.z)
    SetBlipColour(this.blipId, color)
    SetBlipSprite(this.blipId, sprite)
    SetBlipDisplay(this.blipId, visibility)
    BeginTextCommandSetBlipName("STRING")
      AddTextComponentString(title)
    EndTextCommandSetBlipName(this.blipId)
    this.blipTitle = title
    if (blipUtil) blipUtil(this.blipId)
    this.blipKey = id 
    Blip.blips[id] = this
  }
  public hide(): void {
    SetBlipDisplay(this.blipId, 0)
  }
  
  public show(): void {
    SetBlipDisplay(this.blipId, 6)
  }
  public setDisplay(display: BlipVisibility): void {
    SetBlipDisplay(this.blipId, display)
  }

  public delete(): void {
    RemoveBlip(this.blipId)
    this.setDisplay(0)
  }
  public globalDelete(): void {
    emitNet("removeGlobalBlip", this.blipKey)
  }

  public setColor(color: BlipColor): void {
    SetBlipColour(this.blipId, color)
  }

  public setSprite(sprite: BlipSprite): void {
    SetBlipSprite(this.blipId, sprite)
  }

  public override(control: (blipId: BlipId) => void): void {
    control(this.blipId)
  }
  public get id(): BlipId {
    return this.blipId
  }
  public globalize(targets: ServerId[] | Team, title?: string, replace = true): void {
    emitNet("TXPVP:CORE:globalizeBlip", targets, GetBlipCoords(this.blipId), GetBlipSprite(this.blipId), GetBlipColour(this.blipId), this.blipKey, GetBlipInfoIdDisplay(this.blipId), title || this.blipTitle, replace)
  }
}