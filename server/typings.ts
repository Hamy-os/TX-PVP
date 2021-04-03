import { Member } from "./lib";
export type ServerId = string
export type Identifier = string
export type QueryString = string
export type Player = { serverId: ServerId, name: string, identifier: Identifier, team: Team }
export type Team = "DEA" | "NARCO" | "NONE"
export interface Teams {
  DEA: { [key: string]: Member },
  NARCO: { [key: string]: Member },
  NONE: { [key: string]: Member}
}

export interface QueryArgs {
  [key: string]: string | number | Date | boolean
}

export interface PedComponents { comps: { compId: number, drawableId: number, textureId: number, paletteId: number } }
export interface PedProps { props: {compId: number, drawableId: number, textureId: number} }

export type OutfitKey = "military_1" | "military_2" | "military_3" | "military_4" | "military_5" | 
                        "narco_1" | "narco_2" | "narco_3" | "narco_4" | "narco_5"
export interface RawOutfitDict  {
  components: [
    number[],
    number[]
],
    model: number,
    props: [
      number[],
      number[]
]
}

export type ServerCallbackFn = (src: string, ...args: unknown[]) => Promise<unknown> | unknown
export interface IDeferrals  {
  /**
   *  Initializes deferrals for the current resource. It is required to wait for at least a tick after calling defer before calling any other function.

   */
  defer(): void
  /**
   * Updates the card on the client's screen
   */
  update(message: string): void
  /**
   * Presents an adaptive card, or a string on the client's screen
   * card can be an object containing card data, or a serialized JSON string with the card information

   * @param cb If present, will be invoked on an `Action.Submit` event from the Adaptive Card.
   */
  presentCard(card: Record<string, unknown> | string, cb?: (data: Record<string, unknown>, rawData: string) => void): void
  /**
   * Finalizes a deferral. It is required to wait for at least a tick before calling done after calling a prior deferral method.
   * @param failureReason If defined it will reject the connection
   */
  done(failureReason?: string): void
}