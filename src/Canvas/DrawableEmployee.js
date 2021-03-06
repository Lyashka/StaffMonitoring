import { DrawableCircle } from './Drawable/DrawableCircle';
import { Moveable } from './Moveable';

export class DrawableEmployee extends Moveable(DrawableCircle) {
  constructor({
    employee,
    xCurrent,
    yCurrent,
    radius,
    color,
    drawPoint,
    track = null,
    currentPointIndex,
    afterMove,
  }, two) {
    super({
      xCurrent,
      yCurrent,
      radius,
      color,
      drawPoint,
      currentPointIndex,
    }, two);
    this.track = track;
    this.id = employee.id;
    this.name = employee.name;
    this.afterMove = afterMove;
    this.employee = employee;
  }

  getId() {
    return this.id;
  }

  draw() {
    super.draw();
    this.update();
  }

  clear() {
    this.two.remove(this.drawPoint);
    this.update();
  }

  move(x, y) {
    this.clear();
    this.xCenter = x;
    this.yCenter = y;
    this.draw();
  }

  remove() {
    this.stopMovingAlongTrack();
    this.clear();
  }
}
