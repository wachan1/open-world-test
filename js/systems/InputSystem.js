import { System } from '../core/core.js';
import { MotionType } from '../components/Motion.js';
import { TransformType } from '../components/Transform.js';
import { ClickMovableType } from '../components/ClickMovable.js';

export class InputSystem extends System {
  constructor(stageEl, worldEl, camera){
    super();
    this.stageEl = stageEl;
    this.worldEl = worldEl;
    this.camera = camera;
    this._onPointer = e => this.handlePointer(e);
    this._onKey = e => this.handleKey(e);
  }
  mount(){
    this.stageEl.addEventListener('pointerdown', this._onPointer);
    window.addEventListener('keydown', this._onKey);
  }
  handleKey(e){
    if(e.key === 'd' || e.key === 'D'){
      this.worldEl.classList.toggle('grid-on');
      const dbg = document.querySelector('#debug');
      dbg.hidden = !dbg.hidden;
    }
  }
  handlePointer(e){
    const rect = this.stageEl.getBoundingClientRect();
    const stageX = e.clientX - rect.left;
    const stageY = e.clientY - rect.top;

    const worldX = this.camera.x + stageX;
    const worldY = this.camera.y + stageY;

    const [player] = this.world.query(ClickMovableType, TransformType, MotionType);
    if(!player) return;

    const m = player.get(MotionType);
    m.tx = worldX - 8;  // center roughly (sprite is 16×16)
    m.ty = worldY - 8;
  }
  update(){}
}
