import { TinyEmitter } from 'tiny-emitter'
const emitter = new TinyEmitter()

export default {
  // @ts-ignore
  $on: (...args: any[]) => emitter.on(...args),
  // @ts-ignore
  $emit: (...args: any[]) => emitter.emit(...args),
  // @ts-ignore
  $off: (...args: any[]) => emitter.off(...args),
}
