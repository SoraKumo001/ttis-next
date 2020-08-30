import { SplitView } from "@jswf/react";
import { JSWindow, ListView, ListHeaders, ListHeader } from "@jswf/react";
import { DirTreeView } from "./dirTree";
import { useApolloClient } from "react-apollo";
import { UPLOAD_FILE } from "./graphql";
import {
  UploadFileMutation,
  UploadFileMutationVariables,
} from "../../generated/graphql";

export const FileWindow = () => {
  const client = useApolloClient();
  return (
    <JSWindow title="File Window" width={640}>
      <SplitView type="we">
        <DirTreeView />
        <ListView
          draggable={true}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            console.log(file)
            client.mutate<UploadFileMutation, UploadFileMutationVariables>({
              mutation: UPLOAD_FILE,
              variables: {
                file:{a:"aaaaa"}
              },
            });
          }}
        >
          <ListHeaders>
            <ListHeader width={200}>File Name</ListHeader>
            <ListHeader width={80}>Size</ListHeader>
            <ListHeader>Update</ListHeader>
          </ListHeaders>
        </ListView>
      </SplitView>
    </JSWindow>
  );
};
