import { setUpEvents, ServerCallback, addPlayerToTeam } from "./lib";
import {Team} from "./typings"
async function main() {
  setUpEvents()
  ServerCallback.listen()
  console.log("Running")
  RegisterCommand("addPlayerToTeam", (source: string, args: string[]) => {
    const src = source
    console.log("Adding player to team", src, args[0])
    addPlayerToTeam(src, args[0] as Team)
  }, true)
}

main()