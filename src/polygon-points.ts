import classifyPoint from 'robust-point-in-polygon';
import Particle from '@/particle';

class PolygonPoints {
  private particles: Particle[] = [];
  private polygon: Array<[number, number]> = [];

  constructor(polygonPoints: Array<[number, number]>, points: number = 100) {
    this.polygon = polygonPoints.map((p) => [p[0], p[1]]);

    const ar = this.height() / this.width();
    const pointsY = Math.floor(ar * points);
    const min = this.min();
    const width = this.width();
    const height = this.height();

    for (let i = 0; i < pointsY; i++) {
      for (let j = 0; j < points; j++) {
        const x = (j / points) * width + min.x;
        const y = (i / pointsY) * height + min.y;
        const res = classifyPoint(this.polygon, [x, y]);
        if (res === -1 || res === 0) {
          this.particles.push(new Particle(
            [(Math.random() * width + min.x), (Math.random() * height + min.y)],
            [x, y]));
        }
      }
    }
  }

  public update(fleeTarget: number[]) {
    this.particles.forEach((p) => {
      p.behaviours(fleeTarget);
      p.update();
    });
  }

  public width() {
    return this.max().x - this.min().x;
  }

  public height() {
    return this.max().y - this.min().y;
  }

  public min() {
    return {
      x: this.polygon.reduce((min, p) => p[0] < min ? p[0] : min, this.polygon[0][0]),
      y: this.polygon.reduce((min, p) => p[1] < min ? p[1] : min, this.polygon[0][1]),
    };
  }

  public max() {
    return {
      x: this.polygon.reduce((max, p) => p[0] > max ? p[0] : max, this.polygon[0][0]),
      y: this.polygon.reduce((max, p) => p[1] > max ? p[1] : max, this.polygon[0][1]),
    };
  }

  public getParticles() {
    return this.particles.map((p) => [p.pos[0], p.pos[1]]);
  }

  public pointsStr() {
    return this.polygon.map((point) => `${point[0]},${point[1]}`).join(' ');
  }
}

export default PolygonPoints;
