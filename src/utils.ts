export function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fill: boolean = true) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (fill) {
        ctx.fill()
    } else {
        ctx.stroke()
    }
}


export function drawTriangle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fill: boolean = true) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0, Math.PI / 3);
    if (fill) {
        ctx.fill()
    } else {
        ctx.stroke()
    }
}
