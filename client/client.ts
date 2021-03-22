RegisterCommand("warpIsland", async (source: string, args: string[]) => {
  emit("TXPVP:CORE:loadIsland")
}, true)