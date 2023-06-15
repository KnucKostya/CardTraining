import React, { useEffect, useState } from "react";
import { useAppSelector } from "common/hooks/useAppSelector";
import s from "./Packs.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { packsThunks } from "features/packs/packsSlice";
import IconButton from "@mui/material/IconButton";
import SchoolIcon from "@mui/icons-material/School";
import { SuperButton } from "common/components/super-button/SuperButton";
import { SearchBar } from "features/packs/search-bar/SearchBar";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { PacksSlider } from "features/packs/slider/PacksSlider";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useActions } from "common/hooks/useActions";
import { Link } from "react-router-dom";
import { isLoading_Selector } from "app/appSelector";
import {
  maxCardsCount_Selector,
  minCardsCount_Selector,
  packs_Selector,
  packsCount_Selector,
} from "./packsSelector";
import { userId_Selector } from "../auth/authSelector";
import { Backdrop } from "@mui/material";
import { AddPackModal } from "features/packs/modals/AddPackModal";
import { BaseModal } from "common/components/BasicModal/BaseModal";
import { EditPackModal } from "features/packs/modals/EditPackModal";
import { DeletePackModal } from "features/packs/modals/DeletePackModal";

export type QueryParamsType = {
  packName: string;
  page: number;
  pageCount: number;
  min: number;
  max: number;
  sortPacks: string;
  user_id: string;
};

export const Packs = () => {
  const { fetchPacks } = useActions(packsThunks);
  const isLoading = useAppSelector(isLoading_Selector);
  const packs = useAppSelector(packs_Selector);
  const packsCount = useAppSelector(packsCount_Selector);
  const userId = useAppSelector(userId_Selector);
  const minCardsCount = useAppSelector(minCardsCount_Selector);
  const maxCardsCount = useAppSelector(maxCardsCount_Selector);
  const [sliderValuesLocal, setSliderValuesLocal] = useState([minCardsCount, maxCardsCount]);
  const [queryParams, setQueryParams] = useState<QueryParamsType>({
    packName: "",
    page: 1,
    pageCount: 6,
    min: 0,
    max: 100,
    sortPacks: "",
    user_id: "",
  });
  const [searchBarValue, setSearchBarValue] = useState(queryParams.packName);
  const packsPaginationCount: number = packsCount ? Math.ceil(packsCount / queryParams.pageCount) : 10;

  useEffect(() => {
    fetchPacks(queryParams);
  }, [queryParams]);

  // authApi
  //   .login({
  //     email: "knuckostya1@gmail.com",
  //     password: "Sends777",
  //     rememberMe: true,
  //   })
  //   .then(() => authApi.isAuth);
  //    fetchPacks(queryParams));
  const updatedSortHandler = () => {
    if (queryParams.sortPacks === "1updated" || queryParams.sortPacks === "") {
      setQueryParams((prevState) => ({
        ...prevState,
        sortPacks: "0updated",
        page: 1,
      }));
    } else {
      setQueryParams((prevState) => ({
        ...prevState,
        sortPacks: "1updated",
        page: 1,
      }));
    }
  };

  const showMyPacks = () => {
    if (userId) setQueryParams({ ...queryParams, user_id: userId });
  };
  const showFriendsPacks = () => {
    setQueryParams({ ...queryParams, user_id: "" });
  };

  const sliderCallBack = (arr: number[]) => {
    setQueryParams({ ...queryParams, min: arr[0], max: arr[1] });
  };

  const resetFiltersHandler = () => {
    setSearchBarValue(""); //TODO fix bug with double request in this setState/searchBar component
    setSliderValuesLocal([minCardsCount, maxCardsCount]);
    setQueryParams({
      packName: "",
      min: 0,
      max: 100,
      page: 1,
      pageCount: 6,
      user_id: "",
      sortPacks: "",
    });
  };

  const paginationChangeHandler = (event: React.ChangeEvent<unknown>, value: number) => {
    setQueryParams({ ...queryParams, page: value });
  };
  const changeRowsNumber = (event: SelectChangeEvent) => {
    setQueryParams({ ...queryParams, pageCount: +event.target.value });
  };
  const changeDateFormat = (date: Date) => {
    const newDate = new Date(date);
    return `${newDate.getDate().toString().padStart(2, "0")}.${(newDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${newDate.getFullYear().toString()}`;
  };

  const onClickPackHandler = () => {};

  return (
    <div className={s.packs}>
      <div className={`container ${s.packsContainer}`}>
        <div className={s.titleBlock}>
          <span className={s.title}>Packs List</span>
          <BaseModal modalTitle={"Add new pack"} buttonType={"base"}>
            {(close) => <AddPackModal closeModal={close} />}
          </BaseModal>
        </div>
        <div className={s.actionsBlock}>
          <div className={s.search}>
            <span>Search</span>
            <SearchBar
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              searchValue={searchBarValue}
              setSearchValue={setSearchBarValue}
            />
          </div>
          <div className={s.showCards}>
            <span>Show packs cards</span>
            <div className={s.buttons}>
              <SuperButton name={"My"} onClickCallBack={showMyPacks} width={"90px"} variant={"contained"} />
              <SuperButton
                name={"All"}
                onClickCallBack={showFriendsPacks}
                width={"90px"}
                variant={"contained"}
              />
              {/*TODO contained of active my/all*/}
            </div>
          </div>
          <div className={s.slider}>
            <span>Number of cards</span>
            <div className={s.sliderContent}>
              <PacksSlider
                sliderCallBack={sliderCallBack}
                sliderValuesLocal={sliderValuesLocal}
                setSliderValuesLocal={setSliderValuesLocal}
              />
            </div>
          </div>
          <div className={s.resetFilter}>
            <IconButton aria-label="filterOff" onClick={resetFiltersHandler}>
              <FilterAltOffIcon color={"primary"} />
            </IconButton>
          </div>
        </div>
        {packs.length === 0 ? (
          <div className={s.noPacksError}>Колоды не найдены. Измените параметры фильтра / поиска</div>
        ) : (
          <TableContainer component={Paper} sx={{ position: "relative" }}>
            <Table sx={{ overflowWrap: "break-word", tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: "30%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "15%" }} />
              </colgroup>
              <TableHead sx={{ background: "#EFEFEF" }}>
                <TableRow hover={true}>
                  <TableCell sx={{ padding: "16px 16px 16px 36px", width: "200px" }}>Name</TableCell>
                  <TableCell align="left">Cards</TableCell>
                  <TableCell align="left" onClick={updatedSortHandler} sx={{ display: "flex" }}>
                    <TableSortLabel
                      active={queryParams.sortPacks !== ""} //should be true for the sorted column
                      direction={queryParams.sortPacks !== "0updated" ? "desc" : "asc"} // The current sort direction /"desc"
                    >
                      Last updated
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="left">Created By</TableCell>
                  <TableCell align="left" sx={{ padding: "16px 36px 16px 16px" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packs.map((p) => (
                  <TableRow
                    key={p._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={onClickPackHandler}
                  >
                    <TableCell component="th" scope="row" sx={{ padding: "16px 16px 16px 36px" }}>
                      <Link to={`/cards/pack/${p._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        {p.name}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{p.cardsCount}</TableCell>
                    <TableCell align="left">{changeDateFormat(p.updated)}</TableCell>
                    <TableCell align="left">{p.user_name}</TableCell>
                    <TableCell align="left" sx={{ padding: "16px 28px 16px 8px" }}>
                      <span style={{ width: "33%" }}>
                        {p.cardsCount !== 0 && (
                          <IconButton aria-label="learn">
                            <SchoolIcon color={"primary"} />
                          </IconButton>
                        )}
                      </span>
                      {userId === p.user_id && (
                        <span style={{ width: "67%" }}>
                          <BaseModal modalTitle={"Edit pack"} buttonType={"iconEdit"}>
                            {(close) => <EditPackModal closeModal={close} _id={p._id} packName={p.name} />}
                          </BaseModal>
                          <BaseModal modalTitle={"Delete pack"} buttonType={"iconDelete"}>
                            {(close) => <DeletePackModal closeModal={close} _id={p._id} packName={p.name} />}
                          </BaseModal>
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              open={isLoading}
            >
              {/*<CircularProgress color="inherit" />*/}
            </Backdrop>
          </TableContainer>
        )}
        <div className={s.paginationBlock}>
          <Pagination
            shape={"rounded"}
            count={packsPaginationCount}
            color="primary"
            page={queryParams.page}
            onChange={paginationChangeHandler}
          />
          <span>Show</span>
          <FormControl>
            <Select value={queryParams.pageCount.toString()} onChange={changeRowsNumber} autoWidth>
              <MenuItem value={"4"}>4</MenuItem>
              <MenuItem value={"6"}>6</MenuItem>
              <MenuItem value={"8"}>8</MenuItem>
              <MenuItem value={"10"}>10</MenuItem>
            </Select>
          </FormControl>
          <span>Packs per page</span>
        </div>
      </div>
    </div>
  );
};
