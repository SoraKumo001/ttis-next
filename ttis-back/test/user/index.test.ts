import * as types from '../generated/graphql';
import * as querys from './querys';
import { CustomApolloClient, createClient } from '../index.spec';
import { concurrentSync } from '../testTools';

export const login = async (client: CustomApolloClient) => {
  const result = await client.mutate<types.LoginMutation>({
    mutation: querys.MUTATION_LOGIN,
    variables: { name: 'admin', password: '' },
  });
  return result.data?.login.token;
};
describe('User', () => {
  concurrentSync('CurrentUser', async () => {
    const client = await createClient();
    const currentUser = await client.query<types.CurrentUserQuery>({
      query: querys.QUERY_CURRENT_USER,
    });
    expect(currentUser.data.currentUser).toBeNull();
  });
  concurrentSync('CreateUser', async () => {
    const client = await createClient();
    const currentUser = await client.mutate<
      types.CreateUserMutation,
      types.MutationCreateUserArgs
    >({
      mutation: querys.MUTATION_CREATE_USER,
      variables: { name: 'Test02', password: 'Pass02', info: '{}' },
    });
    expect(currentUser.data.createUser).toBeNull();
  });
  concurrentSync('UpdateUser', async () => {
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
    expect(currentUser.data.updateUser).toBeNull();
  });
  concurrentSync('Delete User', async () => {
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
    expect(result.data.deleteUsers).toBeFalsy();
  });
  concurrentSync('User List', async () => {
    const client = await createClient();
    const users = await client.query<types.UsersQuery>({
      query: querys.QUERY_USERS,
    });
    expect(users.data.users).toBeNull();
  });
});

describe('User(login)', () => {
  const token = concurrentSync('Login', async () => {
    const client = await createClient();
    const token = await login(client);
    expect(token).toBeDefined();
    return token;
  });

  concurrentSync('CurrentUser', async () => {
    const client = await createClient();
    client.setToken(await token);
    const currentUser = await client.query<types.CurrentUserQuery>({
      query: querys.QUERY_CURRENT_USER,
    });
    expect(currentUser).toMatchSnapshot();
  });

  const id = concurrentSync('CreateUser', async () => {
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
    return currentUser.data.createUser.id;
  });

  const update = concurrentSync('UpdateUser', async () => {
    const client = await createClient();
    client.setToken(await token);
    const currentUser = await client.mutate<
      types.UpdateUserMutation,
      types.MutationUpdateUserArgs
    >({
      mutation: querys.MUTATION_UPDATE_USER,
      variables: {
        id: await id,
        name: 'Test01-02',
        password: 'Pass01-02',
        info: JSON.stringify({ test: 123 }),
      },
    });
    expect(currentUser).toMatchSnapshot();
  });

  const del = concurrentSync('Delete User', async () => {
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
    expect(result.data.deleteUsers).toBeTruthy();
  });

  concurrentSync('User List', async () => {
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
