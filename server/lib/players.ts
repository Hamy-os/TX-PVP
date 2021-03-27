import { Teams, ServerId, Team } from "../typings";
import { getPlayerIdentifier, Member, castVec3, ServerCallback } from "./";
const players: Teams = { DEA: {}, NARCO: {}, NONE: {} }
const idMapped: { [key: string]: Team } = {}

export function addPlayerToTeam(serverId: ServerId, team: Team) {
  players[team][serverId] = new Member(serverId, team)
  idMapped[serverId] = team
}

export function getTeams(): Teams {
  return players
}

export function getPlayerTeam(serverId: ServerId): Team {
  for (const [k, v] of Object.entries(players)) {
      if (v[serverId]) {return k as Team}
  }
}
export function setUpEvents() {

  onNet("playerConnecting", () => {
    // DEBUG:
    console.log("ADding player to DEA for testing")
    const src = source
    addPlayerToTeam(src, "DEA")
  })
  addPlayerToTeam("1", "DEA")
  onNet("TXPVP:CORE:ClonePlayer", (coords: number[]) => {
    const src = source
    console.log("Source", src)
    console.log("Source", src, "TEAM", idMapped[src])
    players[idMapped[src]][src].createClone(castVec3(coords))
  })
  
  onNet("TXPVP:CORE:DeleteClone", () => {
    const src = source
    players[idMapped[src]][src].deleteClone()
  })

  ServerCallback.registerCallback<Team>("getPlayerTeam", (src: string) => {
        return idMapped[src] || "NONE"
  })
} 
