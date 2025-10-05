export const ColliderType = 'collider';
export class Collider {
  constructor(w=16,h=16, solid=true){ this.type = ColliderType; this.w=w; this.h=h; this.solid=solid; }
}
