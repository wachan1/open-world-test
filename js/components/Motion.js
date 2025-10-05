export const MotionType = 'motion';
export class Motion {
  constructor(speed=130){ this.type = MotionType; this.speed=speed; this.tx=null; this.ty=null; this.vx=0; this.vy=0; }
}
