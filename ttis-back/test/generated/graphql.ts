export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Contents = {
   __typename?: 'Contents';
  id: Scalars['ID'];
  priority: Scalars['Float'];
  visible: Scalars['Boolean'];
  page: Scalars['Boolean'];
  title_type: Scalars['Float'];
  title: Scalars['String'];
  value_type: Scalars['String'];
  value: Scalars['String'];
  parentId: Scalars['String'];
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


export type Login = {
   __typename?: 'Login';
  token: Scalars['String'];
  user: User;
};

export type Mutation = {
   __typename?: 'Mutation';
  create: Contents;
  update: Contents;
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser: Scalars['Boolean'];
  deleteUsers: Scalars['Boolean'];
  login?: Maybe<Login>;
};


export type MutationCreateArgs = {
  page: Scalars['Boolean'];
  vector: ContentsVector;
  parent: Scalars['String'];
};


export type MutationUpdateArgs = {
  value?: Maybe<Scalars['String']>;
  value_type?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  title_type?: Maybe<Scalars['Float']>;
  visible?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Boolean']>;
  vector?: Maybe<Scalars['String']>;
  id: Scalars['String'];
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

export type Query = {
   __typename?: 'Query';
  contents?: Maybe<Contents>;
  users?: Maybe<Array<User>>;
  currentUser?: Maybe<User>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  enable: Scalars['Boolean'];
  name: Scalars['String'];
  info: Scalars['String'];
};

export type LoginMutationVariables = {
  name: Scalars['String'];
  password: Scalars['String'];
};


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

export type CurrentUserQueryVariables = {};


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'info'>
  )> }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'info'>
  )>> }
);

export type CreateUserMutationVariables = {
  name: Scalars['String'];
  password: Scalars['String'];
  info?: Maybe<Scalars['String']>;
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'info'>
  )> }
);

export type UpdateUserMutationVariables = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  info?: Maybe<Scalars['String']>;
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'info'>
  )> }
);

export type DeleteUsersMutationVariables = {
  ids: Array<Scalars['Int']>;
};


export type DeleteUsersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUsers'>
);
