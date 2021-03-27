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