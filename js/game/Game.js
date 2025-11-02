import { World, System } from '../core/core.js';
import { Loop } from '../core/Loop.js';

import { Entity } from '../core/core.js';
import { Transform } from '../components/Transform.js';
import { Motion } from '../components/Motion.js';
import { Sprite } from '../components/Sprite.js';
import { ClickMovable } from '../components/ClickMovable.js';
import { Collider } from '../components/Collider.js';
import { CameraFollow } from '../components/CameraFollow.js';

import { InputSystem } from '../systems/InputSystem.js';
import { MovementSystem } from '../systems/MovementSystem.js';
import { AnimationSystem } from '../systems/AnimationSystem.js';
import { CameraSystem } from '../systems/CameraSystem.js';
import { RenderSystem } from '../systems/RenderSystem.js';

import { createWorld } from '../world/Map.js';

export class Game {
  constructor(opts){
    this.stageW = opts.stageW;
    this.stageH = opts.stageH;
    this.worldW = opts.worldW;
    this.worldH = opts.worldH;

    this.stageEl = document.querySelector(opts.rootSel);
    this.worldEl = document.querySelector(opts.worldSel);
    this.debugEl = document.querySelector(opts.debugSel);

    this.world = new World();
    this.loop = new Loop((dt)=>this.update(dt));

    // Camera state shared by systems
    this.camera = { x:0, y:0, w:this.stageW, h:this.stageH, worldW:this.worldW, worldH:this.worldH };

    // Build world visuals & data (obstacles DOM is added here)
    const worldData = createWorld({ worldEl: this.worldEl });
    this.obstacles = worldData.obstacles;

    // Systems (order matters a bit)
    this.input = new InputSystem(this.stageEl, this.worldEl, this.camera);
    this.movement = new MovementSystem({ w:this.worldW, h:this.worldH }, this.obstacles);
    this.anim = new AnimationSystem();
    this.cameraSys = new CameraSystem(this.camera, this.stageEl, this.worldEl);
    this.render = new RenderSystem(this.worldEl);

    this.world.addSystem(this.input)
              .addSystem(this.movement)
              .addSystem(this.anim)
              .addSystem(this.cameraSys)
              .addSystem(this.render);

    // Create player
    const player = this.createPlayer(200, 200);
    this.world.addEntity(player);
  }

  createPlayer(x,y){
    const e = new Entity();
    e.add(new Transform(x,y));
    e.add(new Motion(150));             // snappy speed
    e.add(new Collider(16,16,true));
    e.add(new ClickMovable());
    e.add(new CameraFollow());

    // Build sprite DOM
    const sprite = this.buildPersonSprite();
    e.add(new Sprite(sprite));
    return e;
  }

  buildPersonSprite(){
    const root = document.createElement('div');
    root.className = 'sprite person';
    root.dataset.dir = 'down';
    return root;
  }

  start(){
    this.loop.start();
  }

  update(dt){
    this.world.tick(dt);
    this.renderDebug();
  }

  renderDebug(){
    if(this.debugEl.hidden) return;
    const [player] = this.world.query('transform','motion');
    const t = player?.get('transform');
    const m = player?.get('motion');
    const lines = [
      `cam: (${this.camera.x.toFixed(1)}, ${this.camera.y.toFixed(1)})`,
      `pos: (${t?.x.toFixed(1)}, ${t?.y.toFixed(1)})`,
      `vel: (${m?.vx.toFixed?.(2)}, ${m?.vy.toFixed?.(2)})`,
      `obstacles: ${this.obstacles.length}`,
      `hint: click to move, press D to toggle debug + grid`,
    ];
    this.debugEl.textContent = lines.join('\n');
  }
}
