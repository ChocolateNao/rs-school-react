import { ChangeEvent, useEffect, useState } from 'react';
import useUpdateQueryParams from 'hooks/useUpdateQueryParams';
import { useRouter } from 'next/router';

import Button from 'ui/Button';

import './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
}

function Pagination({ totalPages }: PaginationProps) {
  const router = useRouter();
  const { updateQueryParams } = useUpdateQueryParams();

  const initialPageSizeNum = Number(router.query.per);
  const [pageSize, setPageSize] = useState<number>(initialPageSizeNum || 25);

  const page = Number(router.query.page) || 1;

  useEffect(() => {
    if (router.pathname !== '/anime/[id]') {
      if (router.query.search) {
        updateQueryParams({
          page: '1',
          per: '25',
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.search]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const pageSizeInput = Number(input);

    if (!pageSizeInput) return;

    setPageSize(Number(input));
  };

  const handlePageDecrement = () => {
    if (page <= 1) return;
    updateQueryParams({ page: (page - 1).toString() });
  };

  const handlePageIncrement = () => {
    if (page >= totalPages) return;
    updateQueryParams({ page: (page + 1).toString() });
  };

  const handlePageSizeClick = () => {
    if (pageSize < 1 || !pageSize || pageSize > 25) {
      setPageSize(25);
      updateQueryParams({ page: String(page), per: '25' });
    } else {
      updateQueryParams({ page: '1', per: pageSize.toString() });
    }
  };

  return (
    <div className="pagination">
      <div className="pagination__navigation">
        <Button
          className="pagination__navigation_btn"
          type="button"
          onClick={handlePageDecrement}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <span className="pagination__page-info">
          {page} / {totalPages}
        </span>
        <Button
          className="pagination__navigation_btn"
          type="button"
          onClick={handlePageIncrement}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
      <div className="pagination__pagesize">
        Items on page (1-25):
        <div>
          <input
            className="pagination__pagesize_input"
            onChange={onInputChange}
            placeholder="1 - 25"
            type="text"
            value={pageSize}
          />
          <Button
            className="pagination__pagesize_update"
            type="button"
            onClick={handlePageSizeClick}
          >
            Update page size
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
