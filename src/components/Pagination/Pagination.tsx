import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Button from '../../shared/ui/Button/Button';

import './Pagination.css';

interface PaginationProps {
  totalPages: number;
}

function Pagination({ totalPages }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPageSizeNum = Number(searchParams.get('per'));
  const [pageSize, setPageSize] = useState<number>(initialPageSizeNum || 25);

  const page = Number(searchParams.get('page')) || 1;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const pageSizeInput = Number(input);

    if (!pageSizeInput) return;

    setPageSize(Number(input));
  };

  const handlePageDecrement = () => {
    if (page <= 1) return;

    setSearchParams((oldParams) => {
      oldParams.set('page', (page - 1).toString());

      return oldParams;
    });
  };

  const handlePageIncrement = () => {
    if (page >= totalPages) return;

    const newPageNum = page + 1;

    setSearchParams((params) => {
      params.set('page', newPageNum.toString());
      return params;
    });
  };

  const handlePageSizeClick = () => {
    if (pageSize < 1 || !pageSize) {
      setPageSize(25);
    }

    setSearchParams((params) => {
      params.set('per', pageSize.toString());
      params.set('page', '1');
      return params;
    });
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
            placeholder="Search for product name"
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
