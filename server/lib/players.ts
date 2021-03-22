import { Teams, ServerId, Team } from "../typings";
import { getPlayerIdentifier } from "./";
let players: Teams = { DEA: {}, NARCO: {} }

export function addPlayerToTeam(serverId: ServerId, team: Team) {
  players[team][serverId] = {serverId: serverId, name: GetPlayerName(serverId), identifier: getPlayerIdentifier(serverId) as string}
}

export function getTeams(): Teams {
  return players
}

export function getPlayerTeam(serverId: ServerId): Team {
  for (const [k, v] of Object.entries(players)) {
  if (v[serverId]) {return k as Team}
  }
}