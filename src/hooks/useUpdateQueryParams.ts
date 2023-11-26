import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

function useUpdateQueryParams() {
  const router = useRouter();
  const prevParamsRef = useRef<ParsedUrlQuery | null>(null);

  const updateQueryParams = (params: ParsedUrlQuery, path?: string) => {
    const updatedParams = { ...router.query, ...params };
    Object.keys(updatedParams).forEach((key) => {
      if (updatedParams[key] === '') {
        delete updatedParams[key];
      }
    });

    router.push(
      {
        pathname: path || router.pathname,
        query: updatedParams,
      },
      undefined
    );
  };

  useEffect(() => {
    prevParamsRef.current = router.query;
  }, [router.query]);

  return { updateQueryParams, prevParams: prevParamsRef.current };
}

export default useUpdateQueryParams;
