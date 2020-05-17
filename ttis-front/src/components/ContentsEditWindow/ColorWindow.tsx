import { ColorPickerView, Props } from "@components/ColorPicker";
import { JSWindow, WindowProps } from "@jswf/react";
import { useRef } from "react";

export const ColorSettingWindow = (props: Props & WindowProps) => {
  const This = useRef({ color: 0 }).current;
  const { onChange } = props;
  return (
    <>
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        button {
          padding: 0.2em;
          border-radius: 3px;
        }
      `}</style>
      <JSWindow title="ColorPicker" width={400} height={300} {...props} >
        <div className="root">
          <ColorPickerView onChange={(color) => (This.color = color)} />
          <button onClick={()=>onChange?.(This.color)}>OK</button>
        </div>
      </JSWindow>
    </>
  );
};
