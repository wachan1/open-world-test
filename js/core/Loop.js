export class Loop {
  constructor(update){
    this.update = update;
    this._acc = 0; this._last = 0; this._running = false;
    this.fixed = 1/120;
  }
  start(){
    if(this._running) return;
    this._running = true; this._last = performance.now();
    const frame = now => {
      if(!this._running) return;
      const dt = (now - this._last)/1000; this._last = now; this._acc += dt;
      if(this._acc > 0.25) this._acc = 0.25;
      while(this._acc >= this.fixed){ this.update(this.fixed); this._acc -= this.fixed; }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
  stop(){ this._running = false; }
}
