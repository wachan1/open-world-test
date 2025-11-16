import { System } from '../core/core.js';
import { TransformType } from '../components/Transform.js';
import { MotionType } from '../components/Motion.js';
import { ColliderType } from '../components/Collider.js';

export class MovementSystem extends System {
  constructor(worldBounds, obstacles){
    super();
    this.worldBounds = worldBounds;   // {w,h}
    this.obstacles = obstacles;       // array of {x,y,w,h}
  }

  rectsOverlap(a,b){
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  collideAny(rect){
    for(const o of this.obstacles){
      if(this.rectsOverlap(rect, o)) return o;
    }
    return null;
  }

  update(dt){
    const movers = this.world.query(TransformType, MotionType, ColliderType);
    for(const e of movers){
      const t = e.get(TransformType);
      const m = e.get(MotionType);
      const c = e.get(ColliderType);

      // If no target, decay velocity & continue (for animation state)
      if(m.tx == null || m.ty == null){
        m.vx = m.vy = 0;
        continue;
      }

      const dx = (m.tx - t.x);
      const dy = (m.ty - t.y);
      const dist = Math.hypot(dx, dy);

      if(dist < 0.5){
        t.x = m.tx; t.y = m.ty;
        m.tx = m.ty = null;
        m.vx = m.vy = 0;
        continue;
      }

      const step = Math.min(m.speed * dt, dist);
      const nx = dx / dist;
      const ny = dy / dist;

      // Try axis-separated movement for simple sliding along obstacles
      // Move X
      let newX = t.x + nx * step;
      let rectX = { x:newX, y:t.y, w:c.w, h:c.h };
      // clamp to world bounds
      rectX.x = Math.max(0, Math.min(rectX.x, this.worldBounds.w - c.w));
      const hitX = this.collideAny(rectX);
      if(hitX){ newX = t.x; } // cancel X if collide

      // Move Y
      let newY = t.y + ny * step;
      let rectY = { x:newX, y:newY, w:c.w, h:c.h };
      rectY.y = Math.max(0, Math.min(rectY.y, this.worldBounds.h - c.h));
      const hitY = this.collideAny(rectY);
      if(hitY){ newY = t.y; }

      m.vx = newX - t.x;
      m.vy = newY - t.y;

      const absX = Math.abs(m.vx);
      const absY = Math.abs(m.vy);
      if(absX > 0.01 || absY > 0.01){
        if(absX > absY){
          m.dir = m.vx >= 0 ? 'right' : 'left';
        } else {
          m.dir = m.vy >= 0 ? 'down' : 'up';
        }
      }

      t.x = newX;
      t.y = newY;
    }
  }
}
