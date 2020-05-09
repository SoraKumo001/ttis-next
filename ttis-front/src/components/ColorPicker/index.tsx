import { JSWindow } from "@jswf/react";
import { ColorPickerView } from "./ColorPickerView";
import { ColorPallet } from "./ColorPallet";
import { useState } from "react";

interface Props {
  onChange?: (color: number) => void;
}

export const ColorPickerWindow = ({ onChange }: Props) => {
  const [color, setColor] = useState(0xffffff);
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
                if (c !== color) {
                  setColor(c);
                  onChange && onChange(c);
                }
              }}
            />
          </div>
          <div className="right">
            <ColorPickerView
              color={color}
              onChange={(c) => {
                if (c !== color) {
                  setColor(c);
                  onChange && onChange(c);
                }
              }}
            />
          </div>
        </div>
      </JSWindow>
    </>
  );
};
