import { useRouter } from 'next/router';
import { getRoutePath, addRouterQuery } from '../../libs/CustomRouter';
import { useQuery } from '@apollo/client';
import { QUERY_CONTENTS_PAGE } from './graphql';
import dateFormat from 'dateformat';
import {
  ContentsPageQuery,
  FragmentContentsFragment,
  ContentsPageQueryVariables,
} from '../../generated/graphql';

type ContentsItem = FragmentContentsFragment & {
  children?: ContentsItem[];
};

function createTree(contentsList?: ContentsItem[]) {
  if (!contentsList || !contentsList.length) return undefined;
  const idMap = new Map<string, ContentsItem>();
  contentsList.forEach((contents) => {
    idMap.set(contents.id, { ...contents });
  });
  contentsList.forEach((c) => {
    const contents = idMap.get(c.id)!;
    const parent = contents.parentId && idMap.get(contents.parentId);
    if (parent) {
      if (!parent.children) parent.children = [];
      parent.children.push(contents);
    }
  });
  return idMap.get(contentsList[0].id);
}

export const ContentsView = () => {
  const router = useRouter();
  const id = (router.query['id'] as string) || getRoutePath(router)[1];
  const { data } = useQuery<ContentsPageQuery, ContentsPageQueryVariables>(QUERY_CONTENTS_PAGE, {
    variables: { id },
  });
  const contents = data && createTree(data.contentsList);
  return (
    <>
      <style jsx>
        {`
          .root {
            position: relative;
            margin: 0.5em;
            padding: 0.5em;
            border-radius: 1em;
            background-color: #eeeeee;
            height: 100%;
          }
        `}
      </style>
      <div className="root">{contents && drawContents(contents)}</div>
    </>
  );
  function drawContents(contents: ContentsItem) {
    return (
      <div key={contents.id}>
        <style jsx>
          {`
            .contents {
              animation: fadeIn 0.1s normal;
            }
            .body {
              margin-left: 1em;
            }
            .title#t0 {
              display: none;
            }
            .title#t1 {
              font-size: 40px;
              border-bottom: 2px solid #666666;
            }
            .title#t2 {
              margin-top: 0.5em;
              font-size: 20px;
              border-bottom: 1px solid #666666;
            }
            .date {
              text-align: right;
            }
            @keyframes fadeIn {
              0% {
                opacity: 0;
              }

              100% {
                opacity: 1;
              }
            }
          `}
        </style>
        <div className="contents">
          <div
            className="title"
            id={'t' + contents.title_type}
            onDoubleClick={(e) => {
              e.stopPropagation();
              if (contents) addRouterQuery(router, { edit: contents.id });
            }}
          >
            {contents.title}
          </div>
          <div className="date">{dateFormat(contents.updateAt, 'yyyy年mm月dd日 HH時MM分ss秒')}</div>
          <div className="body">
            <div
              dangerouslySetInnerHTML={{
                __html: contents.value!,
              }}
            />
            <div className="child">{contents.children?.map((item) => drawContents(item))}</div>
          </div>
        </div>
      </div>
    );
  }
};
