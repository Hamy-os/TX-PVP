import { Vector3 } from "fivem-js"
const spwn = new Map<string, Vector3>()


spwn.set("airField", new Vector3(4504.017578125, -4534.1342773438, 4.1950516700745))
spwn.set("lobbySpawn", new Vector3(121.1, -728.64, 242.15))
spwn.set("smallPort", new Vector3(4984.4990234375, -5163.41015625, 2.5144073963165))
spwn.set("mansion", new Vector3(4977.6723632812, -5598.3408203125, 23.836664199829))
spwn.set("bigPort", new Vector3(5062.8637695312, -4622.4125976562, 2.6441102027893))
spwn.set("wareHouses", new Vector3(5158.2358398438, -5224.2934570312, 7.1033706665039))
spwn.set("partyPlace", new Vector3(4900.06640625, -4917.12109375, 3.3773925304413))
spwn.set("northYankton", new Vector3(3217.697, 	-4834.826, 111.8152))
spwn.set("dinghyTest", new Vector3(5103.961, -5115.153, 0.3953705))
const cams: { coords: Vector3, rot: number, name: string }[] = [{ coords: new Vector3(4515.3837890625, -4529.1918945312, 7.1206555366516), rot: 19.186916351318, name: "Air field" },
  { coords: new Vector3(5522.0302734375, -5279.3881835938, 11.896118164062), rot: 10.0, name: "Random road" },
  { coords: new Vector3(5267.435546875, -5425.7543945312, 161.04574584961), rot: -20.520044326782, name: "Relay twr" }]

export const spawnLocations = spwn
export const cameraLocations = cams

// CAMERA HACKER COORDS vector4(5266.0629882812, -5427.4956054688, 141.04861450195, 323.33377075195)