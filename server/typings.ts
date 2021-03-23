import { Member } from "./lib";
export type ServerId = string
export type Identifier = string
export type Player = { serverId: ServerId, name: string, identifier: Identifier, team: Team }
export type Team = "DEA" | "NARCO"
export interface Teams {
  DEA: { [key: string]: Member },
  NARCO: { [key: string]: Member }
}