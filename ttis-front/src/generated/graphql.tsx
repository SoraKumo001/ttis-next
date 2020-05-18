import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser: Scalars['Boolean'];
  deleteUsers: Scalars['Boolean'];
  login?: Maybe<Login>;
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

export type PageContents = {
   __typename?: 'PageContents';
  id: Scalars['ID'];
  contents: Array<Contents>;
};

export type Query = {
   __typename?: 'Query';
  contentsTree: Contents;
  contentsPage?: Maybe<PageContents>;
  contentsList: Array<Contents>;
  contents?: Maybe<Contents>;
  users?: Maybe<Array<User>>;
  currentUser?: Maybe<Login>;
};


export type QueryContentsTreeArgs = {
  level?: Maybe<Scalars['Int']>;
  visible?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
};


export type QueryContentsPageArgs = {
  visible?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
};


export type QueryContentsListArgs = {
  level?: Maybe<Scalars['Int']>;
  visible?: Maybe<Scalars['Boolean']>;
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

export type ContentsQueryVariables = {
  id: Scalars['ID'];
};


export type ContentsQuery = (
  { __typename?: 'Query' }
  & { contents?: Maybe<(
    { __typename?: 'Contents' }
    & FragmentContentsFragment
  )> }
);

export type UpdateContentsMutationVariables = {
  id: Scalars['ID'];
  page?: Maybe<Scalars['Boolean']>;
  visible?: Maybe<Scalars['Boolean']>;
  title_type?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  value_type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};


export type UpdateContentsMutation = (
  { __typename?: 'Mutation' }
  & { updateContents?: Maybe<(
    { __typename?: 'Contents' }
    & FragmentContentsFragment
  )> }
);

export type CreateContentsMutationVariables = {
  parent?: Maybe<Scalars['ID']>;
  vector?: Maybe<ContentsVector>;
  page?: Maybe<Scalars['Boolean']>;
  visible?: Maybe<Scalars['Boolean']>;
  title_type?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  value_type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};


export type CreateContentsMutation = (
  { __typename?: 'Mutation' }
  & { createContents?: Maybe<(
    { __typename?: 'Contents' }
    & FragmentContentsFragment
  )> }
);

export type DeleteContentsMutationVariables = {
  id: Scalars['ID'];
};


export type DeleteContentsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteContents'>
);

export type ContentsListQueryVariables = {};


export type ContentsListQuery = (
  { __typename?: 'Query' }
  & { contentsList: Array<(
    { __typename?: 'Contents' }
    & Pick<Contents, 'id' | 'visible' | 'title' | 'page' | 'parentId'>
  )> }
);

export type ContentsPageQueryVariables = {
  id?: Maybe<Scalars['ID']>;
};


export type ContentsPageQuery = (
  { __typename?: 'Query' }
  & { contentsPage?: Maybe<(
    { __typename?: 'PageContents' }
    & Pick<PageContents, 'id'>
    & { contents: Array<(
      { __typename?: 'Contents' }
      & FragmentContentsFragment
    )> }
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

export type CurrentUserQueryVariables = {};


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
      & Pick<User, 'id' | 'name' | 'info'>
    ) }
  )> }
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

export type FragmentContentsFragment = (
  { __typename?: 'Contents' }
  & Pick<Contents, 'id' | 'priority' | 'visible' | 'page' | 'title_type' | 'title' | 'value_type' | 'value' | 'parentId' | 'createAt' | 'updateAt'>
);

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
    ${FragmentContentsFragmentDoc}`;
export type ContentsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ContentsQuery, ContentsQueryVariables>, 'query'> & ({ variables: ContentsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ContentsComponent = (props: ContentsComponentProps) => (
      <ApolloReactComponents.Query<ContentsQuery, ContentsQueryVariables> query={ContentsDocument} {...props} />
    );
    
export type ContentsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ContentsQuery, ContentsQueryVariables>
    } & TChildProps;
export function withContents<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ContentsQuery,
  ContentsQueryVariables,
  ContentsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ContentsQuery, ContentsQueryVariables, ContentsProps<TChildProps, TDataName>>(ContentsDocument, {
      alias: 'contents',
      ...operationOptions
    });
};
export type ContentsQueryResult = ApolloReactCommon.QueryResult<ContentsQuery, ContentsQueryVariables>;
export const UpdateContentsDocument = gql`
    mutation updateContents($id: ID!, $page: Boolean, $visible: Boolean, $title_type: Int, $title: String, $parent: ID, $value_type: String, $value: String) {
  updateContents(id: $id, page: $page, visible: $visible, title_type: $title_type, title: $title, parent: $parent, value_type: $value_type, value: $value) {
    ...FragmentContents
  }
}
    ${FragmentContentsFragmentDoc}`;
export type UpdateContentsMutationFn = ApolloReactCommon.MutationFunction<UpdateContentsMutation, UpdateContentsMutationVariables>;
export type UpdateContentsComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateContentsMutation, UpdateContentsMutationVariables>, 'mutation'>;

    export const UpdateContentsComponent = (props: UpdateContentsComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateContentsMutation, UpdateContentsMutationVariables> mutation={UpdateContentsDocument} {...props} />
    );
    
export type UpdateContentsProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateContentsMutation, UpdateContentsMutationVariables>
    } & TChildProps;
export function withUpdateContents<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateContentsMutation,
  UpdateContentsMutationVariables,
  UpdateContentsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateContentsMutation, UpdateContentsMutationVariables, UpdateContentsProps<TChildProps, TDataName>>(UpdateContentsDocument, {
      alias: 'updateContents',
      ...operationOptions
    });
};
export type UpdateContentsMutationResult = ApolloReactCommon.MutationResult<UpdateContentsMutation>;
export type UpdateContentsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateContentsMutation, UpdateContentsMutationVariables>;
export const CreateContentsDocument = gql`
    mutation createContents($parent: ID, $vector: ContentsVector, $page: Boolean, $visible: Boolean, $title_type: Int, $title: String, $value_type: String, $value: String) {
  createContents(parent: $parent, vector: $vector, page: $page, visible: $visible, title_type: $title_type, title: $title, value_type: $value_type, value: $value) {
    ...FragmentContents
  }
}
    ${FragmentContentsFragmentDoc}`;
export type CreateContentsMutationFn = ApolloReactCommon.MutationFunction<CreateContentsMutation, CreateContentsMutationVariables>;
export type CreateContentsComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateContentsMutation, CreateContentsMutationVariables>, 'mutation'>;

    export const CreateContentsComponent = (props: CreateContentsComponentProps) => (
      <ApolloReactComponents.Mutation<CreateContentsMutation, CreateContentsMutationVariables> mutation={CreateContentsDocument} {...props} />
    );
    
export type CreateContentsProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateContentsMutation, CreateContentsMutationVariables>
    } & TChildProps;
export function withCreateContents<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateContentsMutation,
  CreateContentsMutationVariables,
  CreateContentsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateContentsMutation, CreateContentsMutationVariables, CreateContentsProps<TChildProps, TDataName>>(CreateContentsDocument, {
      alias: 'createContents',
      ...operationOptions
    });
};
export type CreateContentsMutationResult = ApolloReactCommon.MutationResult<CreateContentsMutation>;
export type CreateContentsMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateContentsMutation, CreateContentsMutationVariables>;
export const DeleteContentsDocument = gql`
    mutation deleteContents($id: ID!) {
  deleteContents(id: $id)
}
    `;
export type DeleteContentsMutationFn = ApolloReactCommon.MutationFunction<DeleteContentsMutation, DeleteContentsMutationVariables>;
export type DeleteContentsComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteContentsMutation, DeleteContentsMutationVariables>, 'mutation'>;

    export const DeleteContentsComponent = (props: DeleteContentsComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteContentsMutation, DeleteContentsMutationVariables> mutation={DeleteContentsDocument} {...props} />
    );
    
export type DeleteContentsProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteContentsMutation, DeleteContentsMutationVariables>
    } & TChildProps;
export function withDeleteContents<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteContentsMutation,
  DeleteContentsMutationVariables,
  DeleteContentsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteContentsMutation, DeleteContentsMutationVariables, DeleteContentsProps<TChildProps, TDataName>>(DeleteContentsDocument, {
      alias: 'deleteContents',
      ...operationOptions
    });
};
export type DeleteContentsMutationResult = ApolloReactCommon.MutationResult<DeleteContentsMutation>;
export type DeleteContentsMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteContentsMutation, DeleteContentsMutationVariables>;
export const ContentsListDocument = gql`
    query contentsList {
  contentsList {
    id
    visible
    title
    page
    parentId
  }
}
    `;
export type ContentsListComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ContentsListQuery, ContentsListQueryVariables>, 'query'>;

    export const ContentsListComponent = (props: ContentsListComponentProps) => (
      <ApolloReactComponents.Query<ContentsListQuery, ContentsListQueryVariables> query={ContentsListDocument} {...props} />
    );
    
export type ContentsListProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ContentsListQuery, ContentsListQueryVariables>
    } & TChildProps;
export function withContentsList<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ContentsListQuery,
  ContentsListQueryVariables,
  ContentsListProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ContentsListQuery, ContentsListQueryVariables, ContentsListProps<TChildProps, TDataName>>(ContentsListDocument, {
      alias: 'contentsList',
      ...operationOptions
    });
};
export type ContentsListQueryResult = ApolloReactCommon.QueryResult<ContentsListQuery, ContentsListQueryVariables>;
export const ContentsPageDocument = gql`
    query contentsPage($id: ID) {
  contentsPage(id: $id) {
    id
    contents {
      ...FragmentContents
    }
  }
}
    ${FragmentContentsFragmentDoc}`;
export type ContentsPageComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ContentsPageQuery, ContentsPageQueryVariables>, 'query'>;

    export const ContentsPageComponent = (props: ContentsPageComponentProps) => (
      <ApolloReactComponents.Query<ContentsPageQuery, ContentsPageQueryVariables> query={ContentsPageDocument} {...props} />
    );
    
export type ContentsPageProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ContentsPageQuery, ContentsPageQueryVariables>
    } & TChildProps;
export function withContentsPage<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ContentsPageQuery,
  ContentsPageQueryVariables,
  ContentsPageProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ContentsPageQuery, ContentsPageQueryVariables, ContentsPageProps<TChildProps, TDataName>>(ContentsPageDocument, {
      alias: 'contentsPage',
      ...operationOptions
    });
};
export type ContentsPageQueryResult = ApolloReactCommon.QueryResult<ContentsPageQuery, ContentsPageQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    name
    info
  }
}
    `;
export type UsersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<UsersQuery, UsersQueryVariables>, 'query'>;

    export const UsersComponent = (props: UsersComponentProps) => (
      <ApolloReactComponents.Query<UsersQuery, UsersQueryVariables> query={UsersDocument} {...props} />
    );
    
export type UsersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<UsersQuery, UsersQueryVariables>
    } & TChildProps;
export function withUsers<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UsersQuery,
  UsersQueryVariables,
  UsersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, UsersQuery, UsersQueryVariables, UsersProps<TChildProps, TDataName>>(UsersDocument, {
      alias: 'users',
      ...operationOptions
    });
};
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
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
export type CurrentUserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<CurrentUserQuery, CurrentUserQueryVariables>, 'query'>;

    export const CurrentUserComponent = (props: CurrentUserComponentProps) => (
      <ApolloReactComponents.Query<CurrentUserQuery, CurrentUserQueryVariables> query={CurrentUserDocument} {...props} />
    );
    
export type CurrentUserProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<CurrentUserQuery, CurrentUserQueryVariables>
    } & TChildProps;
export function withCurrentUser<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CurrentUserQuery,
  CurrentUserQueryVariables,
  CurrentUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, CurrentUserQuery, CurrentUserQueryVariables, CurrentUserProps<TChildProps, TDataName>>(CurrentUserDocument, {
      alias: 'currentUser',
      ...operationOptions
    });
};
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
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
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>
    } & TChildProps;
export function withLogin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps, TDataName>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($name: String!, $password: String!, $info: String) {
  createUser(name: $name, password: $password, info: $info) {
    id
    name
    info
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export type CreateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateUserMutation, CreateUserMutationVariables>, 'mutation'>;

    export const CreateUserComponent = (props: CreateUserComponentProps) => (
      <ApolloReactComponents.Mutation<CreateUserMutation, CreateUserMutationVariables> mutation={CreateUserDocument} {...props} />
    );
    
export type CreateUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>
    } & TChildProps;
export function withCreateUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateUserMutation,
  CreateUserMutationVariables,
  CreateUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateUserMutation, CreateUserMutationVariables, CreateUserProps<TChildProps, TDataName>>(CreateUserDocument, {
      alias: 'createUser',
      ...operationOptions
    });
};
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($id: Int!, $name: String, $password: String, $info: String) {
  updateUser(id: $id, name: $name, password: $password, info: $info) {
    id
    name
    info
  }
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;
export type UpdateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUserMutation, UpdateUserMutationVariables>, 'mutation'>;

    export const UpdateUserComponent = (props: UpdateUserComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUserMutation, UpdateUserMutationVariables> mutation={UpdateUserDocument} {...props} />
    );
    
export type UpdateUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>
    } & TChildProps;
export function withUpdateUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UpdateUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateUserMutation, UpdateUserMutationVariables, UpdateUserProps<TChildProps, TDataName>>(UpdateUserDocument, {
      alias: 'updateUser',
      ...operationOptions
    });
};
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUsersDocument = gql`
    mutation deleteUsers($ids: [Int!]!) {
  deleteUsers(ids: $ids)
}
    `;
export type DeleteUsersMutationFn = ApolloReactCommon.MutationFunction<DeleteUsersMutation, DeleteUsersMutationVariables>;
export type DeleteUsersComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteUsersMutation, DeleteUsersMutationVariables>, 'mutation'>;

    export const DeleteUsersComponent = (props: DeleteUsersComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteUsersMutation, DeleteUsersMutationVariables> mutation={DeleteUsersDocument} {...props} />
    );
    
export type DeleteUsersProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteUsersMutation, DeleteUsersMutationVariables>
    } & TChildProps;
export function withDeleteUsers<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteUsersMutation,
  DeleteUsersMutationVariables,
  DeleteUsersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteUsersMutation, DeleteUsersMutationVariables, DeleteUsersProps<TChildProps, TDataName>>(DeleteUsersDocument, {
      alias: 'deleteUsers',
      ...operationOptions
    });
};
export type DeleteUsersMutationResult = ApolloReactCommon.MutationResult<DeleteUsersMutation>;
export type DeleteUsersMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUsersMutation, DeleteUsersMutationVariables>;