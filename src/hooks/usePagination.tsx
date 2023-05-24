import {convertToString} from "utils/form";
import {usePaginationParams} from "./useUrRLParams";
import {useHistory} from "react-router";

export interface IPagination {
  currentPage: number;
  maxPage: number;
  resultsPerPage: number;
}

//

/**
 * hook that manage pagination
 * @param index index of pagination. If u have more than one pagination in your page, u have to give an index to handle url parameters separately.
 * @returns
 */
function usePagination(index?: number | string) {
  // console.log("render from usePagination");

  const [pagination, setPagination] = usePaginationParams(
    {
      currentPage: 1,
      maxPage: 1,
      resultsPerPage: 10,
    },
    index
  );

  const history = useHistory();
  const params = new URLSearchParams(history.location.search);

  const setParam = (
    key: "currentPage" | "maxPage" | "resultsPerPage",
    value: string | number
  ) => {
    // params.delete(key);
    params.set(key + convertToString(index), encodeURIComponent(value));
    history.replace({ search: params.toString() });
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => {
        setParam("currentPage", prev.currentPage - 1);
        return {
          ...prev,
          currentPage: prev.currentPage - 1,
        };
      });
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.maxPage) {
      setPagination((prev) => {
        setParam("currentPage", prev.currentPage + 1);
        return {
          ...prev,
          currentPage: prev.currentPage + 1,
        };
      });
    }
  };

  const handleGotoPage = (page: number) => {
    if (page > 0 && page <= pagination.maxPage) {
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
      }));
    }
  };

  const handleResultsPerPageChange = (
    resultsPerPage: number,
    totalResultsCount?: number
  ) => {
    setPagination({
      currentPage: 1,
      maxPage: totalResultsCount
        ? Math.floor(totalResultsCount / resultsPerPage) + 1
        : 1,
      resultsPerPage,
    });
    setParam("resultsPerPage", resultsPerPage);
  };

  const updateMaxPage = (maxPage: number) => {
    setPagination((prev) => ({
      ...prev,
      maxPage,
    }));
  };

  return {
    pagination,
    handlePreviousPage,
    handleNextPage,
    handleGotoPage,
    handleResultsPerPageChange,
    updateMaxPage,
  };
}

export default usePagination;
