import * as Cfx from 'fivem-js';
import { Loadout, Team, WeaponString } from "../typings"
const loadOuts: Loadout = {
  DEA: { "basic": ["weapon_militaryrifle", "weapon_marksmanrifle", "weapon_pumpshotgun_mk2", "WEAPON_COMBATPISTOL", "weapon_combatpdw"] },
  NARCO: { "basic": ["WEAPON_ASSAULTRIFLE", "WEAPON_PUMPSHOTGUN", "weapon_pistol_mk2", "weapon_smg_mk2"] }
}

export function giveLoadoutToPlayer(loadout: string, side: Team): void {
  RemoveAllPedWeapons(PlayerPedId(), false)
  loadOuts[side][loadout].forEach((weapon: WeaponString) => {
    Cfx.Game.PlayerPed.giveWeapon(GetHashKey(weapon), 9999, false, false)
  })
}


onNet("TXPVP:CORE:setLoadout", (loadout: string, team: Team) => {
  giveLoadoutToPlayer(loadout, team)
})