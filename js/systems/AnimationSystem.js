import { System } from '../core/core.js';
import { MotionType } from '../components/Motion.js';
import { SpriteType } from '../components/Sprite.js';
import { TransformType } from '../components/Transform.js';

const WALK_FRAME_DURATION = 0.14; // seconds per frame (~7 fps)

const FRAME_DATA = {
  down: {
    idle: { x:102, y:61, w:221, h:280 },
    walk: [
      { x:123, y:341, w:201, h:341 },
      { x:135, y:682, w:188, h:314 },
    ],
  },
  up: {
    idle: { x:396, y:61, w:229, h:280 },
    walk: [
      { x:413, y:341, w:196, h:341 },
      { x:414, y:682, w:195, h:314 },
    ],
  },
  right: {
    idle: { x:696, y:61, w:203, h:280 },
    walk: [
      { x:695, y:341, w:204, h:341 },
      { x:695, y:682, w:202, h:314 },
    ],
  },
};

function applyFrame(el, frame){
  el.style.setProperty('--frame-w', `${frame.w}px`);
  el.style.setProperty('--frame-h', `${frame.h}px`);
  el.style.setProperty('--bg-x', `${frame.x}px`);
  el.style.setProperty('--bg-y', `${frame.y}px`);
}

export class AnimationSystem extends System {
  constructor(){
    super();
    this.walkState = new Map();
  }

  update(dt=0){
    const ents = this.world.query(MotionType, SpriteType, TransformType);
    for(const e of ents){
      const m = e.get(MotionType);
      const s = e.get(SpriteType);

      const speedSq = m.vx*m.vx + m.vy*m.vy;
      const moving = speedSq > 0.01;

      // State classes on the entity root (parent of .sprite)
      const root = s.dom.closest('.entity');
      if(!root) continue;

      if(moving){ root.classList.add('state--walk'); root.classList.remove('state--idle'); }
      else { root.classList.add('state--idle'); root.classList.remove('state--walk'); }

      const spriteEl = s.dom;
      const dir = m.dir || 'down';
      spriteEl.dataset.dir = dir;
      spriteEl.classList.toggle('flip-x', dir === 'right');
    }
  }
}
