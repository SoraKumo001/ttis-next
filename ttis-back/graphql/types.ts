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

export enum ContentsVector {
  ChildFirst = 'CHILD_FIRST',
  ChildLast = 'CHILD_LAST',
  Before = 'BEFORE',
  Next = 'NEXT'
}


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

export type Login = {
  __typename?: 'Login';
  token: Scalars['String'];
  user: User;
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
  moveFile?: Maybe<Scalars['Boolean']>;
  uploadFile?: Maybe<Scalars['Boolean']>;
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


export type MutationMoveFileArgs = {
  id: Scalars['ID'];
  targetId: Scalars['ID'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};

export type Query = {
  __typename?: 'Query';
  contentsTree: Contents;
  contentsList: Array<Contents>;
  contents?: Maybe<Contents>;
  users?: Maybe<Array<User>>;
  currentUser?: Maybe<Login>;
  dirTree?: Maybe<Array<Files>>;
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


export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  enable: Scalars['Boolean'];
  name: Scalars['String'];
  info: Scalars['String'];
};

export type FragmentContentsFragment = (
  { __typename?: 'Contents' }
  & Pick<Contents, 'id' | 'priority' | 'visible' | 'page' | 'title_type' | 'title' | 'value_type' | 'value' | 'parentId' | 'createAt' | 'updateAt'>
);

export type ContentsListQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  level?: Maybe<Scalars['Int']>;
  visible?: Maybe<Scalars['Boolean']>;
}>;


export type ContentsListQuery = (
  { __typename?: 'Query' }
  & { contentsList: Array<(
    { __typename?: 'Contents' }
    & FragmentContentsFragment
  )> }
);

export type ContentsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ContentsQuery = (
  { __typename?: 'Query' }
  & { contents?: Maybe<(
    { __typename?: 'Contents' }
    & FragmentContentsFragment
  )> }
);

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


export type CreateContentsMutation = (
  { __typename?: 'Mutation' }
  & { createContents?: Maybe<(
    { __typename?: 'Contents' }
    & FragmentContentsFragment
  )> }
);

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


export type UpdateContentsMutation = (
  { __typename?: 'Mutation' }
  & { updateContents?: Maybe<(
    { __typename?: 'Contents' }
    & FragmentContentsFragment
  )> }
);

export type LoginMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'Login' }
    & Pick<Login, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'info'>
    ) }
  )> }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'Login' }
    & Pick<Login, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'info'>
    ) }
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'info'>
  )>> }
);

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
  info?: Maybe<Scalars['String']>;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'info'>
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  info?: Maybe<Scalars['String']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'info'>
  )> }
);

export type DeleteUsersMutationVariables = Exact<{
  ids: Array<Scalars['Int']>;
}>;


export type DeleteUsersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUsers'>
);
