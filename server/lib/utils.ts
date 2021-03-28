import { Vector3 } from "fivem-js"
import { ServerId, Identifier, PedComponents, RawOutfitDict, PedProps } from "../typings"


export function getPlayerIdentifier(player: ServerId): Identifier | boolean {
  getPlayerIdentifiers(player).forEach((id: string) => {
    if (id.includes("license:")) {
      return id
    }
  })
  return false
}

export function castVec3(arr: number[]): Vector3 {
    return new Vector3(arr[0], arr[1], arr[2])
}

export function castPedPedComponent(body: RawOutfitDict, ped: number): [PedComponents[], PedProps[]] {
  const result: PedComponents[] = []
  const result2: PedProps[] = []
  body.components[0].forEach((id: number, idx: number) => {
      const thisComp: PedComponents = {
          comps: {
              compId: idx,
              drawableId: id,
              textureId: body.components[1][idx],
              paletteId: 2
          }
      }
      result.push(thisComp)
  })
  for (let i = 0; i <= 2; i++) {
      const thisProp = {
          props: {
              compId: i,
              drawableId: body.props[0][i],
              textureId: body.props[1][i],
          }
      }
      result2.push(thisProp)
  }
  return [result, result2]
}