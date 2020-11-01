import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Contents = {
  __typename?: 'Contents';
  id: Scalars['ID'];
  priority: Scalars['Float'];
  visible?: Maybe<Scalars['Boolean']>;
  page: Scalars['Boolean'];
  title_type: Scalars['Int'];
  title: Scalars['String'];
  value_type: Scalars['String'];
  value: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Contents>>;
  parent: Contents;
  createAt: Scalars['DateTime'];
  updateAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  enable: Scalars['Boolean'];
  name: Scalars['String'];
  info: Scalars['String'];
};

export type Login = {
  __typename?: 'Login';
  token: Scalars['String'];
  user: User;
};

export type Files = {
  __typename?: 'Files';
  id: Scalars['ID'];
  kind: Scalars['Int'];
  name: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
  parent?: Maybe<Files>;
  children?: Maybe<Array<Files>>;
  size: Scalars['Int'];
  createAt: Scalars['DateTime'];
  updateAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  contentsTree: Contents;
  contentsList: Array<Contents>;
  contents?: Maybe<Contents>;
  users?: Maybe<Array<User>>;
  currentUser?: Maybe<Login>;
  dirTree?: Maybe<Array<Files>>;
  dirFiles?: Maybe<Array<Files>>;
};

export type QueryContentsTreeArgs = {
  level?: Maybe<Scalars['Int']>;
  visible?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
};

export type QueryContentsListArgs = {
  level?: Maybe<Scalars['Int']>;
  visible?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
};

export type QueryContentsArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryDirFilesArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContents?: Maybe<Contents>;
  updateContents?: Maybe<Contents>;
  deleteContents: Array<Scalars['ID']>;
  vectorContents: Array<Contents>;
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser: Scalars['Boolean'];
  deleteUsers: Scalars['Boolean'];
  login?: Maybe<Login>;
  createDir?: Maybe<Files>;
  renameFile?: Maybe<Files>;
  /** 複数ファイルの削除 */
  deleteFile?: Maybe<Scalars['Boolean']>;
  /** 複数ファイルの削除 */
  deleteFiles?: Maybe<Scalars['Boolean']>;
  /** ファイルの移動 */
  moveFile?: Maybe<Scalars['Boolean']>;
  /** ファイルのアップロード */
  uploadFile?: Maybe<Scalars['ID']>;
};

export type MutationCreateContentsArgs = {
  value?: Maybe<Scalars['String']>;
  value_type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  title_type?: Maybe<Scalars['Int']>;
  visible?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Boolean']>;
  vector?: Maybe<ContentsVector>;
  parent?: Maybe<Scalars['ID']>;
};

export type MutationUpdateContentsArgs = {
  value?: Maybe<Scalars['String']>;
  value_type?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  title_type?: Maybe<Scalars['Int']>;
  visible?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};

export type MutationDeleteContentsArgs = {
  id: Scalars['ID'];
};

export type MutationVectorContentsArgs = {
  vector: Scalars['Int'];
  id: Scalars['ID'];
};

export type MutationCreateUserArgs = {
  info?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  name: Scalars['String'];
};

export type MutationUpdateUserArgs = {
  info?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteUsersArgs = {
  ids: Array<Scalars['Int']>;
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  name: Scalars['String'];
};

export type MutationCreateDirArgs = {
  name: Scalars['String'];
  id: Scalars['ID'];
};

export type MutationRenameFileArgs = {
  name: Scalars['String'];
  id: Scalars['ID'];
};

export type MutationDeleteFileArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteFilesArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationMoveFileArgs = {
  id: Scalars['ID'];
  targetId: Scalars['ID'];
};

export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
  parentId: Scalars['ID'];
};

export enum ContentsVector {
  ChildFirst = 'CHILD_FIRST',
  ChildLast = 'CHILD_LAST',
  Before = 'BEFORE',
  Next = 'NEXT',
}

export type ContentsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ContentsQuery = { __typename?: 'Query' } & {
  contents?: Maybe<{ __typename?: 'Contents' } & FragmentContentsFragment>;
};

export type UpdateContentsMutationVariables = Exact<{
  id: Scalars['ID'];
  page?: Maybe<Scalars['Boolean']>;
  visible?: Maybe<Scalars['Boolean']>;
  title_type?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  value_type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
}>;

export type UpdateContentsMutation = { __typename?: 'Mutation' } & {
  updateContents?: Maybe<{ __typename?: 'Contents' } & FragmentContentsFragment>;
};

export type CreateContentsMutationVariables = Exact<{
  parent?: Maybe<Scalars['ID']>;
  vector?: Maybe<ContentsVector>;
  page?: Maybe<Scalars['Boolean']>;
  visible?: Maybe<Scalars['Boolean']>;
  title_type?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  value_type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
}>;

export type CreateContentsMutation = { __typename?: 'Mutation' } & {
  createContents?: Maybe<{ __typename?: 'Contents' } & FragmentContentsFragment>;
};

export type DeleteContentsMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeleteContentsMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteContents'>;

export type VectorContentsMutationVariables = Exact<{
  id: Scalars['ID'];
  vector: Scalars['Int'];
}>;

export type VectorContentsMutation = { __typename?: 'Mutation' } & {
  vectorContents: Array<{ __typename?: 'Contents' } & Pick<Contents, 'id' | 'priority'>>;
};

export type ContentsListQueryVariables = Exact<{ [key: string]: never }>;

export type ContentsListQuery = { __typename?: 'Query' } & {
  contentsList: Array<
    { __typename?: 'Contents' } & Pick<
      Contents,
      'id' | 'visible' | 'priority' | 'title' | 'page' | 'parentId'
    >
  >;
};

export type ContentsPageQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;

export type ContentsPageQuery = { __typename?: 'Query' } & {
  contentsList: Array<{ __typename?: 'Contents' } & FragmentContentsFragment>;
};

export type DirTreeQueryVariables = Exact<{ [key: string]: never }>;

export type DirTreeQuery = { __typename?: 'Query' } & {
  dirTree?: Maybe<
    Array<
      { __typename?: 'Files' } & Pick<
        Files,
        'id' | 'kind' | 'name' | 'parentId' | 'size' | 'createAt' | 'updateAt'
      >
    >
  >;
};

export type DirFilesQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DirFilesQuery = { __typename?: 'Query' } & {
  dirFiles?: Maybe<
    Array<
      { __typename?: 'Files' } & Pick<
        Files,
        'id' | 'kind' | 'name' | 'parentId' | 'size' | 'createAt' | 'updateAt'
      >
    >
  >;
};

export type CreateDirMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
}>;

export type CreateDirMutation = { __typename?: 'Mutation' } & {
  createDir?: Maybe<
    { __typename?: 'Files' } & Pick<
      Files,
      'id' | 'kind' | 'name' | 'parentId' | 'size' | 'createAt' | 'updateAt'
    >
  >;
};

export type RenameFileMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
}>;

export type RenameFileMutation = { __typename?: 'Mutation' } & {
  renameFile?: Maybe<
    { __typename?: 'Files' } & Pick<
      Files,
      'id' | 'kind' | 'name' | 'parentId' | 'size' | 'createAt' | 'updateAt'
    >
  >;
};

export type DeleteFileMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeleteFileMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteFile'>;

export type DeleteFilesMutationVariables = Exact<{
  ids: Array<Scalars['ID']>;
}>;

export type DeleteFilesMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteFiles'>;

export type MoveFileMutationVariables = Exact<{
  targetId: Scalars['ID'];
  id: Scalars['ID'];
}>;

export type MoveFileMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'moveFile'>;

export type UploadFileMutationVariables = Exact<{
  parentId: Scalars['ID'];
  file: Scalars['Upload'];
}>;

export type UploadFileMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'uploadFile'>;

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = { __typename?: 'Query' } & {
  users?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'info'>>>;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = { __typename?: 'Query' } & {
  currentUser?: Maybe<
    { __typename?: 'Login' } & Pick<Login, 'token'> & {
        user: { __typename?: 'User' } & Pick<User, 'name' | 'info'>;
      }
  >;
};

export type LoginMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login?: Maybe<
    { __typename?: 'Login' } & Pick<Login, 'token'> & {
        user: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'info'>;
      }
  >;
};

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
  info?: Maybe<Scalars['String']>;
}>;

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'info'>>;
};

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  info?: Maybe<Scalars['String']>;
}>;

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  updateUser?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'info'>>;
};

export type DeleteUsersMutationVariables = Exact<{
  ids: Array<Scalars['Int']>;
}>;

export type DeleteUsersMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteUsers'>;

export type FragmentContentsFragment = { __typename?: 'Contents' } & Pick<
  Contents,
  | 'id'
  | 'priority'
  | 'visible'
  | 'page'
  | 'title_type'
  | 'title'
  | 'value_type'
  | 'value'
  | 'parentId'
  | 'createAt'
  | 'updateAt'
>;

export const FragmentContentsFragmentDoc = gql`
  fragment FragmentContents on Contents {
    id
    priority
    visible
    page
    title_type
    title
    value_type
    value
    parentId
    createAt
    updateAt
  }
`;
export const ContentsDocument = gql`
  query contents($id: ID!) {
    contents(id: $id) {
      ...FragmentContents
    }
  }
  ${FragmentContentsFragmentDoc}
`;

/**
 * __useContentsQuery__
 *
 * To run a query within a React component, call `useContentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useContentsQuery(
  baseOptions?: Apollo.QueryHookOptions<ContentsQuery, ContentsQueryVariables>
) {
  return Apollo.useQuery<ContentsQuery, ContentsQueryVariables>(ContentsDocument, baseOptions);
}
export function useContentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ContentsQuery, ContentsQueryVariables>
) {
  return Apollo.useLazyQuery<ContentsQuery, ContentsQueryVariables>(ContentsDocument, baseOptions);
}
export type ContentsQueryHookResult = ReturnType<typeof useContentsQuery>;
export type ContentsLazyQueryHookResult = ReturnType<typeof useContentsLazyQuery>;
export type ContentsQueryResult = Apollo.QueryResult<ContentsQuery, ContentsQueryVariables>;
export const UpdateContentsDocument = gql`
  mutation updateContents(
    $id: ID!
    $page: Boolean
    $visible: Boolean
    $title_type: Int
    $title: String
    $parent: ID
    $value_type: String
    $value: String
  ) {
    updateContents(
      id: $id
      page: $page
      visible: $visible
      title_type: $title_type
      title: $title
      parent: $parent
      value_type: $value_type
      value: $value
    ) {
      ...FragmentContents
    }
  }
  ${FragmentContentsFragmentDoc}
`;
export type UpdateContentsMutationFn = Apollo.MutationFunction<
  UpdateContentsMutation,
  UpdateContentsMutationVariables
>;

/**
 * __useUpdateContentsMutation__
 *
 * To run a mutation, you first call `useUpdateContentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentsMutation, { data, loading, error }] = useUpdateContentsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      page: // value for 'page'
 *      visible: // value for 'visible'
 *      title_type: // value for 'title_type'
 *      title: // value for 'title'
 *      parent: // value for 'parent'
 *      value_type: // value for 'value_type'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUpdateContentsMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateContentsMutation, UpdateContentsMutationVariables>
) {
  return Apollo.useMutation<UpdateContentsMutation, UpdateContentsMutationVariables>(
    UpdateContentsDocument,
    baseOptions
  );
}
export type UpdateContentsMutationHookResult = ReturnType<typeof useUpdateContentsMutation>;
export type UpdateContentsMutationResult = Apollo.MutationResult<UpdateContentsMutation>;
export type UpdateContentsMutationOptions = Apollo.BaseMutationOptions<
  UpdateContentsMutation,
  UpdateContentsMutationVariables
>;
export const CreateContentsDocument = gql`
  mutation createContents(
    $parent: ID
    $vector: ContentsVector
    $page: Boolean
    $visible: Boolean
    $title_type: Int
    $title: String
    $value_type: String
    $value: String
  ) {
    createContents(
      parent: $parent
      vector: $vector
      page: $page
      visible: $visible
      title_type: $title_type
      title: $title
      value_type: $value_type
      value: $value
    ) {
      ...FragmentContents
    }
  }
  ${FragmentContentsFragmentDoc}
`;
export type CreateContentsMutationFn = Apollo.MutationFunction<
  CreateContentsMutation,
  CreateContentsMutationVariables
>;

/**
 * __useCreateContentsMutation__
 *
 * To run a mutation, you first call `useCreateContentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContentsMutation, { data, loading, error }] = useCreateContentsMutation({
 *   variables: {
 *      parent: // value for 'parent'
 *      vector: // value for 'vector'
 *      page: // value for 'page'
 *      visible: // value for 'visible'
 *      title_type: // value for 'title_type'
 *      title: // value for 'title'
 *      value_type: // value for 'value_type'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useCreateContentsMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateContentsMutation, CreateContentsMutationVariables>
) {
  return Apollo.useMutation<CreateContentsMutation, CreateContentsMutationVariables>(
    CreateContentsDocument,
    baseOptions
  );
}
export type CreateContentsMutationHookResult = ReturnType<typeof useCreateContentsMutation>;
export type CreateContentsMutationResult = Apollo.MutationResult<CreateContentsMutation>;
export type CreateContentsMutationOptions = Apollo.BaseMutationOptions<
  CreateContentsMutation,
  CreateContentsMutationVariables
>;
export const DeleteContentsDocument = gql`
  mutation deleteContents($id: ID!) {
    deleteContents(id: $id)
  }
`;
export type DeleteContentsMutationFn = Apollo.MutationFunction<
  DeleteContentsMutation,
  DeleteContentsMutationVariables
>;

/**
 * __useDeleteContentsMutation__
 *
 * To run a mutation, you first call `useDeleteContentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContentsMutation, { data, loading, error }] = useDeleteContentsMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteContentsMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteContentsMutation, DeleteContentsMutationVariables>
) {
  return Apollo.useMutation<DeleteContentsMutation, DeleteContentsMutationVariables>(
    DeleteContentsDocument,
    baseOptions
  );
}
export type DeleteContentsMutationHookResult = ReturnType<typeof useDeleteContentsMutation>;
export type DeleteContentsMutationResult = Apollo.MutationResult<DeleteContentsMutation>;
export type DeleteContentsMutationOptions = Apollo.BaseMutationOptions<
  DeleteContentsMutation,
  DeleteContentsMutationVariables
>;
export const VectorContentsDocument = gql`
  mutation vectorContents($id: ID!, $vector: Int!) {
    vectorContents(id: $id, vector: $vector) {
      id
      priority
    }
  }
`;
export type VectorContentsMutationFn = Apollo.MutationFunction<
  VectorContentsMutation,
  VectorContentsMutationVariables
>;

/**
 * __useVectorContentsMutation__
 *
 * To run a mutation, you first call `useVectorContentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVectorContentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vectorContentsMutation, { data, loading, error }] = useVectorContentsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      vector: // value for 'vector'
 *   },
 * });
 */
export function useVectorContentsMutation(
  baseOptions?: Apollo.MutationHookOptions<VectorContentsMutation, VectorContentsMutationVariables>
) {
  return Apollo.useMutation<VectorContentsMutation, VectorContentsMutationVariables>(
    VectorContentsDocument,
    baseOptions
  );
}
export type VectorContentsMutationHookResult = ReturnType<typeof useVectorContentsMutation>;
export type VectorContentsMutationResult = Apollo.MutationResult<VectorContentsMutation>;
export type VectorContentsMutationOptions = Apollo.BaseMutationOptions<
  VectorContentsMutation,
  VectorContentsMutationVariables
>;
export const ContentsListDocument = gql`
  query contentsList {
    contentsList {
      id
      visible
      priority
      title
      page
      parentId
    }
  }
`;

/**
 * __useContentsListQuery__
 *
 * To run a query within a React component, call `useContentsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useContentsListQuery(
  baseOptions?: Apollo.QueryHookOptions<ContentsListQuery, ContentsListQueryVariables>
) {
  return Apollo.useQuery<ContentsListQuery, ContentsListQueryVariables>(
    ContentsListDocument,
    baseOptions
  );
}
export function useContentsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ContentsListQuery, ContentsListQueryVariables>
) {
  return Apollo.useLazyQuery<ContentsListQuery, ContentsListQueryVariables>(
    ContentsListDocument,
    baseOptions
  );
}
export type ContentsListQueryHookResult = ReturnType<typeof useContentsListQuery>;
export type ContentsListLazyQueryHookResult = ReturnType<typeof useContentsListLazyQuery>;
export type ContentsListQueryResult = Apollo.QueryResult<
  ContentsListQuery,
  ContentsListQueryVariables
>;
export const ContentsPageDocument = gql`
  query contentsPage($id: ID) {
    contentsList(id: $id, page: true) {
      ...FragmentContents
    }
  }
  ${FragmentContentsFragmentDoc}
`;

/**
 * __useContentsPageQuery__
 *
 * To run a query within a React component, call `useContentsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentsPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useContentsPageQuery(
  baseOptions?: Apollo.QueryHookOptions<ContentsPageQuery, ContentsPageQueryVariables>
) {
  return Apollo.useQuery<ContentsPageQuery, ContentsPageQueryVariables>(
    ContentsPageDocument,
    baseOptions
  );
}
export function useContentsPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ContentsPageQuery, ContentsPageQueryVariables>
) {
  return Apollo.useLazyQuery<ContentsPageQuery, ContentsPageQueryVariables>(
    ContentsPageDocument,
    baseOptions
  );
}
export type ContentsPageQueryHookResult = ReturnType<typeof useContentsPageQuery>;
export type ContentsPageLazyQueryHookResult = ReturnType<typeof useContentsPageLazyQuery>;
export type ContentsPageQueryResult = Apollo.QueryResult<
  ContentsPageQuery,
  ContentsPageQueryVariables
>;
export const DirTreeDocument = gql`
  query dirTree {
    dirTree {
      id
      kind
      name
      parentId
      size
      createAt
      updateAt
    }
  }
`;

/**
 * __useDirTreeQuery__
 *
 * To run a query within a React component, call `useDirTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useDirTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirTreeQuery({
 *   variables: {
 *   },
 * });
 */
export function useDirTreeQuery(
  baseOptions?: Apollo.QueryHookOptions<DirTreeQuery, DirTreeQueryVariables>
) {
  return Apollo.useQuery<DirTreeQuery, DirTreeQueryVariables>(DirTreeDocument, baseOptions);
}
export function useDirTreeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DirTreeQuery, DirTreeQueryVariables>
) {
  return Apollo.useLazyQuery<DirTreeQuery, DirTreeQueryVariables>(DirTreeDocument, baseOptions);
}
export type DirTreeQueryHookResult = ReturnType<typeof useDirTreeQuery>;
export type DirTreeLazyQueryHookResult = ReturnType<typeof useDirTreeLazyQuery>;
export type DirTreeQueryResult = Apollo.QueryResult<DirTreeQuery, DirTreeQueryVariables>;
export const DirFilesDocument = gql`
  query dirFiles($id: ID!) {
    dirFiles(id: $id) {
      id
      kind
      name
      parentId
      size
      createAt
      updateAt
    }
  }
`;

/**
 * __useDirFilesQuery__
 *
 * To run a query within a React component, call `useDirFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDirFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirFilesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDirFilesQuery(
  baseOptions?: Apollo.QueryHookOptions<DirFilesQuery, DirFilesQueryVariables>
) {
  return Apollo.useQuery<DirFilesQuery, DirFilesQueryVariables>(DirFilesDocument, baseOptions);
}
export function useDirFilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DirFilesQuery, DirFilesQueryVariables>
) {
  return Apollo.useLazyQuery<DirFilesQuery, DirFilesQueryVariables>(DirFilesDocument, baseOptions);
}
export type DirFilesQueryHookResult = ReturnType<typeof useDirFilesQuery>;
export type DirFilesLazyQueryHookResult = ReturnType<typeof useDirFilesLazyQuery>;
export type DirFilesQueryResult = Apollo.QueryResult<DirFilesQuery, DirFilesQueryVariables>;
export const CreateDirDocument = gql`
  mutation createDir($id: ID!, $name: String!) {
    createDir(id: $id, name: $name) {
      id
      kind
      name
      parentId
      size
      createAt
      updateAt
    }
  }
`;
export type CreateDirMutationFn = Apollo.MutationFunction<
  CreateDirMutation,
  CreateDirMutationVariables
>;

/**
 * __useCreateDirMutation__
 *
 * To run a mutation, you first call `useCreateDirMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDirMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDirMutation, { data, loading, error }] = useCreateDirMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateDirMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateDirMutation, CreateDirMutationVariables>
) {
  return Apollo.useMutation<CreateDirMutation, CreateDirMutationVariables>(
    CreateDirDocument,
    baseOptions
  );
}
export type CreateDirMutationHookResult = ReturnType<typeof useCreateDirMutation>;
export type CreateDirMutationResult = Apollo.MutationResult<CreateDirMutation>;
export type CreateDirMutationOptions = Apollo.BaseMutationOptions<
  CreateDirMutation,
  CreateDirMutationVariables
>;
export const RenameFileDocument = gql`
  mutation renameFile($id: ID!, $name: String!) {
    renameFile(id: $id, name: $name) {
      id
      kind
      name
      parentId
      size
      createAt
      updateAt
    }
  }
`;
export type RenameFileMutationFn = Apollo.MutationFunction<
  RenameFileMutation,
  RenameFileMutationVariables
>;

/**
 * __useRenameFileMutation__
 *
 * To run a mutation, you first call `useRenameFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameFileMutation, { data, loading, error }] = useRenameFileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRenameFileMutation(
  baseOptions?: Apollo.MutationHookOptions<RenameFileMutation, RenameFileMutationVariables>
) {
  return Apollo.useMutation<RenameFileMutation, RenameFileMutationVariables>(
    RenameFileDocument,
    baseOptions
  );
}
export type RenameFileMutationHookResult = ReturnType<typeof useRenameFileMutation>;
export type RenameFileMutationResult = Apollo.MutationResult<RenameFileMutation>;
export type RenameFileMutationOptions = Apollo.BaseMutationOptions<
  RenameFileMutation,
  RenameFileMutationVariables
>;
export const DeleteFileDocument = gql`
  mutation deleteFile($id: ID!) {
    deleteFile(id: $id)
  }
`;
export type DeleteFileMutationFn = Apollo.MutationFunction<
  DeleteFileMutation,
  DeleteFileMutationVariables
>;

/**
 * __useDeleteFileMutation__
 *
 * To run a mutation, you first call `useDeleteFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFileMutation, { data, loading, error }] = useDeleteFileMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFileMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteFileMutation, DeleteFileMutationVariables>
) {
  return Apollo.useMutation<DeleteFileMutation, DeleteFileMutationVariables>(
    DeleteFileDocument,
    baseOptions
  );
}
export type DeleteFileMutationHookResult = ReturnType<typeof useDeleteFileMutation>;
export type DeleteFileMutationResult = Apollo.MutationResult<DeleteFileMutation>;
export type DeleteFileMutationOptions = Apollo.BaseMutationOptions<
  DeleteFileMutation,
  DeleteFileMutationVariables
>;
export const DeleteFilesDocument = gql`
  mutation deleteFiles($ids: [ID!]!) {
    deleteFiles(ids: $ids)
  }
`;
export type DeleteFilesMutationFn = Apollo.MutationFunction<
  DeleteFilesMutation,
  DeleteFilesMutationVariables
>;

/**
 * __useDeleteFilesMutation__
 *
 * To run a mutation, you first call `useDeleteFilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFilesMutation, { data, loading, error }] = useDeleteFilesMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteFilesMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteFilesMutation, DeleteFilesMutationVariables>
) {
  return Apollo.useMutation<DeleteFilesMutation, DeleteFilesMutationVariables>(
    DeleteFilesDocument,
    baseOptions
  );
}
export type DeleteFilesMutationHookResult = ReturnType<typeof useDeleteFilesMutation>;
export type DeleteFilesMutationResult = Apollo.MutationResult<DeleteFilesMutation>;
export type DeleteFilesMutationOptions = Apollo.BaseMutationOptions<
  DeleteFilesMutation,
  DeleteFilesMutationVariables
>;
export const MoveFileDocument = gql`
  mutation moveFile($targetId: ID!, $id: ID!) {
    moveFile(targetId: $targetId, id: $id)
  }
`;
export type MoveFileMutationFn = Apollo.MutationFunction<
  MoveFileMutation,
  MoveFileMutationVariables
>;

/**
 * __useMoveFileMutation__
 *
 * To run a mutation, you first call `useMoveFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveFileMutation, { data, loading, error }] = useMoveFileMutation({
 *   variables: {
 *      targetId: // value for 'targetId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMoveFileMutation(
  baseOptions?: Apollo.MutationHookOptions<MoveFileMutation, MoveFileMutationVariables>
) {
  return Apollo.useMutation<MoveFileMutation, MoveFileMutationVariables>(
    MoveFileDocument,
    baseOptions
  );
}
export type MoveFileMutationHookResult = ReturnType<typeof useMoveFileMutation>;
export type MoveFileMutationResult = Apollo.MutationResult<MoveFileMutation>;
export type MoveFileMutationOptions = Apollo.BaseMutationOptions<
  MoveFileMutation,
  MoveFileMutationVariables
>;
export const UploadFileDocument = gql`
  mutation uploadFile($parentId: ID!, $file: Upload!) {
    uploadFile(parentId: $parentId, file: $file)
  }
`;
export type UploadFileMutationFn = Apollo.MutationFunction<
  UploadFileMutation,
  UploadFileMutationVariables
>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      parentId: // value for 'parentId'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadFileMutation(
  baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>
) {
  return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(
    UploadFileDocument,
    baseOptions
  );
}
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<
  UploadFileMutation,
  UploadFileMutationVariables
>;
export const UsersDocument = gql`
  query Users {
    users {
      id
      name
      info
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const CurrentUserDocument = gql`
  query CurrentUser {
    currentUser {
      token
      user {
        name
        info
      }
    }
  }
`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions
  );
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions
  );
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>;
export const LoginDocument = gql`
  mutation Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      user {
        id
        name
        info
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      name: // value for 'name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const CreateUserDocument = gql`
  mutation createUser($name: String!, $password: String!, $info: String) {
    createUser(name: $name, password: $password, info: $info) {
      id
      name
      info
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      password: // value for 'password'
 *      info: // value for 'info'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>
) {
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    baseOptions
  );
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser($id: Int!, $name: String, $password: String, $info: String) {
    updateUser(id: $id, name: $name, password: $password, info: $info) {
      id
      name
      info
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      password: // value for 'password'
 *      info: // value for 'info'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>
) {
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    baseOptions
  );
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const DeleteUsersDocument = gql`
  mutation deleteUsers($ids: [Int!]!) {
    deleteUsers(ids: $ids)
  }
`;
export type DeleteUsersMutationFn = Apollo.MutationFunction<
  DeleteUsersMutation,
  DeleteUsersMutationVariables
>;

/**
 * __useDeleteUsersMutation__
 *
 * To run a mutation, you first call `useDeleteUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUsersMutation, { data, loading, error }] = useDeleteUsersMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteUsersMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteUsersMutation, DeleteUsersMutationVariables>
) {
  return Apollo.useMutation<DeleteUsersMutation, DeleteUsersMutationVariables>(
    DeleteUsersDocument,
    baseOptions
  );
}
export type DeleteUsersMutationHookResult = ReturnType<typeof useDeleteUsersMutation>;
export type DeleteUsersMutationResult = Apollo.MutationResult<DeleteUsersMutation>;
export type DeleteUsersMutationOptions = Apollo.BaseMutationOptions<
  DeleteUsersMutation,
  DeleteUsersMutationVariables
>;
