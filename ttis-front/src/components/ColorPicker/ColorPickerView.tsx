import { useRef, useEffect } from "react";
import ResizeObserver from "react-resize-observer";

interface Color {
  r: number;
  g: number;
  b: number;
}

interface Values {
  color: Color;
  color2: Color;
  triangleSize: number;
  trianglePoint: { x: number; y: number }[];
}

export const ColorPickerView = () => {
  const nodeTriangle = useRef<HTMLCanvasElement>(null);
  const nodeLevel = useRef<HTMLCanvasElement>(null);
  const nodeTarget = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const onTriangle = (e: MouseEvent | TouchEvent) => {
      if (
        ("touches" in e && e.touches.length === 0) ||
        ("buttons" in e && e.buttons == 0)
      )
        return;
      setTriangleColor(e);
    };
    nodeTriangle.current?.addEventListener("mousemove", onTriangle);
    nodeTriangle.current?.addEventListener("mousedown", onTriangle);
    nodeTriangle.current?.addEventListener("touchstart", onTriangle);
    const onLevel = (e: MouseEvent) => {
      if (e.buttons == 0 || !(e.target instanceof HTMLCanvasElement)) return;
      const rect = e.target.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      const color = This.color;
      const color2 = This.color2;
      color2.r = getColorLevel(mouseY, color.r);
      color2.g = getColorLevel(mouseY, color.g);
      color2.b = getColorLevel(mouseY, color.b);
      setColorTarget();
    };
    nodeLevel.current?.addEventListener("mousemove", onLevel);
    return () => {
      nodeTriangle.current?.removeEventListener("mousemove", onTriangle);
    };
  });
  const This = useRef<Values>({
    color: { r: 100, g: 100, b: 100 },
    color2: { r: 100, g: 100, b: 100 },
    trianglePoint: [],
    triangleSize: 100,
  }).current;

  return (
    <>
      <style jsx>{`
        .root {
          width: 100%;
          height: 100%;
          display: flex;
          position: absolute;
        }
        .targetBox {
          position: relative;
          padding-top: 100%;
        }
        .colorTarget {
          position: absolute;
          border-style: double;
          top: 0;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
        .colorLevel {
          position: relative;
          border: solid 1px;
          flex: 1;
        }
        .colorTriangle {
          min-width: 0;
          flex: 1;
          background-color: black;

        }
        .leftBar {
          display: flex;
          flex-direction: column;
          width: 3em;
        }
      `}</style>

      <div className="root">
        <div className="leftBar">
          <div className="targetBox">
            <canvas ref={nodeTarget} className="colorTarget"></canvas>
          </div>
          <canvas ref={nodeLevel} className="colorLevel"></canvas>
        </div>
        <canvas ref={nodeTriangle} className="colorTriangle"></canvas>
        <ResizeObserver
          onResize={() => {
            drawTriangle();
          }}
        />
      </div>
    </>
  );
  function setColorLevel(r?: number, g?: number, b?: number) {
    if (r === undefined || g === undefined || b === undefined) {
      r = This.color.r;
      g = This.color.g;
      b = This.color.b;
    } else {
      This.color = { r, g, b };
      This.color2 = { r, g, b };
    }
    const canvasLevel = nodeLevel.current!;
    const ctxLevel = canvasLevel.getContext("2d");
    if (!ctxLevel) return false;
    const grad = ctxLevel.createLinearGradient(0, canvasLevel.height, 0, 0);
    grad.addColorStop(0 + (1 - 1 / 1.1), "rgb(0,0,0)");
    grad.addColorStop(0.5, "rgb(" + r + "," + g + "," + b + ")");
    grad.addColorStop(1 - (1 - 1 / 1.1), "rgb(255,255,255)");
    ctxLevel.fillStyle = grad;
    ctxLevel.fillRect(0, 0, canvasLevel.width, canvasLevel.height);

    setColorTarget();
  }
  function drawTriangle() {
    const triangleCanvas = nodeTriangle.current!;
    //クライアントサイズの取得
    let width = triangleCanvas.clientWidth;
    let height = triangleCanvas.clientHeight;
    console.log(triangleCanvas.clientWidth)

    const ctx = triangleCanvas.getContext("2d");
    if (!ctx) return;

    //トライアングルサイズの補正
    const triangle = Math.min(width, height);
    triangleCanvas.width = triangle;
    triangleCanvas.height = triangle;
    This.triangleSize = triangle * 0.95;
    width = This.triangleSize;
    height = This.triangleSize;
    ctx.clearRect(0, 0, width, height);

    const x = (triangleCanvas.width - width) / 2;
    const y = (triangleCanvas.height - height) / 2;
    const trianglePoinst = [
      { x: x + width / 2, y },
      { x, y: y + height },
      { x: x + width, y: y + height },
    ];
    This.trianglePoint = trianglePoinst;
    const color = [
      ["RGBA(255,0,0,255)", "RGBA(0,0,0,255)"],
      ["RGBA(0,255,0,255)", "RGBA(0,0,0,255)"],
      ["RGBA(0,0,255,255)", "RGBA(0,0,0,255)"],
    ];
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 3; i++) {
      const i0 = i % 3;
      const i1 = (i + 1) % 3;
      const i2 = (i + 2) % 3;
      /* 三角形を描く */
      const grad = ctx.createLinearGradient(
        trianglePoinst[i0].x,
        trianglePoinst[i0].y,
        (trianglePoinst[i1].x + trianglePoinst[i2].x) / 2,
        (trianglePoinst[i1].y + trianglePoinst[i2].y) / 2
      );
      grad.addColorStop(0, color[i][0]);
      grad.addColorStop(1 / 1.1, color[i][1]);
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(trianglePoinst[i0].x, trianglePoinst[i0].y);
      ctx.lineTo(trianglePoinst[i1].x, trianglePoinst[i1].y);
      ctx.lineTo(trianglePoinst[i2].x, trianglePoinst[i2].y);
      ctx.closePath();
      /* 三角形を塗りつぶす */
      ctx.fill();
    }
  }
  function setTriangleColor(e: MouseEvent | TouchEvent) {
    if (!e.target) return;
    const trianglePoinst = This.trianglePoint;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const mouseX =
      "clientX" in e ? e.clientX - rect.left : e.touches[0].clientX;
    const mouseY =
      "clientY" in e ? e.clientY - rect.top : e.touches[0].clientY;
    const r = getColor(
      mouseX,
      mouseY,
      trianglePoinst[0].x,
      trianglePoinst[0].y
    );
    const g = getColor(
      mouseX,
      mouseY,
      trianglePoinst[1].x,
      trianglePoinst[1].y
    );
    const b = getColor(
      mouseX,
      mouseY,
      trianglePoinst[2].x,
      trianglePoinst[2].y
    );
    setColorLevel(r, g, b);
  }

  function getColor(px: number, py: number, cx: number, cy: number) {
    let value = Math.floor(
      (1 -
        Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2)) /
          This.triangleSize) *
        255 *
        1.1
    );
    if (value < 0) value = 0;
    else if (value > 255) value = 255;
    return value;
  }
  function getColorLevel(py: number, color: number) {
    const length = nodeLevel.current!.offsetHeight / 2;
    const level = ((py - length) / length) * 1.1;
    let value: number;
    if (level < 0) {
      value = Math.floor(255 * -level + color * (1 + level));
    } else {
      value = Math.floor(color * (1 - level));
    }
    if (value < 0) value = 0;
    else if (value > 255) value = 255;
    return value;
  }
  function setColorTarget() {
    const canvasTarget = nodeTarget.current!;
    const ctx = canvasTarget.getContext("2d");
    if (!ctx) return;
    const color2 = This.color2;
    ctx.fillStyle =
      "rgb(" +
      (255 - color2.r) +
      "," +
      (255 - color2.g) +
      "," +
      (255 - color2.b) +
      ")";
    ctx.fillRect(0, 0, canvasTarget.width, canvasTarget.height);
    ctx.fillStyle = "rgb(" + color2.r + "," + color2.g + "," + color2.b + ")";
    ctx.fillRect(2, 2, canvasTarget.width - 4, canvasTarget.height - 4);
  }
};
