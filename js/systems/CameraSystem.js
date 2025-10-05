import { System } from '../core/core.js';
import { TransformType } from '../components/Transform.js';
import { CameraFollowType } from '../components/CameraFollow.js';

export class CameraSystem extends System {
  constructor(camera, stageEl, worldEl){
    super();
    this.camera = camera;   // {x,y,w,h,worldW,worldH}
    this.stageEl = stageEl;
    this.worldEl = worldEl;
  }
  update(){
    // Follow first CameraFollow entity
    const [subject] = this.world.query(CameraFollowType, TransformType);
    if(!subject) return;
    const t = subject.get(TransformType);

    const subjectCenterX = t.x + 8; // sprite is 16×16
    const subjectCenterY = t.y + 8;

    // Desired camera top-left so subject is centered
    let cx = subjectCenterX - this.camera.w/2;
    let cy = subjectCenterY - this.camera.h/2;

    // Clamp to world edges
    cx = Math.max(0, Math.min(cx, this.camera.worldW - this.camera.w));
    cy = Math.max(0, Math.min(cy, this.camera.worldH - this.camera.h));

    this.camera.x = cx;
    this.camera.y = cy;

    // Pan the world (translate negative camera to simulate view)
    this.worldEl.style.transform = `translate3d(${-cx}px, ${-cy}px, 0)`;
  }
}
