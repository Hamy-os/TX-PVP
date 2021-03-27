import * as Cfx from 'fivem-js';
import { castVec3 } from "../";
const teleports: {[key: string]: { from: Cfx.Vector3, to: Cfx.Vector3, distance: number, oneWay: boolean }} = {}
export class Teleport {
  private teleport: string
  public constructor(name: string, from: Cfx.Vector3, to: Cfx.Vector3, oneWay = false) {
    teleports[name] = { from, to, distance: 10.0, oneWay: oneWay }
    this.teleport = name
  }

  public set distance(distance: number) {
    teleports[this.teleport].distance = distance
  }

  public get distance(): number {
    const coords = GetEntityCoords(PlayerPedId(), true)
    const from = castVec3(coords).distance(teleports[this.teleport].from)
    const to = castVec3(coords).distance(teleports[this.teleport].to)
    return (from > to) ? (!teleports[this.teleport].oneWay ? to : from) : from 
  }

  public get distanceFromStart(): number {
    const coords = GetEntityCoords(PlayerPedId(), true)
    return castVec3(coords).distance(teleports[this.teleport].from)
  }

  public get distanceFromEnd(): number {
    const coords = GetEntityCoords(PlayerPedId(), true)
    return castVec3(coords).distance(teleports[this.teleport].to)
  }

  public get canTp(): boolean {
    return (this.distance <= teleports[this.teleport].distance)
  }

  public get closestCoords(): Cfx.Vector3 {
    if (this.distanceFromStart > this.distanceFromEnd && teleports[this.teleport].oneWay) {
        return teleports[this.teleport].to
    } else {
      return teleports[this.teleport].from
    }
  }

  public tp(): void {
    if (this.canTp) {
      const coords = this.closestCoords
      DoScreenFadeOut(500)
      SetEntityCoords(PlayerPedId(), coords.x, coords.y, coords.z, false, false, false, false)
      DoScreenFadeIn(500)
    }
  }
}