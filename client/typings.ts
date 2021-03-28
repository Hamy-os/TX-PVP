import * as Cfx from 'fivem-js';
export type LoadoutWeapon = { name: string, ammoCount: number, addons: string[] }
export type Loadout = { DEA: { [key: string]: { outfit: OutfitKey, items: LoadoutWeapon[] } }, NARCO: { [key: string]: { outfit: OutfitKey, items: LoadoutWeapon[] } }, NONE: undefined }
export type Team = "DEA" | "NARCO" | "NONE"
export type BlipSprite = number
export type BlipColor = number
export type BlipId = number
export type ServerId = number
export type BlipVisibility = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type CastedMatrix = { "rightVector": Cfx.Vector3, "forwardVector": Cfx.Vector3, "upVector": Cfx.Vector3, "position": Cfx.Vector3 }
export type MatrixIndexes = "rightVector" | "forwardVector" | "upVector" | "position"
export interface PedComponents { comps: { compId: number, drawableId: number, textureId: number, paletteId: number } }
export interface PedProps { props: {compId: number, drawableId: number, textureId: number} }

export type OutfitKey = "military_1" | "military_2" | "military_3" | "military_4" | 
                        "narco_1" | "narco_2" | "narco_3" | "narco_4" 
export interface RawOutfitDict  {
  components: [
    number[],
    number[]
],
    model: number,
    props: [
      number[],
      number[]
]
}

export interface AlarmRegistry {
  coords: Cfx.Vector3,
  placedBy: ServerId,
  name: string
}