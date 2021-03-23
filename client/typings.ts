export type WeaponString = string
export type Loadout = { DEA: {[key: string]: WeaponString[] }, NARCO: {[key: string]: WeaponString[]} }
export type Team = "DEA" | "NARCO"

export interface Map<T> {
  [key: string]: T
}