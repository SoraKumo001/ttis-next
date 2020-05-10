import { useRef, useEffect, useState } from "react";
import { ColorCircle } from "./ColorCircle";
import { getRGB, getRGBtoColor } from ".";
import { ColorLevel } from "./ColorLevel";

interface Props {
  color: number;
  onChange: (color: number) => void;
}

export const ColorPickerView = ({ color, onChange }: Props) => {
  const [levelColor, setLevelColor] = useState(0xffffff);
  return (
    <>
      <style jsx>{`
        .root {
          width: 100%;
          height: 100%;
          display: flex;
          position: absolute;
        }
      `}</style>

      <div className="root">
        <ColorLevel
          color={color}
          levelColor={levelColor}
          onChange={(color) => {
            onChange(color);
          }}
        />
        <ColorCircle
          color={color}
          onChange={(color) => {
            setLevelColor(color);
          }}
        />
      </div>
    </>
  );
};
