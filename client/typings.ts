export type WeaponString = string
export type Loadout = { DEA: {[key: string]: WeaponString[] }, NARCO: {[key: string]: WeaponString[]} }
export type Team = "DEA" | "NARCO"
export type BlipSprite = number
export type BlipColor = number
export type BlipId = number
export type BlipVisibility = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10