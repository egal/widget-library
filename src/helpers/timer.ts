export default class Timer {
  private readonly _duration: number
  private _startTime: number | undefined
  private _remaining: number | undefined
  private _onTimerEnd: Function | undefined
  private _timeout: any

  constructor(duration: number) {
    this._duration = duration
    this._remaining = duration
  }

  set onTimerEnd(value: Function) {
    this._onTimerEnd = value
  }

  start(): void {
    this._startTime = Date.now()
    this._timeout = setTimeout(() => this._onTimerEnd!(), this._duration)
  }

  pause(): void {
    clearTimeout(this._timeout)
    this._remaining! -= Date.now() - this._startTime!
  }

  resume(): void {
    this._startTime = Date.now()
    this._timeout = setTimeout(() => this._onTimerEnd!(), this._remaining)
  }

  stop(callTimerEndHandler: boolean = false): void {
    clearTimeout(this._timeout)
    if (callTimerEndHandler) this._onTimerEnd!()
  }
}
