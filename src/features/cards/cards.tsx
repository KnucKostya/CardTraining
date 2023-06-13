import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import s from "./cards.module.scss";
import { SuperButton } from "../../common/components/super-button/SuperButton";
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
import { useAppSelector } from "../../common/hooks/useAppSelector";
import { authApi } from "../auth/authApi";
import { useParams } from "react-router-dom";

// my UserID 6484c990b61ce7c3677f4356

function createData(
  question: string,
  answer: string,
  updated: number,
  grade: number,
  actions?: any
) {
  return { question, answer, updated, grade, actions };
}

export const Cards = () => {
  const cards = useAppSelector((state) => state.cards?.cards?.cards);
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const dispatch = useAppDispatch();
  const { packId } = useParams();

  const [inputValue, setInputValue] = useState<string>("");

  const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const removeCardHandle = (cardId: string, packId: string) => {
    dispatch(cardsThunks.removeCard({ cardId }))
      .unwrap()
      .then(() => dispatch(cardsThunks.getCards({ packId })));
    //TODO catch for every handler
    //TODO remove all "!"
  };

  const addNewCard = (question?: string, answer?: string) => {
    dispatch(cardsThunks.addNewCard({ packId: packId! }))
      .unwrap()
      .then(() => dispatch(cardsThunks.getCards({ packId: packId! })));
  };

  const editCardHandle = (cardsPackId: string, cardId: string, question: string) => {
    dispatch(cardsThunks.editCard({ cardId, question: " Question" }))
      .unwrap()
      .then(() => dispatch(cardsThunks.getCards({ packId: cardsPackId })));
  };

  useEffect(() => {
    authApi
      .login({
        email: "knuckostya1@gmail.com",
        password: "Sends777",
        rememberMe: true,
      })
      .then(() => authApi.isAuth)
      .then(() => {
        if (!packId) return;
        dispatch(cardsThunks.getCards({ packId: packId }));
      });
  }, [dispatch]);

  return (
    <div className={s.packContainer}>
      <div className={s.insideContainer}>
        <h2 className={s.packName}>Pack Name</h2>
        <div className={s.searchContainer}>
          <div className={s.bal}>
            <SearchIcon className={s.searchIcon} />
            <input
              className={s.input}
              placeholder="Search..."
              value={inputValue}
              onChange={onInputChangeHandler}
            ></input>
            <CloseIcon className={s.closeIcon} onClick={() => setInputValue("")} />
          </div>
          {cards?.[0]?.user_id === userId ? (
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
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.question}
                      </TableCell>
                      <TableCell align="right">{row.answer}</TableCell>
                      <TableCell align="right">
                        <div>{row.updated.slice(5, 10).replace("-", ".")}</div>
                      </TableCell>
                      <TableCell align="right">{row.grade}</TableCell>
                      <TableCell align="right">
                        {userId === row.user_id ? (
                          <div>
                            <div>
                              <SuperButton
                                name={"delete"}
                                color={"error"}
                                width={"15px"}
                                height={"25px"}
                                onClickCallBack={() => removeCardHandle(row._id, row.cardsPack_id)}
                              />
                            </div>
                            <div>
                              <SuperButton
                                name={"edit"}
                                color={"primary"}
                                width={"15px"}
                                height={"25px"}
                                onClickCallBack={() =>
                                  editCardHandle(row.cardsPack_id, row._id, row.question)
                                }
                              />
                            </div>
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
          <div className={s.paginationContainer}>
            -----------------pagination for Valentin----------------
          </div>
        </div>
      </div>
    </div>
  );
};
