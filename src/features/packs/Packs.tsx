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
import { Link, useNavigate } from "react-router-dom";
import { isLoading_Selector } from "app/appSelector";
import InputLabel from "@mui/material/InputLabel";
import {
  maxCardsCount_Selector,
  minCardsCount_Selector,
  packs_Selector,
  packsCount_Selector,
} from "./packsSelector";
import { isAuth_auth_Selector, userId_auth_Selector } from "../auth/authSelector";
import { Backdrop } from "@mui/material";
import { AddPackModal } from "features/packs/modals/AddPackModal";
import { BaseModal } from "common/components/BasicModal/BaseModal";
import { EditPackModal } from "features/packs/modals/EditPackModal";
import { DeletePackModal } from "features/packs/modals/DeletePackModal";
import { cardsThunks } from "features/cards/cardsSlice";
import { changeDateFormat } from "common/utils/changeDateFormat";
import defaultPackCover from "assets/images/defaultPackCover.svg";
import { toast } from "react-toastify";

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
  const { fetchPacks } = useActions({ ...packsThunks, ...cardsThunks });
  const isLoading = useAppSelector(isLoading_Selector);
  const packs = useAppSelector(packs_Selector);
  const packsCount = useAppSelector(packsCount_Selector);
  const userId = useAppSelector(userId_auth_Selector);
  const minCardsCount = useAppSelector(minCardsCount_Selector);
  const maxCardsCount = useAppSelector(maxCardsCount_Selector);
  const isAuth = useAppSelector(isAuth_auth_Selector);
  const navigate = useNavigate();

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

  if (!isAuth) {
    toast.warning("you are not signed in yet");
    navigate("/login");
  }

  useEffect(() => {
    fetchPacks(queryParams);
  }, [queryParams]);

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

  const onClickPackHandler = () => {};

  return (
    <div className={s.packs}>
      <div className={`container ${s.packsContainer}`}>
        <div className={s.titleBlock}>
          <span className={s.title}>Packs List</span>
          <BaseModal modalTitle={"Add new pack"} buttonType={"base"}>
            {(close) => <AddPackModal closeModal={close} queryParams={queryParams} />}
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
              <SuperButton
                name={"My"}
                onClickCallBack={showMyPacks}
                width={"90px"}
                variant={queryParams.user_id === "" ? "outlined" : "contained"}
              />
              <SuperButton
                name={"All"}
                onClickCallBack={showFriendsPacks}
                width={"90px"}
                variant={queryParams.user_id === "" ? "contained" : "outlined"}
              />
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
          <div className={s.noPacksError}>Pack's not founded. Try to change filter or search parameters</div>
        ) : (
          <TableContainer component={Paper} sx={{ position: "relative" }}>
            <Table sx={{ overflowWrap: "break-word", tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "15%" }} />
              </colgroup>
              <TableHead sx={{ background: "#EFEFEF" }}>
                <TableRow hover={true}>
                  <TableCell align="left"></TableCell>
                  <TableCell sx={{ padding: "16px 16px 16px 36px" }}>
                    <b>Name</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Cards</b>
                  </TableCell>
                  <TableCell align="left" onClick={updatedSortHandler} sx={{ display: "flex" }}>
                    <TableSortLabel
                      active={queryParams.sortPacks !== ""} //should be true for the sorted column
                      direction={queryParams.sortPacks !== "0updated" ? "desc" : "asc"} // The current sort direction /"desc"
                    >
                      <b>Last updated</b>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="left">
                    <b>Created By</b>
                  </TableCell>
                  <TableCell align="left" sx={{ padding: "16px 36px 16px 16px" }}>
                    <b>Actions</b>
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
                    <TableCell align="center" sx={{ padding: 0, paddingLeft: "10px" }}>
                      <img
                        className={s.packLogo}
                        src={p.deckCover ? p.deckCover : defaultPackCover}
                        alt="logo"
                      />
                    </TableCell>
                    <TableCell component="th" scope="row" sx={{ padding: "0px 16px 0px 36px" }}>
                      <Link
                        to={`/cards/pack/${p._id}`}
                        style={{ textDecoration: "none", color: "rgb(154 145 200)" }}
                      >
                        {p.name}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{p.cardsCount}</TableCell>
                    <TableCell align="left">{changeDateFormat(p.updated)}</TableCell>
                    <TableCell align="left">{p.user_name}</TableCell>
                    <TableCell align="left" sx={{ padding: "0px 16px 0px 16px" }}>
                      <span style={{ width: "33%" }}>
                        {p.cardsCount !== 0 && (
                          <IconButton aria-label="learn" component={Link} to={`/learn/${p._id}`}>
                            <SchoolIcon color={"primary"} />
                          </IconButton>
                        )}
                      </span>
                      {userId === p.user_id && (
                        <span style={{ width: "67%" }}>
                          <BaseModal modalTitle={"Edit pack"} buttonType={"iconEdit"}>
                            {(close) => (
                              <EditPackModal
                                closeModal={close}
                                _id={p._id}
                                packName={p.name}
                                cover={p.deckCover}
                                queryParams={queryParams}
                              />
                            )}
                          </BaseModal>
                          <BaseModal modalTitle={"Delete pack"} buttonType={"iconDelete"}>
                            {(close) => (
                              <DeletePackModal
                                closeModal={close}
                                _id={p._id}
                                packName={p.name}
                                queryParams={queryParams}
                              />
                            )}
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
          <span className={s.text}>Show</span>
          <FormControl>
            <InputLabel>Packs</InputLabel>
            <Select
              sx={{ maxHeight: "40px", minWidth: "70px" }}
              color={"primary"}
              value={queryParams.pageCount.toString()}
              onChange={changeRowsNumber}
              // autoWidth
              label="Packs"
            >
              <MenuItem value={"4"}>4</MenuItem>
              <MenuItem value={"6"}>6</MenuItem>
              <MenuItem value={"8"}>8</MenuItem>
              <MenuItem value={"10"}>10</MenuItem>
            </Select>
          </FormControl>
          <span className={s.text}>per page</span>
        </div>
      </div>
    </div>
  );
};
