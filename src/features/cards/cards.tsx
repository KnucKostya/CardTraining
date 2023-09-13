import React, { useEffect, useState } from "react";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  cards_Count_Selector,
  cards_Selector,
  cardUserIdSelector,
  pack_Name_Selector,
  pack_UserId_Selector,
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
import { AddCard, AddCardCallbackType } from "features/cards/modals/addCard/AddCard";
import { EditCard } from "features/cards/modals/editCard/EditCard";
import { DeleteCard } from "./modals/DeleteCard";
import { changeDateFormat } from "common/utils/changeDateFormat";
import { StarsRating } from "features/cards/StarsRating";
import { isAuth_auth_Selector } from "features/auth/authSelector";
import { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

export type QueryParamsTypeCards = {
  cardQuestion: string;
  cardAnswer: string;
  page: number;
  pageCount: number;
};
export const Cards = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cards_Selector);
  const userId = useAppSelector(cardUserIdSelector);
  const packName = useAppSelector(pack_Name_Selector);
  const packUserId = useAppSelector(pack_UserId_Selector);
  const cardsCount = useAppSelector(cards_Count_Selector);
  const isLoading = useAppSelector(isLoading_Selector);
  const isAuth = useAppSelector(isAuth_auth_Selector);
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
  const [sortGrade, setSortGrade] = useState<number>(0);
  const [searchBarValue, setSearchBarValue] = useState(queryParams.cardQuestion);

  if (!isAuth) {
    navigate("/login");
  }

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
      .then(() => dispatch(cardsThunks.getCards({ packId, ...queryParams, sortBy: sortGrade })))
      .catch((e: AxiosError) => {
        e ? toast.error(e.message) : toast.error("check your network connection");
      });
  };

  const addNewCardHandle = ({ answer, question, answerImg, questionImg }: AddCardCallbackType) => {
    dispatch(cardsThunks.addNewCard({ packId: packId!, answer, question, questionImg, answerImg }))
      .unwrap()
      .then(() => dispatch(cardsThunks.getCards({ packId: packId!, ...queryParams, sortBy: sortGrade })))
      .catch((e: AxiosError) => {
        e ? toast.error(e.message) : toast.error("check your network connection");
      });
  };

  const editCardHandle = (
    cardsPackId: string,
    cardId: string,
    question: string,
    answer: string,
    questionImg: string,
    answerImg: string
  ) => {
    dispatch(cardsThunks.editCard({ cardId, question, answer, questionImg, answerImg }))
      .unwrap()
      .then(() => dispatch(cardsThunks.getCards({ packId: cardsPackId, ...queryParams, sortBy: sortGrade })))
      .catch((e: AxiosError) => {
        e ? toast.error(e.message) : toast.error("check your network connection");
      });
  };

  useEffect(() => {
    if (!packId) return;
    dispatch(cardsThunks.getCards({ packId: packId, ...queryParams, sortBy: sortGrade }))
      .unwrap()
      .then(() => authApi.isAuth)
      .catch(() => {
        //error handling in thunkTryCatch
      });
  }, [dispatch, queryParams, sortGrade]);

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
        </span>
        <span className={s.packAddName}>
          <h2 className={s.packName}>
            {packName}
            {packUserId === userId && <DropDownMenu packId={packId} />}
          </h2>
          {packUserId === userId ? (
            <span>
              <BaseModal modalTitle={"Add new card"} buttonType={"base"}>
                {(close) => <AddCard closeModal={close} addCardCallback={addNewCardHandle} />}
              </BaseModal>
            </span>
          ) : null}
        </span>
        <div className={s.searchContainer}>
          <div className={s.search}>Search</div>
          <SearchCards
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            searchValue={searchBarValue}
            setSearchValue={setSearchBarValue}
          />
        </div>
        <div className={s.cardsContainer}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Question</TableCell>
                  <TableCell align="right">Answers</TableCell>
                  <TableCell align="right">Updated</TableCell>
                  <TableCell
                    align="right"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSortGrade((value: number) => (value === 1 ? 0 : 1))}
                  >
                    Grade{" "}
                    {sortGrade === 0 ? (
                      <FontAwesomeIcon icon={faArrowUp} size="xs" />
                    ) : (
                      <FontAwesomeIcon icon={faArrowDown} size="xs" />
                    )}
                  </TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cards?.length ? (
                  cards.map((row) => (
                    <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {row.questionImg ? (
                          <img src={row.questionImg} alt="question image" className={s.photo} />
                        ) : (
                          row.question
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {row.answerImg ? (
                          <img src={row.answerImg} alt="answer image" className={s.photo} />
                        ) : (
                          row.answer
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <div>{changeDateFormat(row.updated)}</div>
                      </TableCell>
                      {!row.grade ? <TableCell align="right">0</TableCell> : StarsRating(row.grade)}
                      <TableCell align="right">
                        {userId === row.user_id ? (
                          <div>
                            <BaseModal buttonType={"iconEdit"} modalTitle={"Edit card"}>
                              {(close) =>
                                row.answerImg ? (
                                  <EditCard
                                    closeModal={close}
                                    editCardCallback={(question, answer, questionImg, answerImg) =>
                                      editCardHandle(
                                        row.cardsPack_id,
                                        row._id,
                                        question,
                                        answer,
                                        questionImg,
                                        answerImg
                                      )
                                    }
                                    isImage={true}
                                  />
                                ) : (
                                  <EditCard
                                    closeModal={close}
                                    editCardCallback={(question, answer, questionImg, answerImg) =>
                                      editCardHandle(
                                        row.cardsPack_id,
                                        row._id,
                                        question,
                                        answer,
                                        questionImg,
                                        answerImg
                                      )
                                    }
                                    isImage={false}
                                  />
                                )
                              }
                            </BaseModal>
                            <BaseModal buttonType={"iconDelete"} modalTitle={"Delete Card"}>
                              {(close) => (
                                <DeleteCard
                                  closeModal={close}
                                  deleteCardCallback={() => removeCardHandle(row._id, row.cardsPack_id)}
                                />
                              )}
                            </BaseModal>
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
