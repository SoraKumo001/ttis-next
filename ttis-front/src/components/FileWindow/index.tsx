import { SplitView } from "@jswf/react";
import {
  JSWindow,
  TreeView,
  ListView,
  TreeItem,
  ListHeaders,
  ListHeader,
} from "@jswf/react";
export const FileWindow = () => {
  return (
    <JSWindow title="File Window" width={640}>
      <SplitView type="we">
        <TreeView>
          <TreeItem label="Root" />
        </TreeView>
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
