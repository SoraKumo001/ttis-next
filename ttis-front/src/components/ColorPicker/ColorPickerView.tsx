import { useRef, useEffect } from "react";
import ResizeObserver from "react-resize-observer";

interface Values {
  color: number;
  colorLevel: number;
  triangleSize: number;
  update?: boolean;
  trianglePoint: { x: number; y: number }[];
}
interface Props {
  color: number;
  onChange: (color: number) => void;
}
export const ColorPickerView = ({ color, onChange }: Props) => {
  const refCircle = useRef<HTMLCanvasElement>(null);
  const refLevel = useRef<HTMLCanvasElement>(null);
  const refTarget = useRef<HTMLCanvasElement>(null);
  const refPointer = useRef<HTMLDivElement>(null);
  const refLevelPointer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setColorLevel(1);
  }, []);
  useEffect(() => {
    setColor(color);
  }, [color]);
  const This = useRef<Values>({
    color: 0xffffff,
    trianglePoint: [],
    triangleSize: 100,
    colorLevel: 1,
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
        .colorLevel canvas {
          position: absolute;
          user-select: none;
          top: 0;
          height: 100%;
          flex: 1;
        }
        .colorCircle {
          position: relative;
          flex: 1;
        }
        .colorCircle canvas {
          width: 100%;
          height: 100%;
          background-color: black;
          user-select: none;
          cursor: pointer;
        }
        .pointer {
          position: absolute;
          top: 0;
          width: 1ex;
          height: 1ex;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 100%;
          pointer-events: none;
        }
        .levelPointer {
          position: absolute;
          top: 0;
          width: 100%;
          height: 4px;
          border: 1px solid;
          box-sizing: border-box;
          pointer-events: none;
          background: rgba(255, 255, 255, 0.4);
        }
        .leftBar {
          display: flex;
          flex-direction: column;
          width: 2em;
        }
      `}</style>

      <div className="root">
        <div className="leftBar">
          <div className="targetBox">
            <canvas ref={refTarget} className="colorTarget"></canvas>
          </div>
          <div className="colorLevel">
            <canvas
              ref={refLevel}
              onMouseMove={onColorLevel}
              onMouseDown={onColorLevel}
              onTouchMove={onColorLevel}
              onTouchStart={onColorLevel}
            ></canvas>
            <div ref={refLevelPointer} className="levelPointer" />
          </div>
        </div>
        <div className="colorCircle">
          <canvas
            ref={refCircle}
            onMouseMove={onCircle}
            onMouseDown={onCircle}
            onTouchMove={onCircle}
            onTouchStart={onCircle}
          ></canvas>
          <div ref={refPointer} className="pointer" />
        </div>
        <ResizeObserver
          onResize={() => {
            drawCircle();
          }}
        />
      </div>
    </>
  );
  function getRGB(color: number) {
    return {
      r: (color / 256 / 256) % 256,
      g: (color / 256) % 256,
      b: color % 256,
    };
  }
  function getRGBtoColor({ r, g, b }: { r: number; g: number; b: number }) {
    return Math.floor(r) * 256 * 256 + Math.floor(g) * 256 + Math.floor(b);
  }

  function drawCircle() {
    const triangleCanvas = refCircle.current!;
    //クライアントサイズの取得
    let width = triangleCanvas.offsetWidth;
    let height = triangleCanvas.offsetHeight;
    triangleCanvas.width = width;
    triangleCanvas.height = height;

    let centerX = width / 2;
    let centerY = height / 2;

    const ctx = triangleCanvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    //トライアングルサイズの補正
    const triangle = Math.floor(Math.min(width, height) * 0.9);

    This.triangleSize = triangle;

    const r = triangle / 2;
    const trianglePoint = [
      {
        x: centerX + Math.sin((0 * Math.PI) / 180) * r,
        y: centerY - Math.cos((0 * Math.PI) / 180) * r,
      },
      {
        x: centerX + Math.sin((120 * Math.PI) / 180) * r,
        y: centerY - Math.cos((120 * Math.PI) / 180) * r,
      },
      {
        x: centerX + Math.sin((240 * Math.PI) / 180) * r,
        y: centerY - Math.cos((240 * Math.PI) / 180) * r,
      },
    ];
    This.trianglePoint = trianglePoint;
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
      const grad = ctx.createLinearGradient(
        trianglePoint[i0].x,
        trianglePoint[i0].y,
        (trianglePoint[i1].x + trianglePoint[i2].x) / 2,
        (trianglePoint[i1].y + trianglePoint[i2].y) / 2
      );
      grad.addColorStop(0, color[i][0]);
      grad.addColorStop(1 / 1.1, color[i][1]);
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        r,
        (0 * Math.PI) / 180,
        (360 * Math.PI) / 180,
        false
      );
      ctx.closePath();
      /* 三角形を塗りつぶす */
      ctx.fill();
    }
  }

  function getColor(px: number, py: number, cx: number, cy: number) {
    let value = Math.round(
      (1 -
        Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2)) /
          ((This.triangleSize * Math.sqrt(3)) / 2)) *
        255
    );
    return Math.min(Math.max(value, 0), 255);
  }
  function setColorTarget() {
    const canvasTarget = refTarget.current!;
    const ctx = canvasTarget.getContext("2d");
    if (!ctx) return;
    const rgb = getRGB(color);
    ctx.fillStyle =
      "rgb(" + (255 - rgb.r) + "," + (255 - rgb.g) + "," + (255 - rgb.b) + ")";
    ctx.fillRect(0, 0, canvasTarget.width, canvasTarget.height);
    ctx.fillStyle = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
    ctx.fillRect(2, 2, canvasTarget.width - 4, canvasTarget.height - 4);
  }
  function onCircle(
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) {
    if (
      ("touches" in e && e.touches.length === 0) ||
      ("buttons" in e && e.buttons == 0)
    )
      return;
    if (!e.target) return;
    const trianglePoinst = This.trianglePoint;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const mouseX =
      "clientX" in e ? e.clientX - rect.left : e.touches[0].clientX;
    const mouseY = "clientY" in e ? e.clientY - rect.top : e.touches[0].clientY;

    const node = refCircle.current!;
    const centerX = node.offsetWidth / 2;
    const centerY = node.offsetHeight / 2;
    const x = mouseX - centerX;
    const y = mouseY - centerY;
    let length = Math.sqrt(x * x + y * y);
    if (length > This.triangleSize / 2) length = This.triangleSize / 2 / length;
    else length = 1;
    const mx = centerX + x * length;
    const my = centerY + y * length;

    const pointer = refPointer.current!;
    pointer.style.left = mx - pointer.offsetWidth / 2 + "px";
    pointer.style.top = my - pointer.offsetHeight / 2 + "px";
    const r = getColor(mx, my, trianglePoinst[0].x, trianglePoinst[0].y);
    const g = getColor(mx, my, trianglePoinst[1].x, trianglePoinst[1].y);
    const b = getColor(mx, my, trianglePoinst[2].x, trianglePoinst[2].y);
    This.color = getRGBtoColor({ r, g, b });
    setColorLevel(1);
    drawColorLevel();
  }
  function setColorLevel(level: number, update?: boolean) {
    This.colorLevel = level;
    const length = refLevel.current!.offsetHeight;
    const pointer = refLevelPointer.current!;
    pointer.style.top =
      -pointer.offsetHeight + length - (length * level) / 4 + "px";

    const { r, g, b } = getRGB(This.color);
    const color2 = getRGBtoColor({
      r: Math.min(Math.round(r * level), 255),
      g: Math.min(Math.round(g * level), 255),
      b: Math.min(Math.round(b * level), 255),
    });

    if (color !== color2) {
      This.update = update;
      onChange(color2);
    } else if (update !== false) This.update = true;
    setColorTarget();
  }
  function onColorLevel(
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) {
    if (
      ("touches" in e && e.touches.length === 0) ||
      ("buttons" in e && e.buttons == 0)
    )
      return;
    const target = "touches" in e ? e.touches[0].target : e.target;
    if (!(target instanceof HTMLCanvasElement)) return;
    const rect = target.getBoundingClientRect();
    const mouseY = "clientY" in e ? e.clientY - rect.top : e.touches[0].clientY;

    const length = refLevel.current!.offsetHeight / 2;
    const level = 2 - ((mouseY - length) / length) * 2;
    setColorLevel(level, false);
  }
  function drawColorLevel() {
    const { r, g, b } = getRGB(This.color);
    const canvasLevel = refLevel.current!;
    canvasLevel.height = canvasLevel.offsetHeight;
    const ctxLevel = canvasLevel.getContext("2d");
    if (!ctxLevel) return false;
    const grad = ctxLevel.createLinearGradient(
      0,
      canvasLevel.offsetHeight,
      0,
      0
    );
    grad.addColorStop(1, `rgb(${r * 4},${g * 4},${b * 4})`);
    grad.addColorStop(1 / 4, `rgb(${r},${g},${b})`);
    grad.addColorStop(0, `rgb(0,0,0)`);
    ctxLevel.fillStyle = grad;
    ctxLevel.fillRect(0, 0, canvasLevel.width, canvasLevel.height);
  }
  function setColor(color: number) {
    const pointer = refPointer.current!;
    const node = refCircle.current!;
    const centerX = node.offsetWidth / 2;
    const centerY = node.offsetHeight / 2;
    const { r, g, b } = getRGB(color);
    const length = Math.sqrt(r * r + g * g + b * b);
    const r2 = !length ? 0 : r / length;
    const g2 = !length ? 0 : g / length;
    const b2 = !length ? 0 : b / length;
    const p = This.trianglePoint;
    const x =
      ((p[0].x - centerX) * r2 +
        (p[1].x - centerX) * g2 +
        (p[2].x - centerX) * b2) /
      1;
    const y =
      ((p[0].y - centerY) * r2 +
        (p[1].y - centerY) * g2 +
        (p[2].y - centerY) * b2) /
      1;
    pointer.style.left = centerX + x - pointer.offsetWidth / 2 + "px";
    pointer.style.top = centerY + y - pointer.offsetHeight / 2 + "px";
    if (This.update === false) {
      This.update = true;
    } else {
      This.color = color;
      drawColorLevel();
    }
    setColorTarget();
  }
};
