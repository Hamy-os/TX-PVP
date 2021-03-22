function getRandomLocationOnIsland()
for k,v in pairs(spawnLocations) do
   local res = math.random(0, 100)
   if (res % 2 == 0) then return v end 
end
end

RegisterCommand("tp", function(source, args)
SetEntityCoords(PlayerPedId(), spawnLocations[args[1]] or spawnLocations["airField"])
print("Teleported to "..args[1])

end, true)