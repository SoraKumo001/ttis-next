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
  parentId: Scalars['Float'];
  children?: Maybe<Array<Contents>>;
  parent: Contents;
  createAt: Scalars['DateTime'];
  updateAt: Scalars['DateTime'];
};


export type Message = {
   __typename?: 'Message';
  id: Scalars['ID'];
  name: Scalars['String'];
  value: Scalars['String'];
  createAt: Scalars['DateTime'];
  updateAt: Scalars['DateTime'];
};

export type Messages = {
   __typename?: 'Messages';
  count: Scalars['Int'];
  nodes: Array<Message>;
};

export type Mutation = {
   __typename?: 'Mutation';
  addMessage: Scalars['ID'];
  create: Scalars['ID'];
  deleteUser: Scalars['Boolean'];
  deleteUsers: Scalars['Boolean'];
  user?: Maybe<User>;
};


export type MutationAddMessageArgs = {
  value: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateArgs = {
  page?: Maybe<Scalars['Boolean']>;
  vector?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['String']>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUsersArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationUserArgs = {
  password?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};

export type Query = {
   __typename?: 'Query';
  messages?: Maybe<Messages>;
  contents?: Maybe<Contents>;
  users?: Maybe<Array<User>>;
};


export type QueryMessagesArgs = {
  page?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
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

export type CreateUserMutationVariables = {
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { user?: Maybe<(
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
    
export type UsersProps<TChildProps = {}> = ApolloReactHoc.DataProps<UsersQuery, UsersQueryVariables> & TChildProps;
export function withUsers<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UsersQuery,
  UsersQueryVariables,
  UsersProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, UsersQuery, UsersQueryVariables, UsersProps<TChildProps>>(UsersDocument, {
      alias: 'users',
      ...operationOptions
    });
};
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const CreateUserDocument = gql`
    mutation createUser($name: String, $password: String) {
  user(name: $name, password: $password) {
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
    
export type CreateUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateUserMutation, CreateUserMutationVariables> & TChildProps;
export function withCreateUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateUserMutation,
  CreateUserMutationVariables,
  CreateUserProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateUserMutation, CreateUserMutationVariables, CreateUserProps<TChildProps>>(CreateUserDocument, {
      alias: 'createUser',
      ...operationOptions
    });
};
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
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
    
export type DeleteUsersProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteUsersMutation, DeleteUsersMutationVariables> & TChildProps;
export function withDeleteUsers<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteUsersMutation,
  DeleteUsersMutationVariables,
  DeleteUsersProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteUsersMutation, DeleteUsersMutationVariables, DeleteUsersProps<TChildProps>>(DeleteUsersDocument, {
      alias: 'deleteUsers',
      ...operationOptions
    });
};
export type DeleteUsersMutationResult = ApolloReactCommon.MutationResult<DeleteUsersMutation>;
export type DeleteUsersMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUsersMutation, DeleteUsersMutationVariables>;