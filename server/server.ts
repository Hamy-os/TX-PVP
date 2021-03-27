import { setUpEvents, ServerCallback } from "./lib";
async function main() {
  setUpEvents()
  ServerCallback.listen()
  console.log("Running")
}

main()