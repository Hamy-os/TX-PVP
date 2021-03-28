import { Member } from "./lib";
export type ServerId = string
export type Identifier = string
export type QueryString = string
export type Player = { serverId: ServerId, name: string, identifier: Identifier, team: Team }
export type Team = "DEA" | "NARCO" | "NONE"
export interface Teams {
  DEA: { [key: string]: Member },
  NARCO: { [key: string]: Member },
  NONE: { [key: string]: Member}
}

export interface QueryArgs {
  [key: string]: string | number | Date | boolean
}

export interface PedComponents { comps: { compId: number, drawableId: number, textureId: number, paletteId: number } }
export interface PedProps { props: {compId: number, drawableId: number, textureId: number} }

export type OutfitKey = "riot" | "rush" | "ninja" | "explosion" | "sniper" | 
                        "narco_1" | "narco_2" | "narco_3" | "narco_4" | "narco_5"
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