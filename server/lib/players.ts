import { Teams, ServerId, Team } from "../typings";
import { getPlayerIdentifier } from "./";
let players: Teams = { DEA: {}, NARCO: {} }

export function addPlayerToTeam(serverId: ServerId, team: Team) {
  players[team][serverId] = {serverId: serverId, name: GetPlayerName(serverId), identifier: getPlayerIdentifier(serverId) as string}
}

export function getTeams(): Teams {
  return players
}