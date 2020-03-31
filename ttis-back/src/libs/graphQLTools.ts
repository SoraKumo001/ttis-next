import { GraphQLResolveInfo, FieldNode } from "graphql";
interface GraphQLFeald {
  [key: string]: GraphQLFeald | true;
}
export const getFields = (info: GraphQLResolveInfo) => {
  const createFields = (nodes: FieldNode[]) => {
    const fealds: GraphQLFeald = {};
    nodes.filter(n => n.name.value !== '__typename').forEach(n => {
      fealds[n.name.value] =
        (n.selectionSet &&
          createFields(n.selectionSet.selections as FieldNode[])) ||
        true;
    });
    return fealds;
  };
  return createFields(
    info.fieldNodes[0].selectionSet.selections as FieldNode[]
  );
};