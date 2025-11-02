import { System } from '../core/core.js';
import { MotionType } from '../components/Motion.js';
import { SpriteType } from '../components/Sprite.js';
import { TransformType } from '../components/Transform.js';

export class AnimationSystem extends System {
  update(){
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
