import { ClientCallbackFn } from "../../typings";
export class ClientCallback {
  private static funcs: Map<string, ClientCallbackFn> = new Map()
  public static listen() {
    console.log("Listening for callbacks")
    onNet("TXPVP:CORE:cl_cb_trigger", async (name: string, ...args: unknown[]) => {
      const src = source
      const fn = this.funcs.get(name)(args)
      const isPromise = fn instanceof Promise
      try {
        if (isPromise) {
          const result = await fn
          emitNet(`TXPVPV:CORE:cl_receive:${name}`, src, result)
        } else {
          const result = fn
          emitNet(`TXPVPV:CORE:cl_receive:${name}`, src, result)
        }
      } catch (err) {
        throw err
      }
      
    })
  }

  public static registerCallback<T>(name: string, fn: ClientCallbackFn): void {
    this.funcs.set(name, fn)
  }
  
  public static triggerServerCallback<T>(name: string,  ...args: unknown[]): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      emitNet(`TXPVP:CORE:sv_cb_trigger`, name, args)
      console.log("Triggered callback")
      const cb = (...result: unknown[]) => {
        resolve(result[0] as unknown as T)
        removeEventListener(`TXPVP:CORE:sv_cb_receive:${name}`, cb)
      }
      onNet(`TXPVP:CORE:sv_cb_receive:${name}`, cb)
    })
  }
  
}