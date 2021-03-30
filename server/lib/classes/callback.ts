export class ServerCallback {
  private static funcs: { [key: string]: (src: string, ...args: unknown[]) => Promise<unknown> | unknown } = {}
  private static results: {[key: string]: unknown} = {}
  public static listen() {
    console.log("Listening for callbacks")
    onNet("TXPVP:CORE:sv_cb_trigger", async (name: string, ...args: unknown[]) => {
      const src = source
      const fn = this.funcs[name](src, args)
      const isPromise = fn instanceof Promise
      if (isPromise) {
        const ret = await fn
        emitNet(`TXPVP:CORE:sv_cb_receive:${name}`, src, ret)
      } else {
        const ret = fn
        console.log("Returning", fn)
        emitNet(`TXPVP:CORE:sv_cb_receive:${name}`, src, ret)
      }

    })
  }

  public static registerCallback<T>(name: string, fn: (src: string, ...args: unknown[]) => Promise<T> | T): void {
    this.funcs[name] = fn
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