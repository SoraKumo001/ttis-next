import { useRef, useEffect } from "react";
import { getRGB, getRGBtoColor } from ".";

interface Property {
  colorLevel: number;
  update?: boolean;
  color: number;
  updateColor:number;
}
interface Props {
  color: number;
  levelColor: number;
  onChange: (color: number) => void;
}
export const ColorLevel = ({ color, levelColor, onChange }: Props) => {
  const refLevel = useRef<HTMLCanvasElement>(null);
  const refTarget = useRef<HTMLCanvasElement>(null);
  const refLevelPointer = useRef<HTMLDivElement>(null);
  const This = useRef<Property>({
    colorLevel: 1,
    color: 0xffffff,
    updateColor:-1,
  }).current;

  useEffect(() => {
    setColorLevel(1);
  }, []);
  useEffect(() => {
    setColor(levelColor);
    if(This.color === levelColor)
      setColorLevel(1,false);
  }, [levelColor]);
  return (
    <>
      <style jsx>{`
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
    </>
  );
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
      if(update === false)
        This.updateColor = color2;
      onChange(color2);
    } else if (update !== false) This.update = true;
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

  function setColor(color: number) {
    if (This.update === false) {
      This.update = true;
    } else {
      if(This.updateColor !== color)
        This.color = color;
      drawColorLevel();
    }
    setColorTarget();
  }
};
