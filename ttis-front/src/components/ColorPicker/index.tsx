import { JSWindow } from "@jswf/react";
import { ColorPickerView } from "./ColorPickerView";
import { ColorPallet } from "./ColorPallet";
import { useState, useEffect } from "react";

interface Props {
  onChange?: (color: number) => void;
}
export const getRGB = (color: number) => ({
  r: (color / 256 / 256) % 256,
  g: (color / 256) % 256,
  b: color % 256,
});
export const getRGBtoColor = ({
  r,
  g,
  b,
}: {
  r: number;
  g: number;
  b: number;
}) => Math.floor(r) * 256 * 256 + Math.floor(g) * 256 + Math.floor(b);

export const ColorPickerWindow = ({ onChange }: Props) => {
  const [color, setColor] = useState(0xffffff);
  useEffect(() => {
    onChange && onChange(color);
  }, [color]);
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
          width: 130px;
        }
      `}</style>
      <JSWindow title="ColorPicker" width={400} height={300}>
        <div className="root">
          <div className="left">
            <ColorPallet
              color={color}
              onChange={(c) => {
                setColor(c);
              }}
            />
          </div>
          <div className="right">
            <ColorPickerView
              color={color}
              onChange={(c) => {
                setColor(c);
              }}
            />
          </div>
        </div>
      </JSWindow>
    </>
  );
};
