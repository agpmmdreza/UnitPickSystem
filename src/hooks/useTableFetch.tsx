/* eslint-disable react-hooks/exhaustive-deps */
import {IFetchedData} from "components/core/table";
import {useEffect, useRef, useState} from "react";

const INITIAL_DATA = {
  currentPage: 1,
  maxPage: 1,
  resultsPerPage: 10,
  data: [],
};

interface IUseTableFetchProps {
  initialData?: IFetchedData;
  handleDataFetch: (
    page: number,
    resultsPerPage: number
  ) => Promise<IFetchedData>;
}

// hook for handling and managing table data fetching
function useTableFetch({ initialData, handleDataFetch }: IUseTableFetchProps) {
  const [fetchedData, setFetchedData] = useState<IFetchedData>(
    initialData || INITIAL_DATA
  );

  let requestRef = useRef<boolean>(false);

  useEffect(() => {
    handleDataFetch(fetchedData.currentPage, fetchedData.resultsPerPage).then(
      (res) => {
        setFetchedData(res);
        requestRef.current = false;
      }
    );
  }, []);

  useEffect(() => {
    handleDataFetch(fetchedData.currentPage, fetchedData.resultsPerPage).then(
      (res) => {
        setFetchedData(res);
        requestRef.current = false;
      }
    );
  }, [fetchedData.currentPage, fetchedData.resultsPerPage, handleDataFetch]);

  const checkIfNotLocked = () => !requestRef.current;

  const handleNextPage = () => {
    if (checkIfNotLocked()) {
      requestRef.current = false;
      setFetchedData((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handlePreviousPage = () => {
    if (checkIfNotLocked()) {
      requestRef.current = false;
      setFetchedData((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  const handleGotoPage = (page: number) => {
    if (checkIfNotLocked()) {
      requestRef.current = false;
      setFetchedData((prev) => ({
        ...prev,
        currentPage: page,
      }));
    }
  };

  const handleResultsPerPageChange = (resultsPerPage: number) => {
    setFetchedData((prev) => ({ ...prev, resultsPerPage }));
  };

  return {
    fetchedData: fetchedData,
    onPreviousPage: handlePreviousPage,
    onNextPage: handleNextPage,
    onGoToPage: handleGotoPage,
    onResultsPerPageChange: handleResultsPerPageChange,
  };
}

useTableFetch.defaultProps = {
  initialData: {
    currentPage: 1,
    maxPage: 1,
    resultsPerPage: 1,
    data: [],
  },
};

export default useTableFetch;
