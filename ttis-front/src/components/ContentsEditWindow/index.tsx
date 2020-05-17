import { JSWindow, SplitView } from "@jswf/react";
import { HtmlEditableView } from "./EditableView";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useApolloClient } from "react-apollo";
import { QUERY_CONTENTS, UPDATE_CONTENTS } from "./graphql";
import { ContentsQueryVariables, ContentsQuery } from "@generated/graphql";
import {
  UpdateContentsMutation,
  UpdateContentsMutationVariables,
} from "../../../../ttis-back/graphql/types";

interface Property {
  value: string;
}
export const ContentsEditWindow = () => {
  const router = useRouter();
  const { edit } = router.query;
  if (!edit) return null;

  const { loading, data } = useQuery<ContentsQuery, ContentsQueryVariables>(
    QUERY_CONTENTS,
    { variables: { id: edit.toString() } }
  );
  const client = useApolloClient();
  const contents = data?.contents;
  const This = useRef({ value: "" }).current;
  const message = loading ? "Loading" : contents?.id;
  const refVisible = useRef<HTMLInputElement>(null);
  const refTitle = useRef<HTMLInputElement>(null);
  const refTitleType = useRef<HTMLSelectElement>(null);
  const refPage = useRef<HTMLSelectElement>(null);
  const refValueType = useRef<HTMLSelectElement>(null);

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
        .message {
          border: #cccccc solid 1px;
          padding: 0.05em;
          min-height: 1em;
        }
      `}</style>
      <JSWindow width={600} height={500} title="ContentsEdit">
        <div className="root" key={contents?.id || 0}>
          <div className="panel">
            <button onClick={onSave}>Save</button>
            <button>Preview</button>

            <div>
              <label>
                Visible
                <input
                  ref={refVisible}
                  type="checkbox"
                  defaultChecked={contents?.visible !== false}
                />
              </label>
            </div>
            <div>{new Date(contents?.updateAt).toLocaleDateString()}</div>
            <div>{new Date(contents?.updateAt).toLocaleTimeString()}</div>
            <button>Delete</button>
          </div>
          <div className="panel">
            <select ref={refPage} defaultValue={contents?.page ? "true" : "false"}>
              <option value="true">Page</option>
              <option value="false">Item</option>
            </select>
            <select ref={refValueType} defaultValue={contents?.value_type}>
              <option value="HTML">HTML</option>
              <option value="TEXT">TEXT</option>
            </select>

            <select ref={refTitleType} defaultValue={contents?.title_type}>
              <option value="0">None</option>
              <option value="1">Big</option>
              <option value="2">Normal</option>
              <option value="3">Small</option>
            </select>
            <input
              ref={refTitle}
              style={{ flex: 1 }}
              defaultValue={contents?.title}
            />
          </div>
          <div className="editor">
            <HtmlEditableView
              defaultValue={contents?.value}
              onChange={(value) => (This.value = value)}
            ></HtmlEditableView>
          </div>
          <div className="message">{message}</div>
        </div>
      </JSWindow>
    </>
  );
  function onSave() {
    if (!contents) return;

    client.mutate<UpdateContentsMutation, UpdateContentsMutationVariables>({
      mutation: UPDATE_CONTENTS,
      variables: {
        id: contents.id,
        page:refPage.current?.value === 'true',
        visible: refVisible.current!.checked,
        title_type:parseInt(refTitleType.current!.value),
        title: refTitle.current!.value,
        value_type:refValueType.current!.value,
        value:This.value
      },
    });
  }
};
