async function main() {
  console.log("Running")
  console.log("Sending event")
  emitNet("TXPVP:CORE:loadIsland", -1)
}

main()