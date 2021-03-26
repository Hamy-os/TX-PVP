import * as Cfx from 'fivem-js';
import { Loadout, Team, LoadoutWeapon } from "../typings"
const loadOuts: Loadout = {
  DEA: { "basic": [{ name: "weapon_militaryrifle", ammoCount: 9999 }, { name: "weapon_marksmanrifle", ammoCount: 9999 }, { name: "weapon_pumpshotgun_mk2", ammoCount: 9999 }, { name: "WEAPON_COMBATPISTOL", ammoCount: 9999 }, { name: "weapon_combatpdw", ammoCount: 9999}, {name: "weapon_flashlight", ammoCount: 9999}, {name: "weapon_knife", ammoCount: 9999}] },
  NARCO: { "basic": [{name: "weapon_bullpuprifle_mk2", ammoCount: 9999}, {name: "weapon_combatshotgun", ammoCount: 9999}, {name: "weapon_pistol_mk2", ammoCount: 9999}, {name: "weapon_smg_mk2", ammoCount: 9999}, {name: "weapon_compactlauncher", ammoCount: 9999}, {name: "weapon_flashlight", ammoCount: 9999}, {name: "weapon_knife", ammoCount: 9999}, {name: "weapon_molotov", ammoCount: 9999}]  }
}

export function giveLoadoutToPlayer(loadout: string, side: Team): void {
  RemoveAllPedWeapons(PlayerPedId(), false)
  loadOuts[side][loadout].forEach((weapon: LoadoutWeapon) => {
    Cfx.Game.PlayerPed.giveWeapon(GetHashKey(weapon.name), weapon.ammoCount, false, false)
    Cfx.Game.PlayerPed.giveWeapon(Cfx.WeaponHash.Parachute, 9999, false, false) // TODO! needs testing
  })
}


onNet("TXPVP:CORE:setLoadout", (loadout: string, team: Team) => {
  giveLoadoutToPlayer(loadout, team)
})
