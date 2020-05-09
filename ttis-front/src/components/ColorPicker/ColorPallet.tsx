import { useState, useRef, useEffect } from "react";
const defaultColors = [
  0xffffff,
  0xffffff,
  0xffffff,
  0xffffff,
  0xffffff,
  0x000000,
  0x3f3f3f,
  0x7f7f7f,
  0xffff00,
  0xff00ff,
  0x00ffff,
  0x7f7f00,
  0x7f007f,
  0x007f7f,
];
const getColorPattern = (v: number) => [
  v > 3 ? 127 : 255,
  v % 2 ? 63 : 0,
  v % 4 > 1 ? 63 : 0,
];

for (let j = 0; j < 3; j++) {
  for (let i = 0; i < 8; i++) {
    const colors = getColorPattern(i);
    defaultColors.push(
      colors[j] * 256 * 256 + colors[(j + 1) % 3] * 256 + colors[(j + 2) % 3]
    );
  }
}
function toHex(v: number) {
  return ("00000" + v.toString(16)).substr(-6);
}

interface Props {
  color: number;
  onChange: (color: number) => void;
}

export const ColorPallet = ({ color, onChange }: Props) => {
  const This = useRef<{ index: number; color: number }>({
    index: 0,
    color: 0xffffff,
  }).current;
  const [colors, setColors] = useState<number[]>(defaultColors);
  const [input0, setInput0] = useState(255);
  const [input1, setInput1] = useState(255);
  const [input2, setInput2] = useState(255);
  useEffect(() => {
    setColor(color);
  }, [color]);

  return (
    <>
      <style jsx>{`
        .inputs {
          padding: 2px;
        }
        input {
          width: 5ex;
          box-sizing: border-box;
        }
        .colors {
          flex: 1;
          border-top: solid 2px;
          overflow-y: scroll;
          font-size: 0;
          text-align: center;
        }
        .box {
          box-sizing: border-box;
          display: inline-block;
          width: 24px;
          height: 24px;
          margin: 1px;
          border: inset gray 1px;
          cursor: pointer;
        }
        .box:hover {
          border-style: dashed;
        }
        .box#select {
          border: outset 2px red;
        }
      `}</style>
      <div className="inputs">
        <input
          maxLength={3}
          name="r"
          value={input0}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            setInput0(isNaN(v) ? 0 : v);
          }}
        />
        ,
        <input
          maxLength={3}
          name="g"
          value={input1}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            setInput1(isNaN(v) ? 0 : v);
          }}
        />
        ,
        <input
          maxLength={3}
          name="b"
          value={input2}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            setInput2(isNaN(v) ? 0 : v);
          }}
        />
      </div>
      <div className="colors">
        {colors.map((color, index) => (
          <div
            key={index}
            id={!index ? "select" : undefined}
            onClick={(e) =>
              onSelectColor(e.currentTarget as HTMLElement, index, color)
            }
            className="box"
            style={{ backgroundColor: "#" + toHex(color) }}
          ></div>
        ))}
      </div>
      <button onClick={onReset}>Reset</button>
    </>
  );
  function onSelectColor(node: HTMLElement, index: number, color: number) {
    Array.from(node.parentNode!.querySelectorAll("#select")).forEach(
      (node) => (node.id = "")
    );
    node.id = "select";
    This.index = index;
    setColor(color);
  }
  function setColor(color: number) {
    setInput0(Math.floor(color / 256 / 256));
    setInput1(Math.floor((color / 256) % 256));
    setInput2(Math.floor(color % 256));
    updateColor(color);
  }
  function updateColor(color?: number) {
    if (color === undefined) color = input0 * 256 * 256 + input1 * 256 + input2;
    if (colors[This.index] !== color) {
      const c = [...colors];
      c[This.index] = color;
      setColors(c);
    }
    if (This.color !== color) {
      This.color = color;
      onChange(color);
    }
  }
  function onReset() {
    const c = [...defaultColors];
    for (let i = 0; i < 4; i++) c[i] = colors[i];
    setColors(c);
  }
};
