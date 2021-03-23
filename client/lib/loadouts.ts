import * as Cfx from 'fivem-js';
import { Loadout, Team, WeaponString } from "../typings"
const loadOuts: Loadout = { DEA: {"basic": ["WEAPON_CARBINERIFLE", "WEAPON_SNIPERRIFLE", "WEAPON_PUMPSHOTGUN", "WEAPON_COMBATPISTOL"]} , NARCO: {"basic": ["WEAPON_ASSAULTRIFLE", "WEAPON_PUMPSHOTGUN", "WEAPON_PISTOL"]}}

export function giveLoadoutToPlayer(loadout: string, side: Team): void {
  RemoveAllPedWeapons(PlayerPedId(), false)
  loadOuts[side][loadout].forEach((weapon: WeaponString) => {
    Cfx.Game.PlayerPed.giveWeapon(GetHashKey(weapon), 9999, false, false)
  })
}


onNet("TXPVP:CORE:setLoadout", (loadout: string, team: Team) => {
  giveLoadoutToPlayer(loadout, team)
})