import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { QueryParamsType } from "features/packs/Packs";
import { ChangeEvent, useEffect } from "react";
import { useDebounce } from "use-debounce";

type SearchBarPropsType = {
  queryParams: QueryParamsType;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParamsType>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchBar = ({
  queryParams,
  setQueryParams,
  searchValue,
  setSearchValue,
}: SearchBarPropsType) => {
  const [debouncedPackName] = useDebounce(searchValue, 1000);

  const changeSearchHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    //TODO  !!! fix problem with rerender packs after this usee ( cause edit object queryParams)
    //TODO with condition - no request after deleting input
    if (debouncedPackName !== "") setQueryParams({ ...queryParams, packName: debouncedPackName });
  }, [debouncedPackName]);

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 413, height: 33 }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Provide your text..."
        inputProps={{ "aria-label": "search packs" }}
        value={searchValue}
        onChange={changeSearchHandler}
      />
    </Paper>
  );
};
