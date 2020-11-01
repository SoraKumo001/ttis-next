import { JSWindow, WindowProps } from '@jswf/react';
import { ColorPallet } from './ColorPallet';
import { useState, useEffect } from 'react';
import { ColorLevel } from './ColorLevel';
import { ColorCircle } from './ColorCircle';

export interface Props {
  onChange?: (color: number) => void;
}
export const getRGB = (color: number) => ({
  r: (color / 256 / 256) % 256,
  g: (color / 256) % 256,
  b: color % 256,
});
export const getRGBtoColor = ({ r, g, b }: { r: number; g: number; b: number }) =>
  Math.floor(r) * 256 * 256 + Math.floor(g) * 256 + Math.floor(b);

export const ColorPickerView = (props: Props) => {
  const [color, setColor] = useState(0xffffff);
  const [levelColor, setLevelColor] = useState(0xffffff);
  const { onChange } = props;
  useEffect(() => {
    onChange && onChange(color);
  }, [color]);
  return (
    <>
      <style jsx>{`
        .root {
          display: flex;
          flex: 1;
          position: relative;
          height: 100%;
          width: 100%;
          min-height: 0;
        }
        .right {
          flex: 1;
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
        }
        .left {
          text-align: center;

          display: flex;
          flex-direction: column;
          width: 130px;
        }
      `}</style>

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
          <ColorLevel
            color={color}
            levelColor={levelColor}
            onChange={(color) => {
              setColor(color);
            }}
          />
          <ColorCircle
            color={color}
            onChange={(color) => {
              setLevelColor(color);
            }}
          />
        </div>
      </div>
    </>
  );
};

export const ColorPickerWindow = (props: Props & WindowProps) => {
  const { onChange } = props;
  return (
    <JSWindow title="ColorPicker" width={400} height={300} {...props}>
      <ColorPickerView onChange={onChange} />
    </JSWindow>
  );
};
