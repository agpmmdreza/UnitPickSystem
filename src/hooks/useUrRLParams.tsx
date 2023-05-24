import {IFilterValue} from "components/core/filter";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {IPagination} from "./usePagination";
import {convertToString} from "utils/form";

const useFilter = (
  initialValue?: IFilterValue[]
): [IFilterValue[], React.Dispatch<React.SetStateAction<IFilterValue[]>>] => {
  const [filters, setFilters] = useState<IFilterValue[]>(
    initialValue ? initialValue : []
  );
  const { search } = useLocation();
  useEffect(() => {
    const filters_params = new URLSearchParams(search).get("filters");

    if (filters_params !== null) {
      setFilters(JSON.parse(decodeURIComponent(filters_params)));
    }
  }, [search]);

  return [filters, setFilters];
};

const useSearchParam = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>
] => {
  const [searchParam, setSearchParam] = useState<string>("");
  const { search } = useLocation();
  useEffect(() => {
    const filters_params = new URLSearchParams(search).get("keyword");

    if (filters_params !== null) {
      setSearchParam(decodeURIComponent(filters_params));
    }
  }, [search]);

  return [searchParam, setSearchParam];
};

const usePaginationParams = (
  initialValue?: IPagination,
  index?: string | number
): [IPagination, React.Dispatch<React.SetStateAction<IPagination>>] => {
  // console.log("render from usePaginationParams");

  const [pagination, setPagination] = useState<IPagination>(
    initialValue
      ? initialValue
      : {
          currentPage: 1,
          maxPage: 1,
          resultsPerPage: 10,
        }
  );

  const { search } = useLocation();
  useEffect(() => {
    const currentPage_param = new URLSearchParams(search).get(
      "currentPage" + convertToString(index)
    );
    // const maxPage_param = new URLSearchParams(search).get("maxPage");
    const resultsPerPage_param = new URLSearchParams(search).get(
      "resultsPerPage" + convertToString(index)
    );

    const paginationObject: IPagination = {
      currentPage: 1,
      maxPage: 10,
      resultsPerPage: 10,
    };

    if (currentPage_param !== null) {
      paginationObject["currentPage"] = Number(
        decodeURIComponent(currentPage_param)
      );
    }
    // if (maxPage_param !== null) {
    //   paginationObject["maxPage"] = Number(decodeURIComponent(maxPage_param));
    // }
    if (resultsPerPage_param !== null) {
      paginationObject["resultsPerPage"] = Number(
        decodeURIComponent(resultsPerPage_param)
      );
    }

    setPagination((prev) => ({
      currentPage: paginationObject.currentPage,
      maxPage: prev.maxPage,
      resultsPerPage: paginationObject.resultsPerPage,
    }));
  }, [search, index]);

  return [pagination, setPagination];
};

export { useFilter, useSearchParam, usePaginationParams };
