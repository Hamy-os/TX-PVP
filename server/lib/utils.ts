import { Vector3 } from "fivem-js"
import { ServerId, Identifier } from "../typings"


export function getPlayerIdentifier(player: ServerId): Identifier | boolean {
  getPlayerIdentifiers(player).forEach((id: string) => {
    if (id.includes("license:")) {
      return id
    }
  })
  return false
}

export function castVec3(arr: number[]): Vector3 {
    return new Vector3(arr[0], arr[1], arr[2])
}