RegisterCommand("loadIsland", function(source, args)
    print("Invoking map")
    Citizen.InvokeNative(0x9A9D1BA639675CF1, "HeistIsland", true)
    Citizen.InvokeNative(0x5E1460624D194A38, true) 
    Citizen.InvokeNative(0xF74B1FFA4A15FBEA, true)
    Citizen.InvokeNative(0x53797676AD34A9AA, false)  
    SetScenarioGroupEnabled('Heist_Island_Peds', true)
    print("Teleporting player")
    SetEntityCoords(PlayerPedId(), vector3(4929.47, -5174.01, 1.5))
end, true)