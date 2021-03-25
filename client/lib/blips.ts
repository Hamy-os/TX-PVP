import * as Cfx from 'fivem-js';
import { BlipSprite, BlipColor, BlipId, BlipVisibility } from "../typings";


export class Blip {
  private blipId: BlipId
  public constructor(coords: Cfx.Vector3, sprite: BlipSprite, color: BlipColor, visibility: BlipVisibility, blipUtil?: (blipId: BlipId) => void) {
    this.blipId = AddBlipForCoord(coords.x, coords.y, coords.z)
    SetBlipColour(this.blipId, color)
    SetBlipSprite(this.blipId, sprite)
    SetBlipDisplay(this.blipId, visibility)
    blipUtil(this.blipId)
  }
  public hide(): void {
    SetBlipDisplay(this.blipId, 0)
  }
  public show(): void {
    SetBlipDisplay(this.blipId, 6)
  }
  public override(control: (blipId: BlipId) => void): void {
    control(this.blipId)
  }
}