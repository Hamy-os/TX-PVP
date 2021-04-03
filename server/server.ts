import { setUpEvents, ServerCallback, addPlayerToTeam, Manager } from "./lib";
import {Team} from "./typings"
async function main() {
  setUpEvents()
  ServerCallback.listen()
  Manager.listen()
  console.log("Running")

  //Join a team usage: /jointeam Name
  RegisterCommand("jointeam", (source: string, args: string[]) => {
    const src = source
    console.log("Adding player to team", src, args[0])
    addPlayerToTeam(src, args[0] as Team)
  }, false)
}

main()