export abstract class Animation {
    private readonly startValue: number;
    private readonly startTarget: number;

    private isStopped: boolean = false;
    private readonly timeout: number;

    private currentTime = this.timeout;
    private stepValue: number;

    protected constructor(
        protected value: number, protected target: number,
        protected duration: number, protected reverse: boolean = false
    ) {
        this.startValue = value;
        this.startTarget = target;

        this.stepValue = (this.target - this.startValue) / 60;
        this.timeout = this.stepValue / this.duration;
        this.currentTime = this.timeout;
    }

    abstract step();

    update(dt: number) {
        if (this.isStopped) {
            return;
        }

        console.log('ct', this.currentTime, dt);
        this.currentTime -= dt;
        if (this.currentTime <= 0){
            this.currentTime = this.timeout;
            this.value += this.value > this.target ? -this.stepValue : this.stepValue;
            this.step();
        }

        if (this.value >= this.target) {
            if (this.reverse) {
                this.target = this.target === this.startTarget ? this.startValue : this.startTarget;
            } else {
                this.isStopped = true;
            }
        }
    }
}
