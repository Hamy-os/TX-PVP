import * as Cfx from 'fivem-js';
import { Loadout, Team, WeaponString } from "../typings"
// TODO! add more loadouts
const loadOuts: Loadout = { DEA: {"basic": []} , NARCO: {"basic": []}}

export function giveLoadoutToPlayer(loadout: string, side: Team): void {
  loadOuts[side][loadout].forEach((weapon: WeaponString) => {
    Cfx.Game.PlayerPed.giveWeapon(GetHashKey(weapon), 9999, false, false)
  })
}