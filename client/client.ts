async function loadIsland() {
  // load map
  Citizen.invokeNative("0x9A9D1BA639675CF1", "HeistIsland", true)
    Citizen.invokeNative("0x5E1460624D194A38", true) 
    Citizen.invokeNative("0xF74B1FFA4A15FBEA", true) 
}

async function main() {
  loadIsland()
  console.log("Running")
}
RegisterCommand("loadMap", (source: string, args: string[]) => {
  loadIsland()
}, true)

onNet("TXPVP:CORE:loadIsland", () => {
  console.log("Loading island")
  loadIsland()
})
main()

