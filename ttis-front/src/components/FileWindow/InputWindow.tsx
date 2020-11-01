import { JSWindow, WindowState } from '@jswf/react';
import { useEffect, useRef } from 'react';

interface Props {
  title: string;
  onClose: () => void;
  onEnter: (value: string) => {};
  defaultValue?: string;
}

export const InputWindow = ({ title, onClose, onEnter, defaultValue }: Props) => {
  const refInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    refInput.current!.focus();
  }, []);
  return (
    <div className="root">
      <style jsx>{`
      .root{
        position: fixed;
        z-index:1;
      }
      .client{
        margin: 16px 5%;
        width:90%;
        height:32px;
        position: absolute;
        display: flex;
      }
      input{
        flex:1
      }
      }`}</style>
      <JSWindow
        height={120}
        title={title}
        onUpdate={(params) => {
          params.realWindowState === WindowState.HIDE && onClose();
        }}
      >
        <div className="client">
          <input
            ref={refInput}
            defaultValue={defaultValue}
            onKeyDown={(e) => {
              if (e.keyCode === 0xa) {
                onEnter(refInput.current!.value);
              }
            }}
          />
          <button onClick={() => onEnter(refInput.current!.value)}>Set</button>
        </div>
      </JSWindow>
    </div>
  );
};
