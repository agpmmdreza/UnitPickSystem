import {PropsWithChildren, useMemo} from "react";
import classes from "./styles.module.scss";
import {IPagination} from "hooks/usePagination";
import {ArrowLeftLinear, ArrowRightLinear} from "components/icon";
import {MoonLoader} from "react-spinners";
import {useMediaQuery} from "@react-hook/media-query";

interface IPItemProps extends PropsWithChildren<any> {
  id?: number;
  onClick?: (v: number) => void;
  selected?: boolean;
}

// each page item component
function PItem({ id, selected, onClick, children }: IPItemProps) {
  return (
    <div
      className={classes.pItemContainer}
      data-selected={selected}
      data-button={!!onClick}
      onClick={onClick ? () => onClick(id!) : () => {}}
    >
      {children}
    </div>
  );
}

export interface IPaginationProps extends IPagination {
  onNextPage: () => void;
  onPreviousPage: () => void;
  onGoToPage: (page: number) => void;
  onResultsPerPageChange: (
    resultPerPage: number,
    totalResultsCount?: number
  ) => void;
  isFetching?: boolean;
}

// pagination container component
function Pagination({
  currentPage,
  maxPage,
  resultsPerPage,
  onResultsPerPageChange,
  onGoToPage,
  onNextPage,
  onPreviousPage,
  isFetching,
}: IPaginationProps) {
  const matches = useMediaQuery("only screen and (max-width: 450px)");
  const items = useMemo(() => {
    if (maxPage === 1) {
      return [1];
    } else if (maxPage === 2) {
      return [1, 2];
    } else {
      // lets calculate for current page
      const siblingsAndSelf: number[] = [currentPage];
      const siblingsCount = 1;

      for (let i = 1; i <= siblingsCount; i++) {
        // right siblings
        if (currentPage - i > 1) {
          siblingsAndSelf.unshift(currentPage - i);
        }

        // left siblibgs
        if (currentPage + i < maxPage) {
          siblingsAndSelf.push(currentPage + i);
        }
      }

      // handle left dots
      if (siblingsAndSelf[0] - 1 >= 2) {
        siblingsAndSelf.unshift(-1);
      }
      // handle right dots
      if (siblingsAndSelf[siblingsAndSelf.length - 1] + 1 <= maxPage - 1) {
        siblingsAndSelf.push(-1);
      }

      if (currentPage !== 1) {
        siblingsAndSelf.unshift(1);
      }

      if (currentPage !== maxPage) {
        siblingsAndSelf.push(maxPage);
      }

      return [...siblingsAndSelf];
    }
  }, [currentPage, maxPage]);

  if (maxPage === 1) {
    return null;
  }

  // render component
  return (
    <div className={classes.container}>
      <PItem onClick={currentPage > 1 ? onPreviousPage : undefined}>
        <ArrowLeftLinear />
      </PItem>

      {items.map((pageNumber: number) => (
        <PItem
          selected={currentPage === pageNumber}
          onClick={() => pageNumber !== -1 && onGoToPage(pageNumber)}
        >
          {pageNumber === -1 ? (
            "..."
          ) : pageNumber === currentPage ? (
            isFetching ? (
              <MoonLoader size={matches ? 8 : 13} color="white" />
            ) : (
              pageNumber
            )
          ) : (
            pageNumber
          )}
        </PItem>
      ))}
      <PItem onClick={currentPage < maxPage ? onNextPage : undefined}>
        <ArrowRightLinear />
      </PItem>

      <PItem>
        {`${(currentPage - 1) * resultsPerPage + 1}-${
          currentPage * resultsPerPage
        }
         of ${maxPage * resultsPerPage}`}
      </PItem>

      <PItem>
        <span className={classes.pageInfo}>
          Rows per page:
          <select
            className={classes.pageSelect}
            value={resultsPerPage}
            onChange={(e) => {
              onResultsPerPageChange(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </span>
      </PItem>
    </div>
  );
}

export default Pagination;
