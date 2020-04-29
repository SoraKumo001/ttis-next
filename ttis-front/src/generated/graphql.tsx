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
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'info'>
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
    id
    name
    info
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