import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { QueryParamsTypeCards } from "features/cards/cards";
import s from "./search.module.scss";

type SearchBarPropsType = {
  queryParams: QueryParamsTypeCards;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParamsTypeCards>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchCards = ({
  queryParams,
  setQueryParams,
  searchValue,
  setSearchValue,
}: SearchBarPropsType) => {
  const [debouncedPackName] = useDebounce(searchValue, 1000);
  const [isMounted, setIsMounted] = useState(false);
  const changeSearchHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(e.target.value);
  };

  //second uE understand first/second mount of component - > no request on first (no rerender packs)
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      setQueryParams({ ...queryParams, cardQuestion: debouncedPackName });
    }
  }, [debouncedPackName]);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: 33,
        backgroundColor: "rgba(223, 202, 245, 0.47)",
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }}>
        <SearchIcon />
      </IconButton>
      <InputBase
        className={s.input}
        placeholder="Provide your text..."
        inputProps={{ "aria-label": "search packs" }}
        value={searchValue}
        onChange={changeSearchHandler}
      />
    </Paper>
  );
};
