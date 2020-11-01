import { JSWindow, WindowState } from '@jswf/react';

interface Props {
  title: string;
  message: string;
  onClose: () => void;
  onEnter: (value: boolean) => void;
  defaultValue?: string;
}

export const VericationWindow = ({ title, message, onClose, onEnter }: Props) => {
  return (
    <div className="root">
      <style jsx>{`
      .root{
        position: fixed;
        z-index: 1;
      }
      .client{
        margin: 16px 5%;
        width:90%;
        height:32px;
        position: absolute;
        display: flex;
        flex-direction: column;
      }
      .message{
          margin-bottom: 16px; 
      }
      button{
        border-radius: 4px;
        margin: 4px;
        padding: 2px;
      }
      }`}</style>
      <JSWindow
        height={200}
        title={title}
        onUpdate={(params) => {
          params.realWindowState === WindowState.HIDE && onClose();
        }}
      >
        <div className="client">
          <div className="message">{message}</div>
          <button onClick={() => onEnter(true)}>OK</button>
          <button onClick={() => onEnter(false)}>Cancel</button>
        </div>
      </JSWindow>
    </div>
  );
};
