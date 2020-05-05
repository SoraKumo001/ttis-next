/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as types from '@graphql/types';
import * as querys from './user.resolver.graphql';
import { testAsync, testSync } from 'jest-async';
import { login } from '@test/testTools';
import { createClient } from '@test/test.module';


describe('User', () => {
  testAsync('CurrentUser', async () => {
    const client = await createClient();
    const currentUser = await client.query<types.CurrentUserQuery>({
      query: querys.QUERY_CURRENT_USER,
    });
    expect(currentUser.data.currentUser).toBeNull();
  });
  testAsync('CreateUser', async () => {
    const client = await createClient();
    const currentUser = await client.mutate<
      types.CreateUserMutation,
      types.MutationCreateUserArgs
    >({
      mutation: querys.MUTATION_CREATE_USER,
      variables: { name: 'Test02', password: 'Pass02', info: '{}' },
    });
    expect(currentUser.data?.createUser).toBeNull();
  });
  testAsync('UpdateUser', async () => {
    const client = await createClient();
    const currentUser = await client.mutate<
      types.UpdateUserMutation,
      types.MutationUpdateUserArgs
    >({
      mutation: querys.MUTATION_UPDATE_USER,
      variables: {
        id: 1,
        name: 'Test01-02',
        password: 'Pass01-02',
        info: '{test:123}',
      },
    });
    expect(currentUser.data?.updateUser).toBeNull();
  });
  testAsync('Delete User', async () => {
    const client = await createClient();
    const result = await client.mutate<
      types.DeleteUsersMutation,
      types.MutationDeleteUsersArgs
    >({
      mutation: querys.MUTATION_DELETE_USERS,
      variables: {
        ids: [2],
      },
    });
    expect(result.data?.deleteUsers).toBeFalsy();
  });
  testAsync('User List', async () => {
    const client = await createClient();
    const users = await client.query<types.UsersQuery>({
      query: querys.QUERY_USERS,
    });
    expect(users.data.users).toBeNull();
  });
});

describe('User(login)', () => {
  const token = testSync('Login', async () => {
    const client = await createClient();
    const token = await login(client);
    expect(token).toBeDefined();
    return token;
  });

  testAsync('CurrentUser', async () => {
    const client = await createClient();
    client.setToken(await token);
    const currentUser = await client.query<types.CurrentUserQuery>({
      query: querys.QUERY_CURRENT_USER,
    });
    expect(currentUser).toMatchSnapshot();
  });

  const id = testAsync('CreateUser', async () => {
    const client = await createClient();
    client.setToken(await token);
    const currentUser = await client.mutate<
      types.CreateUserMutation,
      types.MutationCreateUserArgs
    >({
      mutation: querys.MUTATION_CREATE_USER,
      variables: { name: 'Test01', password: 'Pass01', info: '{}' },
    });
    expect(currentUser).toMatchSnapshot();
    return currentUser.data?.createUser?.id;
  });

  const update = testAsync('UpdateUser', async () => {
    const client = await createClient();
    client.setToken(await token);
    const currentUser = await client.mutate<
      types.UpdateUserMutation,
      types.MutationUpdateUserArgs
    >({
      mutation: querys.MUTATION_UPDATE_USER,
      variables: {
        id: (await id)!,
        name: 'Test01-02',
        password: 'Pass01-02',
        info: JSON.stringify({ test: 123 }),
      },
    });
    expect(currentUser).toMatchSnapshot();
  });

  const del = testAsync('Delete User', async () => {
    await update;
    const client = await createClient();
    client.setToken(await login(client));
    const result = await client.mutate<
      types.DeleteUsersMutation,
      types.MutationDeleteUsersArgs
    >({
      mutation: querys.MUTATION_DELETE_USERS,
      variables: {
        ids: [2],
      },
    });
    expect(result.data?.deleteUsers).toBeTruthy();
  });

  testAsync('User List', async () => {
    await del;
    const client = await createClient();
    const token = await login(client);
    client.setToken(token);
    const users = await client.query<types.UsersQuery>({
      query: querys.QUERY_USERS,
    });
    expect(users.data.users).toMatchSnapshot();
  });
});
