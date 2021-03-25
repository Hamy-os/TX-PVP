import {Vector3} from "fivem-js"
export type LoadoutWeapon = { name: string, ammoCount: number }
export type Loadout = { DEA: {[key: string]: LoadoutWeapon[] }, NARCO: {[key: string]: LoadoutWeapon[]} }
export type Team = "DEA" | "NARCO"
export type BlipSprite = number
export type BlipColor = number
export type BlipId = number
export type BlipVisibility = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
