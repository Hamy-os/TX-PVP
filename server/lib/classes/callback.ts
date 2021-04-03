import { ServerCallbackFn } from "../../typings";

export class ServerCallback {
  private static funcs: Map<string, ServerCallbackFn> = new Map()
  
  public static listen(): void {
    console.log("Listening for callbacks")
    onNet("TXPVP:CORE:sv_cb_trigger", async (name: string, ...args: unknown[]) => {
      const src = source
      const fn = this.funcs.get(name)(src, args)
      const isPromise = fn instanceof Promise
      try {
        if (isPromise) {
          const ret = await fn
          emitNet(`TXPVP:CORE:sv_cb_receive:${name}`, src, ret)
        } else {
          const ret = fn
          emitNet(`TXPVP:CORE:sv_cb_receive:${name}`, src, ret)
        }
      } catch (err) {
        throw err
      }
      
    })
  }

  public static registerCallback<T>(name: string, fn: ServerCallbackFn): void {
    this.funcs.set(name, fn)
  }
  
  public static triggerClientCallback<T>(name: string, target: string, ...args: unknown[]): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      emitNet(`TXPVP:CORE:cl_cb_trigger`, name, target, args)
      const cb = (...result: unknown[]) => {
        resolve(result as unknown as T)
        removeEventListener(`TXPVP:CORE:sv_cb_receive:${name}`, cb)
      }
      onNet(`TXPVP:CORE:cl_cb_receive:${name}`, cb)
    })
  }
  
}