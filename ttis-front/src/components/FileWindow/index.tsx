import { SplitView } from "@jswf/react";
import { JSWindow, ListView, ListHeaders, ListHeader } from "@jswf/react";
import { DirTreeView } from "./dirTree";

export const FileWindow = () => {
  return (
    <JSWindow title="File Window" width={640}>
      <SplitView type="we">
        <DirTreeView />
        <ListView>
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
