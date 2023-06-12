import React from "react";
import { useEffect, useState } from "react";
import { useAppSelector } from "common/hooks/useAppSelector";
import { RootState } from "app/store";
import s from "./Packs.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { packsThunks } from "features/packs/packsSlice";
import IconButton from "@mui/material/IconButton";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { SuperButton } from "common/components/super-button/SuperButton";
import { SearchBar } from "features/packs/search-bar/SearchBar";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { PacksSlider } from "features/packs/slider/PacksSlider";
import { BearLoader } from "../../common/components/BearLoader/BearLoader";
import TableSortLabel from "@mui/material/TableSortLabel";

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
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const cardPacks = useAppSelector((state: RootState) => state.packs.cardPacks);
  const packsCount = useAppSelector((state: RootState) => state.packs.cardPacksTotalCount);
  const userId = useAppSelector((state: RootState) => state.auth.profile?._id);
  const minCardsCount = useAppSelector((state: RootState) => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector((state: RootState) => state.packs.maxCardsCount);
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
  const packsPaginationCount: number = packsCount
    ? Math.ceil(packsCount / queryParams.pageCount)
    : 10;

  useEffect(() => {
    dispatch(packsThunks.fetchCardPacksTC(queryParams));
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
    setSearchBarValue("");
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

  const addPackHandler = () => {
    dispatch(
      packsThunks.addCardPackTC({
        name: "test14", //TODO modal
      })
    );
  };
  const deletePackHandler = (id: string) => {
    dispatch(packsThunks.deleteCardPackTC(id));
  };
  const updatePackHandler = (_id: string, name: string) => {
    dispatch(packsThunks.updateCardPackTC({ _id, name }));
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

  return (
    <div className={s.packs}>
      <div className={`container ${s.packsContainer}`}>
        <div className={s.titleBlock}>
          <span className={s.title}>Packs List</span>
          <SuperButton name={"Add new pack"} onClickCallBack={addPackHandler} />
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
              <SuperButton name={"My"} onClickCallBack={showMyPacks} height={"36px"} />
              <SuperButton name={"All"} onClickCallBack={showFriendsPacks} height={"36px"} />
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
              <FilterAltOffIcon />
            </IconButton>
          </div>
        </div>
        {isLoading ? (
          <BearLoader />
        ) : cardPacks.length === 0 ? (
          <div className={s.noPacksError}>
            Колоды не найдены. Измените параметры фильтра / поиска
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{overflowWrap: "break-word", tableLayout: 'fixed'}}>
              <colgroup>
                <col style={{width:'30%'}}/>
                <col style={{width:'10%'}}/>
                <col style={{width:'20%'}}/>
                <col style={{width:'20%'}}/>
                <col style={{width:'15%'}}/>
              </colgroup>
              <TableHead sx={{ background: "#EFEFEF" }}>
                <TableRow  hover={true} >
                  <TableCell sx={{ padding: "16px 16px 16px 36px" ,width: '200px'}}>Name</TableCell>
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
                {cardPacks.map((p) => (
                  <TableRow key={p._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row" sx={{ padding: "16px 16px 16px 36px" }}>
                      {p.name}
                    </TableCell>
                    <TableCell align="left">{p.cardsCount}</TableCell>
                    <TableCell align="left">{changeDateFormat(p.updated)}</TableCell>
                    <TableCell  align="left">
                      {p.user_name}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: "16px 28px 16px 8px" }}>
                      <span style={{width: '33%'}}>
                        { p.cardsCount!==0 &&
                          <IconButton aria-label="learn">
                            <SchoolIcon />
                          </IconButton>}
                      </span>
                      {userId === p.user_id && (
                        <span style={{width: '67%'}}>
                          <IconButton
                            aria-label="edit"
                            onClick={() => updatePackHandler(p._id, "updatedPack13")}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label="delete" onClick={() => deletePackHandler(p._id)}>
                            <DeleteOutlineIcon />
                          </IconButton>
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
