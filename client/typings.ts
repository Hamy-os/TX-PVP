import * as Cfx from 'fivem-js';
export type LoadoutWeapon = { name: string, ammoCount: number, addons: string[] }
export type Loadout = { DEA: {[key: string]: LoadoutWeapon[] }, NARCO: {[key: string]: LoadoutWeapon[]}, NONE: undefined }
export type Team = "DEA" | "NARCO" | "NONE"
export type BlipSprite = number
export type BlipColor = number
export type BlipId = number
export type BlipVisibility = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type CastedMatrix = { "rightVector": Cfx.Vector3, "forwardVector": Cfx.Vector3, "upVector": Cfx.Vector3, "position": Cfx.Vector3 }
export type MatrixIndexes = "rightVector" | "forwardVector" | "upVector" | "position"
export interface PedComponents  {compId: number, drawableId: number, textureId: number, paletteId: number}