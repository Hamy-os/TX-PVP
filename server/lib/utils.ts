import { Vector3 } from "fivem-js"
import { ServerId, Identifier } from "../typings"

export function getPlayerIdentifiers(player: ServerId): string[] {
  const res: string[] = []
  const num = GetNumPlayerIdentifiers(player)
  for (let i = 0; i == num; i++) {
  res.push(GetPlayerIdentifier(player, i))
  }
  return res
}
export function getPlayerIdentifier(player: ServerId): Identifier | boolean {
  getPlayerIdentifiers(player).forEach((id: string) => {
    if (id.includes("license:")) {
      return id
    }
  })
  return false
}

export function wrapIntoVec3(arr: number[]): Vector3 {
  return new Vector3(arr[0], arr[1], arr[2])
}