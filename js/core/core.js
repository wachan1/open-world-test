let ENTITY_ID = 1;

export class Entity {
  constructor(){
    this.id = ENTITY_ID++;
    this.components = new Map();
    this.dom = null;
  }

  add(component){
    if(!component?.type){
      throw new Error('Component must have a type property');
    }
    this.components.set(component.type, component);
    return this;
  }

  get(type){
    return this.components.get(type);
  }

  has(type){
    return this.components.has(type);
  }

  remove(type){
    this.components.delete(type);
    return this;
  }
}

export class System {
  constructor(){
    this.world = null;
  }

  mount(){}

  unmount(){}

  update(){ }
}

export class World {
  constructor(){
    this.entities = new Map();
    this.systems = [];
  }

  addEntity(entity){
    this.entities.set(entity.id, entity);
    return this;
  }

  removeEntity(entity){
    this.entities.delete(entity.id);
    return this;
  }

  addSystem(system){
    if(!this.systems.includes(system)){
      system.world = this;
      this.systems.push(system);
      if(typeof system.mount === 'function'){
        system.mount();
      }
    }
    return this;
  }

  removeSystem(system){
    const idx = this.systems.indexOf(system);
    if(idx >= 0){
      const [sys] = this.systems.splice(idx, 1);
      if(typeof sys.unmount === 'function'){
        sys.unmount();
      }
      sys.world = null;
    }
    return this;
  }

  query(...types){
    const required = Array.isArray(types[0]) ? types[0] : types;
    const results = [];
    for(const entity of this.entities.values()){
      let match = true;
      for(const type of required){
        if(!entity.has(type)){
          match = false;
          break;
        }
      }
      if(match) results.push(entity);
    }
    return results;
  }

  tick(dt){
    for(const system of this.systems){
      system.update?.(dt);
    }
  }
}
