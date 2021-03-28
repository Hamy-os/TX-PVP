import * as Cfx from 'fivem-js';
import { Loadout, Team, LoadoutWeapon, PedComponents, OutfitKey, PedProps } from '../typings'
import { outfits } from "./outfits";
import { castPedPedComponent } from "./";
export class Loadouts {
  private static loadout: { team: string, loadout: string }
  private static outfit: string
  public static loadOuts: Loadout = {
    DEA: {
      "basic": {
        outfit: "military_2", items: [{ name: "weapon_militaryrifle", ammoCount: 9999, addons: [] },
        { name: "weapon_marksmanrifle", ammoCount: 9999, addons: [] }, { name: "weapon_pumpshotgun_mk2", ammoCount: 9999, addons: [] }, { name: "WEAPON_COMBATPISTOL", ammoCount: 9999, addons: [] },
        { name: "weapon_combatpdw", ammoCount: 9999, addons: [] }, { name: "weapon_flashlight", ammoCount: 9999, addons: [] }, { name: "weapon_knife", ammoCount: 9999, addons: [] }]
      },
      "sniper": { outfit: "military_4", items: [{ name: "weapon_heavysniper_mk2", ammoCount: 9999, addons: ["COMPONENT_AT_SCOPE_NV", "COMPONENT_AT_SR_SUPP_03", "COMPONENT_AT_SR_BARREL_02", "COMPONENT_HEAVYSNIPER_MK2_CAMO_03"] },
      { name: "weapon_pistol_mk2", ammoCount: 9999, addons: ["COMPONENT_PISTOL_MK2_CLIP_02", "COMPONENT_AT_PI_SUPP_02", "COMPONENT_PISTOL_MK2_CAMO_03", "COMPONENT_AT_PI_FLSH_02"] },
      { name: "weapon_knife", ammoCount: 9999, addons: [] }]}
    },
  
    NARCO: {
      "basic": {outfit: "narco_1", items: [{ name: "weapon_bullpuprifle_mk2", ammoCount: 9999, addons: [] }, { name: "weapon_combatshotgun", ammoCount: 9999, addons: [] },
        { name: "weapon_pistol_mk2", ammoCount: 9999, addons: [] }, { name: "weapon_smg_mk2", ammoCount: 9999, addons: [] }, { name: "weapon_compactlauncher", ammoCount: 3, addons: [] },
        { name: "weapon_flashlight", ammoCount: 9999, addons: [] }, { name: "weapon_knife", ammoCount: 9999, addons: [] }, { name: "weapon_molotov", ammoCount: 3, addons: [] }]}
    },
    NONE: undefined
  }
  public static get details(): { team: string, loadout: string } {
    return Loadouts.loadout
  }
  public static get model(): string {
    return Loadouts.outfit
  }

  public static listen() {
    onNet("TXPVP:CORE:setLoadout", (loadout: string, team: Team) => {
      Loadouts.giveLoadoutToPlayer(loadout, team)
    })
  }
  public static giveLoadoutToPlayer(loadout: string, side: Team): void {
    const ped: number = PlayerPedId()
    RemoveAllPedWeapons(ped, false)
    Loadouts.loadout = { team: side, loadout }
    Loadouts.setPlayerModel(Loadouts.loadOuts[side][loadout].outfit)
    Loadouts.loadOuts[side][loadout].items.forEach((weapon: LoadoutWeapon) => {
      const weapoHash = GetHashKey(weapon.name)
      Cfx.Game.PlayerPed.giveWeapon(weapoHash, weapon.ammoCount, false, false)
      weapon.addons.forEach((addon: string) => {
        GiveWeaponComponentToPed(ped, weapoHash, GetHashKey(addon))
      })
    })
    Cfx.Game.PlayerPed.giveWeapon(Cfx.WeaponHash.Parachute, 9999, false, false) // TODO! needs testing
  }
  public static setPlayerModel(outfit: OutfitKey): void {
    Loadouts.outfit = outfit
    const components = castPedPedComponent(outfits[outfit])
    const ped = PlayerPedId()
    ClearAllPedProps(ped)
    components[0].forEach((component: PedComponents) => {
      SetPedComponentVariation(ped, component.comps.compId, component.comps.drawableId, component.comps.textureId, component.comps.paletteId)
    })
    components[1].forEach((component: PedProps) => {
      SetPedPropIndex(ped, component.props.compId, component.props.drawableId, component.props.textureId, true)
    })
    const color = GetNumHairColors();
    SetPedHairColor(ped, color, color)
  }
}







