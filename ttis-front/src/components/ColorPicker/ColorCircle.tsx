import { useRef, useEffect } from "react";
import { getRGBtoColor, getRGB } from ".";
import ResizeObserver from "react-resize-observer";

interface Property {
  triangleSize: number;
  trianglePoint: { x: number; y: number }[];
}
interface Props {
  color: number;
  onChange: (color: number) => void;
}
export const ColorCircle = ({ color, onChange }: Props) => {
  const refCircle = useRef<HTMLCanvasElement>(null);
  const refPointer = useRef<HTMLDivElement>(null);
  const This = useRef<Property>({
    trianglePoint: [],
    triangleSize: 100,
  }).current;

  useEffect(() => {
    setColor(color);
  }, [color]);

  return (
    <>
      <style jsx>{`
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
      `}</style>
      <div className="colorCircle">
        <canvas
          ref={refCircle}
          onMouseMove={onCircle}
          onMouseDown={onCircle}
          onTouchMove={onCircle}
          onTouchStart={onCircle}
        ></canvas>
        <div ref={refPointer} className="pointer" />
        <ResizeObserver
          onResize={() => {
            drawCircle();
          }}
        />
      </div>
    </>
  );
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
    onChange(getRGBtoColor({ r, g, b }));
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
    onChange(color)
  }
};
