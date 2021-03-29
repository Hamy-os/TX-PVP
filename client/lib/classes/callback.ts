export class ClientCallback {
  private static funcs: { [key: string]: (...args: unknown[]) => Promise<unknown> | unknown } = {}
  private static results: {[key: string]: unknown} = {}
  public static listen() {
    console.log("Listening for callbacks")
    onNet("TXPVP:CORE:cl_cb_trigger", async (name: string, ...args: unknown[]) => {
      const src = source
      const fn = this.funcs[name]
      let result
      if (fn.constructor.name === "AsyncFunction") {
        result = await this.funcs[name](args)
      } else {
        result = this.funcs[name](args)
      }
      emitNet(`TXPVPV:CORE:cl_receive:${name}`, src, result)
    })
  }

  public static registerCallback<T>(name: string, fn: (...args: unknown[]) => Promise<T> | T): void {
    this.funcs[name] = fn
  }
  
  public static triggerServerCallback<T>(name: string,  ...args: unknown[]): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      emitNet(`TXPVP:CORE:sv_cb_trigger`, name, args)
      console.log("Triggered callback")
      const cb = (...result: unknown[]) => {
        resolve(result[0] as unknown as T)
      }
      onNet(`TXPVP:CORE:sv_cb_receive:${name}`, cb)
      removeEventListener(`TXPVP:CORE:sv_cb_receive:${name}`, cb)
    })
  }
  
}