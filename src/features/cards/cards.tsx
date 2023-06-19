import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import s from "./cards.module.scss";
import { cardsThunks } from "./cardsSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "common/hooks/useAppSelector";
import { authApi } from "features/auth";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  cardsCountSelector,
  cardsSelector,
  cardUserIdSelector,
  packNameSelector,
  packUserIdSelector,
} from "features/cards/cardsSelectors";
import { DropDownMenu } from "common/components/DropDownMenu/DropDownMenu";
import { SearchCards } from "features/cards/SearchCards/SearchCards";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { isLoading_Selector } from "app/appSelector";
import { toast } from "react-toastify";
import { BaseModal } from "common/components/BasicModal/BaseModal";
import { AddCard } from "./modals/AddCard";
import { EditCard } from "./modals/EditCard";
import { DeleteCard } from "./modals/DeleteCard";

export type QueryParamsTypeCards = {
  cardQuestion: string;
  cardAnswer: string;
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
  const isLoading = useAppSelector(isLoading_Selector);
  const { packId } = useParams();
  const url = useLocation().pathname;
  const navigate = useNavigate();
  sessionStorage.setItem("url", url);
  const [queryParams, setQueryParams] = useState<QueryParamsTypeCards>({
    cardQuestion: "",
    cardAnswer: "",
    page: 1,
    pageCount: 4,
  });
  console.log("page", queryParams.page);
  console.log("pageCount", queryParams.pageCount);
  const [searchBarValue, setSearchBarValue] = useState(queryParams.cardQuestion);
  const cardsPaginationCount: number = cardsCount ? Math.ceil(cardsCount / queryParams.pageCount) : 10;
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

  const addNewCardHandle = (question: string, answer: string) => {
    console.log();
    dispatch(cardsThunks.addNewCard({ packId: packId!, answer, question }))
      .unwrap()
      .then(() => dispatch(cardsThunks.getCards({ packId: packId!, ...queryParams })));
  };

  const editCardHandle = (cardsPackId: string, cardId: string, question: string, answer: string) => {
    dispatch(cardsThunks.editCard({ cardId, question, answer }))
      .unwrap()
      .then(() => dispatch(cardsThunks.getCards({ packId: cardsPackId, ...queryParams })))
      .catch((e) => {
        toast.error(e);
      });
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
            {/*{packName?.name}*/}
            {packName}
            {packUserId === userId && <DropDownMenu packId={packId} />}
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
              <BaseModal modalTitle={"Add new card"} buttonType={"base"}>
                {(close) => <AddCard closeModal={close} addCardCallback={addNewCardHandle} />}
              </BaseModal>
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
                            <BaseModal buttonType={"iconEdit"} modalTitle={"Edit card"}>
                              {(close) => (
                                <EditCard
                                  closeModal={close}
                                  editCardCallback={(question, answer) =>
                                    editCardHandle(row.cardsPack_id, row._id, question, answer)
                                  }
                                />
                              )}
                            </BaseModal>
                            <BaseModal buttonType={"iconDelete"} modalTitle={"Delete Card"}>
                              {(close) => (
                                <DeleteCard
                                  closeModal={close}
                                  deleteCardCallback={() => removeCardHandle(row._id, row.cardsPack_id)}
                                />
                              )}
                            </BaseModal>
                            {/*<DeleteIcon*/}
                            {/*  style={{ marginLeft: "7%", cursor: "pointer" }}*/}
                            {/*  onClick={() => removeCardHandle(row._id, row.cardsPack_id)}*/}
                            {/*/>*/}
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
              <CircularProgress color="inherit" />
            </Backdrop>
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
        </div>
      </div>
    </div>
  );
};
