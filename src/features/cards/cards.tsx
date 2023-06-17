import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import s from "./cards.module.scss";
import { SuperButton } from "common/components/super-button/SuperButton";
import { cardsThunks } from "./cardsSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "common/hooks/useAppSelector";
import { authApi } from "features/auth";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TablePagination from "@mui/material/TablePagination";
import {
  cardsCountSelector,
  cardsSelector,
  cardUserIdSelector,
  packNameSelector,
  packUserIdSelector
} from "features/cards/cardsSelectors";
import { DropDownMenu } from "common/components/DropDownMenu/DropDownMenu";
import { SearchCards } from "features/cards/SearchCards/SearchCards";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";


export type QueryParamsTypeCards = {
  cardQuestion: string,
  cardAnswer: string,
  page: number;
  pageCount: number;
};
export const Cards = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);
  const userId = useAppSelector(cardUserIdSelector);
  const packName = useAppSelector(packNameSelector);
  const packUserId = useAppSelector(packUserIdSelector);
  const cardsCount = useAppSelector(cardsCountSelector);
  const { packId } = useParams();
  console.log(packId);
  const url = useLocation().pathname;
  const navigate = useNavigate();
  sessionStorage.setItem("url", url);
  const [queryParams, setQueryParams] = useState<QueryParamsTypeCards>({
    cardQuestion: "",
    cardAnswer: "",
    page: 1,
    pageCount: 4
  });
  console.log("page",queryParams.page);
  console.log("pageCount",queryParams.pageCount);
  const [searchBarValue, setSearchBarValue] = useState(queryParams.cardQuestion);
  const cardsPaginationCount: number = cardsCount
    ? Math.ceil(cardsCount / queryParams.pageCount)
    : 10;
  const handleChangePage = (event: unknown, newPage: number) => {
    setQueryParams({ ...queryParams, page: newPage });
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams({ ...queryParams, pageCount: +event.target.value });
  };
const paginationChangeHandler = (event: React.ChangeEvent<unknown>, value: number) => {
    setQueryParams({ ...queryParams, page: value });
  };
  const changeCountRows = (event: SelectChangeEvent) => {
    setQueryParams({ ...queryParams, pageCount: +event.target.value });
  };
  const removeCardHandle = (cardId: string, packId: string) => {
    dispatch(cardsThunks.removeCard({ cardId }))
      .unwrap()
      .then(() => dispatch(cardsThunks.getCards({ packId, ...queryParams })));
    //TODO catch for every handler
    //TODO remove all "!"
  };

  const addNewCard = (question?: string, answer?: string) => {
    dispatch(cardsThunks.addNewCard({ packId: packId! }))
      .unwrap()
      .then(() => dispatch(cardsThunks.getCards({ packId: packId!, ...queryParams })));
  };

  const editCardHandle = (cardsPackId: string, cardId: string, question: string) => {
    dispatch(cardsThunks.editCard({ cardId, question: " Question" }))
      .unwrap()
      .then(() => dispatch(cardsThunks.getCards({ packId: cardsPackId, ...queryParams })));
  };

  function StarsRating(count: number) {
    let stars = [];

    for (let i = 0; i < count; i++) {
      stars.push(<StarPurple500SharpIcon key={i} />);
    }
    return (
      <TableCell align="right" style={{ display: "flex", color: "yellow" }}>
        {stars}
      </TableCell>
    );
  }

  useEffect(() => {
    // authApi
    //   .login({
    //     email: "knuckostya1@gmail.com",
    //     password: "Sends777",
    //     rememberMe: true,
    //   })
    //   .then(() => authApi.isAuth)
    //   .then(() => {
    //     if (!packId) return;
    //     dispatch(cardsThunks.getCards({ packId: packId }));
    //   });
    if (!packId) return;
    dispatch(cardsThunks.getCards({ packId: packId, ...queryParams }))
      .unwrap()
      .then(() => authApi.isAuth);
  }, [dispatch, queryParams]);

  useEffect(() => {
    let getUrl = sessionStorage.getItem("url");
    navigate(`${getUrl}`);
  }, []);

  return (
    <div className={s.packContainer}>
      <div className={s.insideContainer}>
        <span>
          <Link to={"/packs"} style={{ textDecoration: "none", color: "black" }}>
            <div className={s.backToCards}>
              <ArrowBackIcon style={{ position: "relative", top: "3px", fontSize: "medium" }} />
              <span>Back to packs</span>
            </div>
          </Link>
          <h2 className={s.packName}>
            {packName}
            <DropDownMenu packId={packId} />
          </h2>
        </span>
        <div className={s.searchContainer}>
          <div className={s.bal}>
            <span>Search</span>
            <SearchCards
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              searchValue={searchBarValue}
              setSearchValue={setSearchBarValue}
            />
            {/*<CloseIcon className={s.closeIcon} onClick={() => setInputValue("")} />*/}
          </div>
          {packUserId === userId ? (
            <span>
              <SuperButton
                name={"Add New Card"}
                color={"secondary"}
                height={"40px"}
                width={"auto"}
                onClickCallBack={addNewCard}
              />
            </span>
          ) : null}
        </div>
        <div className={s.cardsContainer}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Question</TableCell>
                  <TableCell align="right">Answers</TableCell>
                  <TableCell align="right">Updated</TableCell>
                  <TableCell align="right">Grade</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cards?.length ? (
                  cards.map((row) => (
                    <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {row.question}
                      </TableCell>
                      <TableCell align="right">{row.answer}</TableCell>
                      <TableCell align="right">
                        <div>{row.updated.slice(5, 10).replace("-", ".")}</div>
                      </TableCell>
                      {!row.grade ? <TableCell align="right">0</TableCell> : StarsRating(row.grade)}
                      <TableCell align="right">
                        {userId === row.user_id ? (
                          <div>
                            <EditIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => editCardHandle(row.cardsPack_id, row._id, row.question)}
                            />
                            <DeleteIcon
                              style={{ marginLeft: "7%", cursor: "pointer" }}
                              onClick={() => removeCardHandle(row._id, row.cardsPack_id)}
                            />
                            {/*<div>*/}
                            {/*  <SuperButton*/}
                            {/*    name={"delete"}*/}
                            {/*    color={"error"}*/}
                            {/*    width={"15px"}*/}
                            {/*    height={"25px"}*/}
                            {/*    onClickCallBack={() => removeCardHandle(row._id, row.cardsPack_id)}*/}
                            {/*  />*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*  <SuperButton*/}
                            {/*    name={"edit"}*/}
                            {/*    color={"primary"}*/}
                            {/*    width={"15px"}*/}
                            {/*    height={"25px"}*/}
                            {/*    onClickCallBack={() =>*/}
                            {/*      editCardHandle(row.cardsPack_id, row._id, row.question)*/}
                            {/*    }*/}
                            {/*  />*/}
                            {/*</div>*/}
                          </div>
                        ) : (
                          "not your card"
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>Cards not added yet</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={s.paginationBlock}>
            <Pagination
              shape={"rounded"}
              count={cardsPaginationCount}
              color="primary"
              page={queryParams.page}
              onChange={paginationChangeHandler}
            />
            <span>Show</span>
            <FormControl>
              <Select value={queryParams.pageCount.toString()} onChange={changeCountRows} autoWidth>
                <MenuItem value={"4"}>4</MenuItem>
                <MenuItem value={"6"}>6</MenuItem>
                <MenuItem value={"8"}>8</MenuItem>
                <MenuItem value={"10"}>10</MenuItem>
              </Select>
            </FormControl>
            <span>Packs per page</span>
          </div>
          {/*<TablePagination*/}
          {/*  rowsPerPageOptions={[4, 6, 8, 10]}*/}
          {/*  component="div"*/}
          {/*  count={cardsPaginationCount}*/}
          {/*  rowsPerPage={queryParams.pageCount}*/}
          {/*  page={queryParams.page}*/}
          {/*  onPageChange={handleChangePage}*/}
          {/*  onRowsPerPageChange={handleChangeRowsPerPage}*/}
          {/*/>*/}
        </div>
      </div>
    </div>
  );
};
