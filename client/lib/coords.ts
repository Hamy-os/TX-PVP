import { Vector3 } from "fivem-js"
const spwn = new Map<string, Vector3>()
import { castVec3 } from "./";
import { getCams } from "./json";
import { Blip } from "./classes/blip";

spwn.set("airfield", new Vector3(4504.017578125, -4534.1342773438, 4.1950516700745))
spwn.set("lobbyspawn", new Vector3(121.1, -728.64, 242.15))
spwn.set("smallport", new Vector3(4984.4990234375, -5163.41015625, 2.5144073963165))
spwn.set("mansion", new Vector3(4977.6723632812, -5598.3408203125, 23.836664199829))
spwn.set("bigport", new Vector3(5062.8637695312, -4622.4125976562, 2.6441102027893))
spwn.set("warehouses", new Vector3(5158.2358398438, -5224.2934570312, 7.1033706665039))
spwn.set("partyplace", new Vector3(4900.06640625, -4917.12109375, 3.3773925304413))
spwn.set("northyankton", new Vector3(3217.697, 	-4834.826, 111.8152))
spwn.set("dinghytest", new Vector3(5103.961, -5115.153, 0.3953705))
const cams: { coords: Vector3, rot: number, name: string }[] = [
  { coords: new Vector3(4515.3837890625, -4529.1918945312, 7.1206555366516), rot: 19.186916351318, name: "airfield" },
  { coords: new Vector3(5267.435546875, -5425.7543945312, 161.04574584961), rot: -20.520044326782, name: "Relay twr" },
  { coords: new Vector3(5107.8071289062, -4585.2094726562, 27.717777252197), rot: 189.19686889648, name: "Port 1" },
  { coords: new Vector3(5041.2368164062, -5117.5063476562, 24.944631576538), rot: 101.55718994141, name: "Port 2" },
  { coords: new Vector3(5044.705078125, -5117.5092773438, 24.944631576538), rot: 244.88293457031, name: "Port 3" },
  { coords: new Vector3(4906.5478515625, -5339.4541015625, 34.656505584717), rot: 297.78015136719, name: "Port 4" },
  { coords: new Vector3(4890.3959960938, -5459.7709960938, 50.523777008057), rot: 196.44522094727, name: "Guard tower 1" },
  { coords: new Vector3(5125.2451171875, -5526.1733398438, 74.970390319824), rot: 27.528238296509, name: "Guard tower 2" },
  { coords: new Vector3(4798.5727539062, -4982.64453125, 29.923362731934), rot: 304.20947265625, name: "Disco 1" },
  { coords: new Vector3(4961.2080078125, -4864.5620117188, 16.871782302856), rot: 13.495363235474, name: "Disco 2" },
  { coords: new Vector3(4963.6728515625, -4849.642578125, 15.33660697937), rot: 56.803382873535, name: "Diso entrance" },
  { coords: new Vector3(4877.8911132812, -4488.59765625, 30.933826446533), rot: 195.95265197754, name: "Guard tower 3" },
  { coords: new Vector3(3929.7756347656, -4700.3896484375, 12.2133569717407), rot: 290.37097167969, name: "Airstrip" },
  { coords: new Vector3(4446.5771484375, -4479.0029296875, 13.3120899200439), rot: 203.36303710938, name: "Airstrip 2" },
  { coords: new Vector3(5360.1831054688, -5437.337890625, 70.17650604248), rot: 354.60382080078, name: "Farm 1" },
  {coords: new Vector3(5616.890625, -5654.0825195312, 41.209560394287), rot: 153.29570007324, name: "Lighthouse"}
]


getCams().forEach((v: {orientation: number[], position: number[], name: string}, index: number) => {
  const res = { coords: castVec3(v.position), rot: v.orientation[3], name: v.name || "Camera " + index}
  cams.push(res)
  })

export const spawnLocations = spwn
export const cameraLocations = cams

// CAMERA HACKER COORDS vector4(5266.0629882812, -5427.4956054688, 141.04861450195, 323.33377075195)