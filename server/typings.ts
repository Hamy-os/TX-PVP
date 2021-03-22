export type ServerId = string
export type Identifier = string
export type Player = { serverId: ServerId | number, name: string, identifier: Identifier }
export type Team = "DEA" | "NARCO"
export interface Teams {
  DEA: { [key: string]: Player },
  NARCO: { [key: string]: Player }
}