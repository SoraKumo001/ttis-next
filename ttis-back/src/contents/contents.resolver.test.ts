/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { beforeAllAsync, testAsync } from 'jest-async';
import * as types from '@graphql/types';
import * as querys from './contents.resolver.graphql';
import { ObjectMask, login, CustomApolloClient } from '@test/testTools';
import { CREATE_CONTENTS, UPDATE_CONTENTS } from './contents.resolver.graphql';
import {
  CreateContentsMutation,
  CreateContentsMutationVariables,
  ContentsVector,
} from '../../graphql/types';
import { createClient } from '@test/test.module';
import {
  UpdateContentsMutation,
  UpdateContentsMutationVariables,
} from '../../graphql/types';

const masks = {
  id: '',
  parentId: '',
  createAt: '',
  updateAt: '',
};

const createContents = async (
  client: CustomApolloClient,
  variables: CreateContentsMutationVariables,
) => {
  return await client.mutate<
    CreateContentsMutation,
    CreateContentsMutationVariables
  >({
    mutation: CREATE_CONTENTS,
    variables: variables,
  });
};
const updateContents = async (
  client: CustomApolloClient,
  variables: UpdateContentsMutationVariables,
) => {
  return await client.mutate<
    UpdateContentsMutation,
    UpdateContentsMutationVariables
  >({
    mutation: UPDATE_CONTENTS,
    variables: variables,
  });
};

describe('Contens(Login)', () => {
  const token = beforeAllAsync(async () => {
    const client = await createClient();
    const token = await login(client);
    expect(token).toBeDefined();
    return token;
  });

  const task1 = testAsync('Create contens', async () => {
    const client = await createClient();
    client.setToken(await token);
    const result = await createContents(client, {
      vector: ContentsVector.ChildLast,
      page: true,
    });
    expect(ObjectMask(result.data, masks)).toMatchSnapshot();
    return result.data;
  });
  const task2 = testAsync('Create & update', async () => {
    const client = await createClient();
    client.setToken(await token);
    const result = await createContents(client, {
      vector: ContentsVector.ChildLast,
      page: true,
    });
    const updateResult = await updateContents(client, {
      id: result?.data?.createContents?.id!,
      title: 'UpdateTest',
      title_type: 2,
      value_type: 'TEXT',
      value: 'Test Value',
    });
    expect(ObjectMask(updateResult, masks)).toMatchSnapshot();
  });
  const task3 = testAsync('Levels', async () => {
    const client = await createClient();
    client.setToken(await token);
    const result = await createContents(client, {
      vector: ContentsVector.ChildLast,
      page: true,
    });
    const updateResult = await updateContents(client, {
      id: result?.data?.createContents?.id!,
      title: 'UpdateTest',
      title_type: 2,
      value_type: 'TEXT',
      value: 'Test Value',
    });
    expect(ObjectMask(updateResult, masks)).toMatchSnapshot();
  });
  testAsync('Query contens', async () => {
    await Promise.all([task1, task2,task3]);
    const client = await createClient();
    client.setToken(await token);
    const result = await client.query<types.Contents>({
      query: querys.QUERY_CONTENTS,
    });
    expect(ObjectMask(result.data, masks)).toMatchSnapshot();
  });
});
