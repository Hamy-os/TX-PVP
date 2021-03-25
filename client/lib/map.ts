import * as Cfx from 'fivem-js';

export function loadIslandEventInit() {
  onNet("TXPVP:CORE:loadIsland", (coords: Cfx.Vector3) => {
    console.log("Received event")
    Citizen.invokeNative('0x9A9D1BA639675CF1', "HeistIsland", true)
    Citizen.invokeNative('0x5E1460624D194A38', true)
    Citizen.invokeNative('0xF74B1FFA4A15FBEA', true)
    Citizen.invokeNative('0x53797676AD34A9AA', false)
    SetScenarioGroupEnabled('Heist_Island_Peds', true)
    Cfx.Game.PlayerPed.Position = coords
  })
  
} 
