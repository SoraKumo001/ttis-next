import { SplitView } from "@jswf/react";
import { useRef, useEffect } from "react";

export class TimerProc {
  private proc: () => void;
  private handle?: number;
  private timeout: number;
  public constructor(proc: () => void, timeout: number) {
    this.proc = proc;
    this.timeout = timeout;
  }
  public call(timeout?: number): void {
    if (this.handle) {
      window.clearTimeout(this.handle);
    }
    this.handle = window.setTimeout((): void => {
      this.handle = 0;
      this.proc();
    }, timeout || this.timeout);
  }
}

interface Property {
  htmlProc: TimerProc;
}

export const HtmlEditableView = () => {
  const This = useRef<Property>({
    htmlProc: new TimerProc(onHtmlInput, 500),
  }).current;
  const refTextArea = useRef<HTMLTextAreaElement>(null);
  const refHtmlArea = useRef<HTMLDivElement>(null);
  return (
    <>
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }
        .split {
          flex: 1;
          position: relative;
        }
        .htmlView {
          width: 100%;
          height: 100%;
        }
        .textView {
          width: 100%;
          height: 100%;
        }
        .panel {
          user-select: none;
          display: flex;
        }
        .panel > * {
          margin: 1px;
        }
        .panel button {
          user-select: none;
        }
      `}</style>
      <div className="root">
        <div className="panel">
          <button onClick={onClear}>clear</button>
        </div>
        <div className="split">
          <SplitView>
            <textarea ref={refTextArea} className="textView"></textarea>
            <div
              ref={refHtmlArea}
              className="htmlView"
              contentEditable="true"
              onInput={() => {
                This.htmlProc.call();
              }}
              dangerouslySetInnerHTML={{
                __html: `abcd<font color="red">fdfsa</font>eeee`,
              }}
            ></div>
          </SplitView>
        </div>
      </div>
    </>
  );
  function onHtmlInput() {
    refTextArea.current!.value = refHtmlArea.current!.innerHTML;
  }
  function onClear() {
    const sel = getSelection();
    console.log(
      sel?.focusNode?.parentNode?.parentNode,
      sel?.focusNode?.parentNode
    );
    const node = sel?.focusNode as Text;
    if (!node) return;
    const parent = node.parentNode;
    if (!parent) return;
    const text = document.createTextNode(node.data);
    parent.parentNode?.insertBefore(text, parent);
    parent.parentNode?.removeChild(parent);
  }
};
