import { JSWindow, SplitView } from "@jswf/react";
import { HtmlEditableView } from "./EditableView";
import { useState } from "react";

interface State {
  date: Date;
  title_type: number;
  title: string;
  value: string;
}

export const ContentsEditWindow = () => {
  const [state, setState] = useState<State>({
    date: new Date(),
    title_type: 1,
    title: "",
    value: "",
  });
  return (
    <>
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }
        .editor {
          position: relative;
          flex: 1;
        }

        .panel {
          user-select: none;
          display: flex;
        }
        .panel > * {
          margin: 1px;
        }
        .panel > button {
          border-radius: 5px;
        }
        .panel > div {
          background-color: #cccccc;
          border-radius: 3px;
          padding: 0.3em;
        }
      `}</style>
      <JSWindow width={600} height={500} title="ContentsEdit">
        <div className="root">
          <div className="panel">
            <button>Preview</button>
            <button>Save</button>
            <div>
              <label>
                Visible
                <input type="checkbox" />
              </label>
            </div>
            <div>{new Date().toLocaleDateString()}</div>
            <div>{new Date().toLocaleTimeString()}</div>
            <button>Delete</button>
          </div>
          <div className="panel">
            <select>
              <option>Page</option>
              <option>Item</option>
            </select>
            <select>
              <option>HTML</option>
              <option>TEXT</option>
            </select>

            <select>
              <option>None</option>
              <option>Big</option>
              <option>Normal</option>
              <option>Small</option>
            </select>
            <input style={{ flex: 1 }} />
          </div>
          <div className="editor">
            <HtmlEditableView></HtmlEditableView>
          </div>
        </div>
      </JSWindow>
    </>
  );
};
