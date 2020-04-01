import { GraphQLResolveInfo, FieldNode } from 'graphql';
export type GraphQLFeald = (string | [string, GraphQLFeald])[];

export const getFields = (info: GraphQLResolveInfo) => {
  const createFields = (nodes: FieldNode[]) => {
    const fealds: GraphQLFeald = [];
    nodes
      .filter((n) => n.name.value !== '__typename')
      .forEach((n) => {
        fealds.push(
          n.selectionSet
            ? [
                n.name.value,
                createFields(n.selectionSet.selections as FieldNode[]),
              ]
            : n.name.value,
        );
      });
    return fealds;
  };
  return createFields(
    info.fieldNodes[0].selectionSet.selections as FieldNode[],
  );
};
