import { JSWindow, SplitView } from "@jswf/react";
import { HtmlEditableView } from "./EditableView";
import { useState } from "react";

export const ContentsEditWindow = () => {
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
        .htmlView {
          width: 100%;
          height: 100%;
        }
        .textView {
          width: 100%;
          height: 100%;
        }
      `}</style>
      <JSWindow width={600} height={500} title="ContentsEdit">
        <div className="root">
          <div className="panel">
            <div>保存</div>
          </div>
          <div className="editor">
            <SplitView>
              <HtmlEditableView></HtmlEditableView>
              <textarea className="textView"></textarea>
            </SplitView>
          </div>
        </div>
      </JSWindow>
    </>
  );
};
