import * as Cfx from 'fivem-js';
import { Loadout, Team, LoadoutWeapon, PedComponents, OutfitKey, PedProps } from '../typings'
import { outfits } from "./outfits";
import { castPedPedComponent, ClientCallback } from "./";
export class Loadouts {
  private static loadout: { team: string, loadout: string }
  private static outfit: string
  public static loadOuts: Loadout = {
    DEA: {
      "heavy": {
        outfit: "military_4", items: [{ name: "weapon_combatpistol", ammoCount: 100, addons: [] }, { name: "weapon_minigun", ammoCount: 600, addons: [] }, { name: "weapon_knife", ammoCount: 1, addons: [] }, { name: "WEAPON_GRENADELAUNCHER_SMOKE", ammoCount: 4, addons: [] }]
      },
      "smg": {
        outfit: "military_2", items: [{ name: "weapon_pistol50", ammoCount: 100, addons: [] }, {name: "weapon_pumpshotgun_mk2", ammoCount: 100, addons: ["COMPONENT_AT_SIGHTS", "COMPONENT_AT_MUZZLE_08"]},
        { name: "weapon_assaultsmg", ammoCount: 200, addons: ["COMPONENT_AT_SCOPE_MACRO"] }, { name: "WEAPON_GRENADELAUNCHER_SMOKE", ammoCount: 6, addons: [] }, { name: "weapon_flashlight", ammoCount: 1, addons: [] }, { name: "weapon_knife", ammoCount: 1, addons: [] }]
      },
      "ninja": {
        outfit: "military_3", items: [{ name: "weapon_militaryrifle", ammoCount: 200, addons: ["COMPONENT_AT_AR_SUPP", "COMPONENT_AT_SCOPE_SMALL"] },
        { name: "weapon_proxmine", ammoCount: 20, addons: [] }, { name: "weapon_knife", ammoCount: 1, addons: [] }, { name: "WEAPON_COMBATPISTOL", ammoCount: 250, addons: ["COMPONENT_AT_PI_SUPP"] }]
      },
      "rpg": {
        outfit: "military_1", items: [{ name: "weapon_rpg", ammoCount: 20, addons: [] },
        { name: "weapon_pipebomb", ammoCount: 10, addons: [] }, { name: "WEAPON_COMBATPISTOL", ammoCount: 100, addons: [] }, { name: "weapon_knife", ammoCount: 1, addons: [] }]
      },
      "sniper": { outfit: "military_5", items: [{ name: "weapon_heavysniper_mk2", ammoCount: 100, addons: ["COMPONENT_AT_SCOPE_NV", "COMPONENT_AT_SR_SUPP_03", "COMPONENT_AT_SR_BARREL_02", "COMPONENT_HEAVYSNIPER_MK2_CAMO_03"] },
      { name: "weapon_pistol_mk2", ammoCount: 100, addons: ["COMPONENT_PISTOL_MK2_CLIP_02", "COMPONENT_AT_PI_SUPP_02", "COMPONENT_PISTOL_MK2_CAMO_03", "COMPONENT_AT_PI_FLSH_02"] },
      { name: "weapon_knife", ammoCount: 1, addons: [] }]}
    },
  
    NARCO: {
      "assault": {outfit: "narco_1", items: [{ name: "weapon_assaultrifle", ammoCount: 200, addons: ["COMPONENT_AT_SCOPE_MACRO"] }, { name: "weapon_combatshotgun", ammoCount: 100, addons: [] },
        { name: "weapon_pistol_mk2", ammoCount: 100, addons: [] }, 
        { name: "weapon_flashlight", ammoCount: 1, addons: [] }, { name: "weapon_knife", ammoCount: 1, addons: [] }, { name: "weapon_molotov", ammoCount: 3, addons: [] }]
      },
      "military": {
        outfit: "narco_3", items: [{ name: "weapon_pistol50", ammoCount: 100, addons: [] } ,
        { name: "weapon_assaultsmg", ammoCount: 200, addons: ["COMPONENT_AT_SCOPE_MACRO"] }, { name: "weapon_smokegrenade", ammoCount: 6, addons: [] }, { name: "weapon_flashlight", ammoCount: 1, addons: [] }, { name: "weapon_knife", ammoCount: 1, addons: [] }]
        },
      "ninja": {
    outfit: "narco_5", items: [{ name: "weapon_carbinerifle_mk2", ammoCount: 200, addons: ["COMPONENT_AT_SIGHTS", "COMPONENT_AT_AR_SUPP", "COMPONENT_CARBINERIFLE_MK2_CAMO_04"] },
    { name: "weapon_stickybomb", ammoCount: 10, addons: [] }, { name: "weapon_knife", ammoCount: 1, addons: [] }, { name: "WEAPON_COMBATPISTOL", ammoCount: 250, addons: ["COMPONENT_AT_PI_SUPP"] }]
          },
      "explosive": {
        outfit: "narco_4", items: [{ name: "weapon_rpg", ammoCount: 10, addons: [] },
        { name: "weapon_pipebomb", ammoCount: 10, addons: [] }, { name: "WEAPON_COMBATPISTOL", ammoCount: 100, addons: [] }, { name: "weapon_knife", ammoCount: 1, addons: [] }]
        },
      "sniper": { outfit: "narco_2", items: [{ name: "weapon_heavysniper", ammoCount: 100, addons: ["COMPONENT_AT_SCOPE_MAX"] },
  { name: "weapon_pistol_mk2", ammoCount: 120, addons: ["COMPONENT_PISTOL_MK2_CLIP_02", "COMPONENT_AT_PI_SUPP_02", "COMPONENT_PISTOL_MK2_CAMO_03", "COMPONENT_AT_PI_FLSH_02"] },
  { name: "weapon_knife", ammoCount: 1, addons: [] }]
      },
    },
    NONE: undefined
  }
  public static get details(): { team: string, loadout: string } {
    return Loadouts.loadout
  }
  public static get model(): string {
    return Loadouts.outfit
  }

  public static listen(): void {
    onNet("TXPVP:CORE:setLoadout", (loadout: string, team: Team) => {
      Loadouts.giveLoadoutToPlayer(loadout, team)
    })
  }

  public static async giveLoadoutToPlayer(loadout: string, side: Team): Promise<void> {
    const result = await ClientCallback.triggerServerCallback<[Team, string]>("getPlayerTeam")
    if (side == result[0]) {
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
      Cfx.Game.PlayerPed.giveWeapon(Cfx.WeaponHash.Parachute, 9999, false, false)
    } else {
      console.log("Denined, this team cant assign this loadout")
    }
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







