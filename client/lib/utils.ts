import { spawnLocations } from "./";
import { CastedMatrix, MatrixIndexes, PedComponents, RawOutfitDict } from "./../typings";
import * as Cfx from 'fivem-js';


export function getRandomLocationOnIsland(): Cfx.Vector3 {
    const items = Array.from<Cfx.Vector3>(spawnLocations as unknown as Iterable<Cfx.Vector3>); // smh scuffed shit
    return items[Math.floor(Math.random() * items.length)];
}



export function castVec3(arr: number[]): Cfx.Vector3 {
    return new Cfx.Vector3(arr[0], arr[1], arr[2])
}

export function casMatrix(arr: [number[], number[], number[], number[]]): CastedMatrix {
    const keyedObject: CastedMatrix = {
        rightVector: new Cfx.Vector3(0.00, 0.00, 0.0),
        forwardVector: new Cfx.Vector3(0.00, 0.00, 0.0),
        upVector: new Cfx.Vector3(0.00, 0.00, 0.0),
        position: new Cfx.Vector3(0.00, 0.00, 0.0)
    } //smh
        const keys: MatrixIndexes[] = ["rightVector", "forwardVector", "upVector", "position"]
        arr.forEach((primitive: number[], index: number) => {
            const res = castVec3(primitive)
            keyedObject[keys[index]] = res
        }) 
         return keyedObject as CastedMatrix
}

export function castPedPedComponent(body: RawOutfitDict): PedComponents[] {
    const ped = PlayerPedId()
    const result: PedComponents[] = []
    body.components[0].forEach((id: number, idx: number) => {
        let thisComp: PedComponents
        thisComp.compId = idx
        thisComp.drawableId = id
        thisComp.textureId = body.components[1][idx]
        thisComp.paletteId = GetPedPaletteVariation(ped, idx)
        result.push(thisComp)
    })
    return result
}