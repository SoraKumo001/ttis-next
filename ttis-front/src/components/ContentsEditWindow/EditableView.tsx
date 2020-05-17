import { SplitView, WindowState } from "@jswf/react";
import { useRef, useEffect, useState, FC } from "react";
import { ColorSettingWindow } from "./ColorWindow";

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
      this.handle = 0;
    }
    this.handle = window.setTimeout((): void => {
      this.handle = 0;
      this.proc();
    }, timeout || this.timeout);
  }
  public cancel() {
    if (this.handle) {
      window.clearTimeout(this.handle);
      this.handle = 0;
    }
  }
}

interface Property {
  htmlProc: TimerProc;
}
interface Props {
  defaultValue?: string;
  onChange: (value: string) => void;
}
export const HtmlEditableView: FC<Props> = ({ defaultValue, onChange }) => {
  const This = useRef<Property>({
    htmlProc: new TimerProc(onHtmlInput, 500),
  }).current;
  const refTextArea = useRef<HTMLTextAreaElement>(null);
  const refHtmlArea = useRef<HTMLDivElement>(null);
  const [textColor, setTextColor] = useState(false);
  const [backColor, setBackColor] = useState(false);

  useEffect(() => {
    This.htmlProc.call();
    return () => This.htmlProc.cancel();
  }, []);
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
          padding: 0.2em;
        }
        .textView {
          width: 100%;
          height: 100%;
        }
        .panel {
          user-select: none;
          display: flex;
          padding: 0.2em;
        }
        .panel > * {
          margin: 1px;
        }
        .panel button {
          user-select: none;
        }
        .color {
          display: inline-block;
          height: 0.8em;
          width: 0.8em;
          box-sizing: border-box;
          border: 1 solid black;
          background-color: black;
        }
        label {
          display: inline-block;
          border-radius: 0.5em;
          border: solid 1px gray;
          box-sizing: border-box;
          padding: 0.2em;
        }
      `}</style>
      <div className="root">
        <div className="panel">
          <button onClick={onClear}>Clear</button>
          <button onClick={onBold}>
            <b>Bold</b>
          </button>
          <button onClick={onItalic}>
            <i>Italic</i>
          </button>
          <button onClick={onUnder}>
            <u>Under</u>
          </button>
          <button onClick={onStrike}>
            <s>Strike</s>
          </button>
          <button onClick={onIndentation}>Indentation</button>
          <button onClick={onClear}>Link</button>
          <button onClick={onDiv}>Div</button>
          <button onClick={onP}>P</button>
          <label onClick={() => setTextColor(true)}>
            Text <div className="color" />
          </label>
          <label onClick={() => setBackColor(true)}>
            Back <div className="color" />
          </label>
        </div>
        <div className="split">
          <SplitView>
            <textarea
              ref={refTextArea}
              className="textView"
              defaultValue={defaultValue}
            />

            <div
              ref={refHtmlArea}
              className="htmlView"
              contentEditable="true"
              onInput={() => {
                This.htmlProc.call();
              }}
              dangerouslySetInnerHTML={{
                __html: defaultValue!,
              }}
            ></div>
          </SplitView>
        </div>
      </div>
      {textColor && (
        <ColorSettingWindow
          title="Text Color"
          onUpdate={(p) =>
            p.realWindowState === WindowState.HIDE && setTextColor(false)
          }
          onChange={onTextColor}
        />
      )}
      {backColor && (
        <ColorSettingWindow
          title="Background Color"
          onUpdate={(p) =>
            p.realWindowState === WindowState.HIDE && setBackColor(false)
          }
          onChange={onBackColor}
        />
      )}
    </>
  );
  function onHtmlInput() {
    const value = refHtmlArea.current!.innerHTML;
    onChange(value);
    refTextArea.current!.value = value;
  }
  function onIndentation() {
    insertTag("div", { marginLeft: "4ex" });
  }
  function onTextColor(color: number) {
    const htmlArea = refHtmlArea.current!;
    htmlArea.focus();
    document.execCommand("foreColor", false, color.toString(16));
    getSelection()?.removeAllRanges();
    This.htmlProc.call();
  }
  function onBackColor(color: number) {
    const htmlArea = refHtmlArea.current!;
    htmlArea.focus();
    document.execCommand("backColor", false, color.toString(16));
    getSelection()?.removeAllRanges();
    This.htmlProc.call();
  }
  function onBold() {
    const htmlArea = refHtmlArea.current!;
    htmlArea.focus();
    document.execCommand("bold");
    This.htmlProc.call();
  }
  function onItalic() {
    const htmlArea = refHtmlArea.current!;
    htmlArea.focus();
    document.execCommand("italic");
    This.htmlProc.call();
  }
  function onUnder() {
    const htmlArea = refHtmlArea.current!;
    htmlArea.focus();
    document.execCommand("underline");
    This.htmlProc.call();
  }
  function onStrike() {
    const htmlArea = refHtmlArea.current!;
    htmlArea.focus();
    document.execCommand("strikeThrough");
    This.htmlProc.call();
  }

  function onDiv() {
    insertTag("div");
  }
  function onP() {
    insertTag("p");
  }
  function insertTag(tag: string, style?: Partial<HTMLElement["style"]>) {
    const htmlArea = refHtmlArea.current!;
    htmlArea.focus();
    const sel = getSelection();
    if (!sel) return;
    const range = sel.getRangeAt(0);
    const f = range.cloneContents();
    range.deleteContents();
    const n = document.createElement(tag);
    if (style) {
      for (const [key, value] of Object.entries(style)) {
        n.style.setProperty(key, value as string);
      }
    }

    n.appendChild(f);
    range.insertNode(n);
    This.htmlProc.call();
  }
  function onClear() {
    const htmlArea = refHtmlArea.current!;
    htmlArea.focus();
    const sel = getSelection();

    const node = sel?.focusNode;
    if (!(node instanceof Text)) return;
    const parent = node.parentNode;
    if (!parent) return;
    const text = document.createTextNode(node.data);
    if (parent !== htmlArea) {
      parent.parentNode?.insertBefore(text, parent);
      parent.parentNode?.removeChild(parent);
    }
    This.htmlProc.call();
  }
};
