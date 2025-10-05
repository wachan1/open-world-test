// Defines world size and obstacles. Also creates DOM for obstacles.

export function createWorld(props){
  const { worldEl } = props;

  // One big test obstacle ("boulder") in the field
  const obstacle = { x: 700, y: 300, w: 300, h: 220 };

  const oEl = document.createElement('div');
  oEl.className = 'obstacle';
  oEl.style.left = obstacle.x + 'px';
  oEl.style.top  = obstacle.y + 'px';
  oEl.style.width  = obstacle.w + 'px';
  oEl.style.height = obstacle.h + 'px';
  worldEl.appendChild(oEl);

  return {
    obstacles: [obstacle]
  };
}
