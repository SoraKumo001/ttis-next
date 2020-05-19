import { JSWindow } from "@jswf/react";
import { HtmlEditableView } from "./EditableView";
import { useRef } from "react";
import { useRouter } from "next/router";
import { useQuery, useApolloClient } from "react-apollo";
import {
  QUERY_CONTENTS,
  UPDATE_CONTENTS,
  CREATE_CONTENTS,
  DELETE_CONTENTS,
  VECTOR_CONTENTS,
} from "./graphql";
import {
  ContentsQueryVariables,
  ContentsQuery,
  UpdateContentsMutation,
  UpdateContentsMutationVariables,
  CreateContentsMutation,
  CreateContentsMutationVariables,
  ContentsListQuery,
  DeleteContentsMutation,
  DeleteContentsMutationVariables,
  Contents,
  ContentsVector,
  VectorContentsMutation,
  VectorContentsMutationVariables,
} from "@generated/graphql";
import {
  getRouterQuery,
  addRouterQuery,
  setRouterPath,
  removeRouterQuery,
} from "../../libs/CustomRouter";
import { createAutoClose } from "@components/Footer";
import dateFormat from "dateformat";
import { CONTENTS_TREE } from "@components/ContentsTreeView/graphql";
import { ContentsPageQuery } from "../../generated/graphql";
import { QUERY_CONTENTS_PAGE } from "@components/ContentsView/graphql";

interface Property {
  value: string;
}
export const ContentsEditWindow = () => {
  const router = useRouter();
  const { edit } = getRouterQuery(router);

  const { loading, data } = useQuery<ContentsQuery, ContentsQueryVariables>(
    QUERY_CONTENTS,
    { variables: { id: edit?.toString() || "" } }
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

  if (!edit) return null;
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
        .panel > div,
        label {
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
      <JSWindow
        width={600}
        height={500}
        title="ContentsEdit"
        onUpdate={createAutoClose(router, "edit")}
      >
        <div className="root" key={contents?.id || 0}>
          <div className="panel">
            <button onClick={onSave}>Save</button>
            <button>Preview</button>
            <label>
              Visible
              <input
                ref={refVisible}
                type="checkbox"
                defaultChecked={contents?.visible !== false}
              />
            </label>

            <div>{dateFormat(contents?.updateAt, "yyyy年mm月dd日")}</div>
            <div>{dateFormat(contents?.updateAt, "HH時MM分ss秒")}</div>
            <button onClick={onDelete}>Delete</button>
          </div>
          <div className="panel">
            <select
              ref={refPage}
              defaultValue={contents?.page ? "true" : "false"}
            >
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
          <div className="panel">
            <button onClick={onCreateNext}>Create Next</button>
            <button onClick={onCreateChild}>Create Child</button>
            <button onClick={onMoveUp}>↑</button>
            <button onClick={onMoveDown}>↓</button>
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
        page: refPage.current?.value === "true",
        visible: refVisible.current!.checked,
        title_type: parseInt(refTitleType.current!.value),
        title: refTitle.current!.value,
        value_type: refValueType.current!.value,
        value: This.value,
      },
    });
  }
  function onDelete() {
    if (!contents) return;
    client.mutate<DeleteContentsMutation, DeleteContentsMutationVariables>({
      mutation: DELETE_CONTENTS,
      variables: {
        id: contents.id,
      },
      update: async () => {
        await setRouterPath(router, `/page/${contents.parentId}/`, {});
        //キャッシュの操作
        client.resetStore();
      },
    });
  }
  function onMoveUp() {
    if (!contents) return;
    client.mutate<VectorContentsMutation, VectorContentsMutationVariables>({
      mutation: VECTOR_CONTENTS,
      variables: {
        id: contents.id,
        vector: -1,
      },
      update: async () => {
        // await setRouterPath(router, `/page/${contents.parentId}/`, {});
        // //キャッシュの操作
        // client.resetStore();
      },
    });
  }
  function onMoveDown() {
    if (!contents) return;
    client.mutate<VectorContentsMutation, VectorContentsMutationVariables>({
      mutation: VECTOR_CONTENTS,
      variables: {
        id: contents.id,
        vector: 1,
      },
      update: async () => {
        // await setRouterPath(router, `/page/${contents.parentId}/`, {});
        // //キャッシュの操作
        // client.resetStore();
      },
    });
  }
  function onCreateNext() {
    if (!contents) return;
    client.mutate<CreateContentsMutation, CreateContentsMutationVariables>({
      mutation: CREATE_CONTENTS,
      variables: {
        parent: contents.id,
        vector: ContentsVector.Next,
        page: false,
        title_type: Math.min(parseInt(refTitleType.current!.value) + 1, 2),
        title: "New",
      },
      update: (_, result) => {
        client.resetStore();
        const contents = result.data?.createContents;
        if (contents) addRouterQuery(router, { edit: contents.id });
      },
    });
  }
  function onCreateChild() {
    if (!contents) return;
    client.mutate<CreateContentsMutation, CreateContentsMutationVariables>({
      mutation: CREATE_CONTENTS,
      variables: {
        parent: contents.id,
        vector: ContentsVector.ChildLast,
        page: false,
        title_type: Math.min(parseInt(refTitleType.current!.value) + 1, 2),
        title: "New",
      },
      update: (_, result) => {
        client.resetStore();
        const contents = result.data?.createContents;
        if (contents) addRouterQuery(router, { edit: contents.id });
      },
    });
  }
};
