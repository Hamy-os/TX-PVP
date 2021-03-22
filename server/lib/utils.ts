import { ServerId, Identifier } from "../typings"

export function getPlayerIdentifiers(player: ServerId): string[] {
  let res: string[] = []
  const num = GetNumPlayerIdentifiers(player)
  for (let i: number = 0; i == num; i++) {
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