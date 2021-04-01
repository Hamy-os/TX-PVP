import { Teams, ServerId, Team, OutfitKey, PedComponents, PedProps } from "../typings";
import { getPlayerIdentifier, Member, castVec3, ServerCallback, castPedPedComponent } from "./";
import {outfits} from "../../client/lib/outfits"
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

  addPlayerToTeam("1", "DEA")
  onNet("TXPVP:CORE:ClonePlayer", (coords: number[], model: OutfitKey) => {
    const src = source
    console.log("Source", src)
    console.log("Source", src, "TEAM", idMapped[src])
    const ped = players[idMapped[src]][src].createClone(castVec3(coords))
    const components = castPedPedComponent(outfits[model], ped)
    components[0].forEach((component: PedComponents) => {
      SetPedComponentVariation(ped, component.comps.compId, component.comps.drawableId, component.comps.textureId, component.comps.paletteId)
    })
    components[1].forEach((component: PedProps) => {
      SetPedPropIndex(ped, component.props.compId, component.props.drawableId, component.props.textureId, true)
    })
  })
  
  onNet("TXPVP:CORE:DeleteClone", () => {
    const src = source
    players[idMapped[src]][src].deleteClone()
  })

  ServerCallback.registerCallback<string[]>("getPlayerTeam", (src: string) => {
        return [(idMapped[src] || "NONE"), GetPlayerName(src)]
  })
} 
