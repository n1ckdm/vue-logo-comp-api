class Particle {
  public pos: [number, number];
  public target: [number, number];
  public vel: [number, number];
  public acc: [number, number];
  public maxForce: number;
  public maxSpeed: number;

  constructor(pos: [number, number], target: [number, number]) {
    this.pos = pos;
    this.target = target;
    this.acc = [0, 0];
    this.maxForce = 1;
    this.maxSpeed = 8;
    this.vel = [(Math.random() * 2 - 1) * this.maxSpeed, (Math.random() * 2 - 1) * this.maxSpeed];
  }

  public scaleInRange(v: number, vMin: number, vMax: number, rMin: number, rMax: number) {
    const percent = (v - vMin) / (vMax - vMin);
    return percent * (rMax - rMin) + rMin;
  }

  public arrive() {
    const desired = [
      this.target[0] - this.pos[0],
      this.target[1] - this.pos[1],
    ];
    const dist = Math.sqrt(Math.pow(desired[0], 2) + Math.pow(desired[1], 2));
    let speed = this.maxSpeed;
    if (dist < 200) {
      speed = this.scaleInRange(dist, 0, 1000, 0, this.maxSpeed);
    }
    const steer = [
      desired[0] * speed - this.vel[0],
      desired[1] * speed - this.vel[1],
    ];
    const mag = Math.sqrt(Math.pow(steer[0], 2) + Math.pow(steer[1], 2));
    if (mag > this.maxForce) {
      steer[0] = this.maxForce * Math.sign(steer[0]);
      steer[1] = this.maxForce * Math.sign(steer[1]);
    }
    return steer;
  }

  public flee(target: number[]) {
    if (target[0] === 0 && target[1] === 0) {
      return [0, 0];
    }
    let desired = [
      (target[0] - this.pos[0]) * -1,
      (target[1] - this.pos[1]) * -1,
    ];
    const dist = Math.sqrt(Math.pow(desired[0], 2) + Math.pow(desired[1], 2));
    if (dist > 50) {
      return [0, 0];
    }
    desired = [desired[0] * -1, desired[1] * -1];
    const steer = [
      (desired[0] - this.vel[0]),
      (desired[1] - this.vel[1]),
    ];
    const mag = Math.sqrt(Math.pow(steer[0], 2) + Math.pow(steer[1], 2));
    if (mag > this.maxForce) {
      steer[0] = this.maxForce * Math.sign(steer[0]);
      steer[1] = this.maxForce * Math.sign(steer[1]);
    }
    return steer;
  }

  public behaviours(fleeTarget: number[]) {
    const flee = this.flee(fleeTarget);
    this.applyForce(this.arrive());
    this.applyForce([flee[0] * 5, flee[1] * 5]);
  }

  public applyForce(force: number[]) {
    this.acc[0] += force[0];
    this.acc[1] += force[1];
  }

  public update() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.vel[0] += this.acc[0];
    this.vel[1] += this.acc[1];
    this.acc = [0, 0];
  }
}

export default Particle;
