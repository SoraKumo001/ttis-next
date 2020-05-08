import { JSWindow } from "@jswf/react";
import { ColorPickerView } from "./ColorPickerView";
import { useState } from "react";

const defaultColors = [
  0xffffff,
  0x000000,
  0x7f7f7f,
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
      colors[j] * 255 * 255 + colors[(j + 1) % 3] * 255 + colors[(j + 2) % 3]
    );
  }
}
function toHex(v: number) {
  return ("00000" + v.toString(16)).substr(-6);
}
export const ColorPickerWindow = () => {
  const [colors, setColors] = useState<number[]>(defaultColors);
  return (
    <>
      <style jsx>{`
        .root {
          display: flex;
          position: relative;
          height: 100%;
          width: 100%;
        }
        .right {
          flex: 1;
          position: relative;
        }
        .left {
          text-align: center;

          display: flex;
          flex-direction: column;
          width: 100px;
        }
        .inputs {
          padding: 2px;
        }
        input {
          width: 4ex;
          box-sizing: border-box;
        }
        .colors {
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
          border: solid 1px;
        }
      `}</style>
      <JSWindow title="ColorPicker" width={400} height={300}>
        <div className="root">
          <div className="left">
            <div className="inputs">
              <input maxLength={3} name="r" />,
              <input maxLength={3} name="g" />,
              <input maxLength={3} name="b" />
            </div>
            <div className="colors">
              {colors.map((color) => (
                <div
                  className="box"
                  style={{ backgroundColor: "#" + toHex(color) }}
                ></div>
              ))}
            </div>
          </div>
          <div className="right">
            <ColorPickerView />
          </div>
        </div>
      </JSWindow>
    </>
  );
};
