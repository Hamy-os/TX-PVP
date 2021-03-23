import * as Cfx from 'fivem-js';
async function loadout(params:string) {
    RegisterCommand('ar', false, false) => {
      GiveWeaponToPed(PlayerPedId(), "WEAPON_ASSAULTRIFLE", 1, false, false)
    }
    RegisterCommand('shotgun', false, false) => {
      GiveWeaponToPed(PlayerPedId(), "WEAPON_PUMPSHOTGUN", 1, false, false)
    }
    RegisterCommand('sniper', false, false) => {
      GiveWeaponToPed(PlayerPedId(), "WEAPON_SNIPERRIFLE", 1, false, false)
    }
    RegisterCommand('pistol', false, false) => {
      GiveWeaponToPed(PlayerPedId(), "WEAPON_PISTOL", 1, false, false)
    }
    RegisterCommand('criminal', false, false) => {
      GiveWeaponToPed(PlayerPedId(), "WEAPON_PISTOL", 1, false, false)
      GiveWeaponToPed(PlayerPedId(), "WEAPON_PUMPSHOTGUN", 1, false, false)
      GiveWeaponToPed(PlayerPedId(), "_WEAPON_ASSAULTRIFLE", 1, false, false)
    }
    RegisterCommand('swat', false, false) => {
      GiveWeaponToPed(PlayerPedId(), "WEAPON_COMBATPISTOL", 1, false, false)
      GiveWeaponToPed(PlayerPedId(), "WEAPON_PUMPSHOTGUN", 1, false, false)
      GiveWeaponToPed(PlayerPedId(), "WEAPON_SNIPERRIFLE", 1, false, false)
      GiveWeaponToPed(PlayerPedId(), "WEAPON_CARBINERIFLE", 1, false, false)
    } 
  }
  