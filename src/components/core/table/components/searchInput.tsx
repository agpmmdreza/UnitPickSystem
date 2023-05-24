import Input from "components/core/input";
import {useEffect, useRef} from "react";
import {ISearchInputProps} from "..";
import {useHistory} from "react-router";
import {useSearchParam} from "hooks/useUrRLParams";

const TIME = 1000;

const SearchInput = ({ optimizedOnChange, placeholder }: ISearchInputProps) => {
  const history = useHistory();
  // state for store the input value
  const [value, setValue] = useSearchParam();

  // use ref to store the timer
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      // Clear the interval when the component unmounts
      if (timer.current !== null) {
        clearTimeout(timer.current);
      }
    };
  }, [timer]);

  // timeout callback function
  const setKeyword = (value: string) => {
    // console.log("keyword set to:", value);

    const params = new URLSearchParams(history.location.search);
    if (value.trim() === "") {
      params.delete("keyword");
      history.replace({ search: params.toString() });
    } else {
      // params.delete("keyword");
      params.set("keyword", encodeURIComponent(value));
      history.replace({ search: params.toString() });
    }

    if (optimizedOnChange) optimizedOnChange(value);
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    timer.current = null;
  };

  // input change handler
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    // if (e.target.value.trim().length > 3 || e.target.value.trim() === "") {
    //   //in less than three character backend does not response the request

    //   //if the the value's length is 0 user not have to be delayed
    //   const time = e.target.value.trim() === "" ? 0 : TIME;

    //   if (timer.current === null) {
    //     // set the timeout
    //     timer.current = setTimeout(
    //       () => setKeyword(e.target.value.trim()),
    //       time
    //     );
    //   } else {
    //     // refresh the timer
    //     clearTimeout(timer.current);
    //     timer.current = setTimeout(
    //       () => setKeyword(e.target.value.trim()),
    //       time
    //     );
    //   }
    // }
    const time = e.target.value.trim() === "" ? 0 : TIME;

    if (timer.current === null) {
      // set the timeout
      timer.current = setTimeout(() => setKeyword(e.target.value.trim()), time);
    } else {
      // refresh the timer
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setKeyword(e.target.value.trim()), time);
    }
  };
  return (
    <Input
      type="search"
      name="filter-search"
      className="w-100 tableSearchInput"
      value={value}
      onChange={changeHandler}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;
