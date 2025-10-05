import { System } from '../core/core.js';
import { TransformType } from '../components/Transform.js';
import { SpriteType } from '../components/Sprite.js';

export class RenderSystem extends System {
  constructor(worldEl){
    super();
    this.worldEl = worldEl;
  }
  mount(){
    for(const e of this.world.entities.values()){
      this.ensureDom(e);
    }
  }
  ensureDom(e){
    const spr = e.get?.(SpriteType);
    if(spr && !e.dom){
      const root = document.createElement('div');
      root.className = 'entity state--idle';
      root.appendChild(spr.dom);
      this.worldEl.appendChild(root);
      e.dom = root;
    }
  }
  update(){
    for(const e of this.world.entities.values()){
      const t = e.get?.(TransformType);
      const s = e.get?.(SpriteType);
      if(!t || !s) continue;
      if(!e.dom) this.ensureDom(e);
      e.dom.style.transform = `translate3d(${t.x}px, ${t.y}px, 0)`;
    }
  }
}
