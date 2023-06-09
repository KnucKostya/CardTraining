import React, { useEffect } from "react";
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
import { instance } from "../../common/instance/instance";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector } from "../../common/hooks/useAppSelector";

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
  const cards = useAppSelector((state) => state.cards.cards);
  const dispatch = useAppDispatch();

  console.log("cards", cards);

  // const {answer,question, ...} = selector
  const rows = [createData("question", "answer", 6.0, 24)];

  useEffect(() => {
    setTimeout(() => {
      instance.post("auth/login", {
        email: "knuckostya@gmail.com",
        password: "12Dff22313",
        rememberMe: true,
      });
    }, 1000);
    setTimeout(() => {
      instance.post("auth/me");
    }, 2500);

    // setTimeout(() => {
    //   instance.post("cards/card", {
    //     card: {
    //       cardsPack_id: "64820d3d8f5de40420e18921",
    //       question: "question",
    //       answer: "answer",
    //     },
    //   });
    // }, 6500);

    setTimeout(() => {
      dispatch(cardsThunks.getCards());
    }, 4000);
  }, [dispatch]);

  return (
    <div className={s.packContainer}>
      <div className={s.insideContainer}>
        <h2 className={s.packName}>Pack Name</h2>
        <div className={s.searchContainer}>
          <div>
            <SearchIcon className={s.searchIcon} />
            <input placeholder="Search..."></input>
          </div>

          <span>
            <SuperButton name={"Add New Card"} color={"secondary"} height={"40px"} width={"auto"} />
          </span>
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
                {rows.map((row) => (
                  <TableRow
                    key={row.question}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.question}
                    </TableCell>
                    <TableCell align="right">{row.answer}</TableCell>
                    <TableCell align="right">{row.updated}</TableCell>
                    <TableCell align="right">{row.grade}</TableCell>
                    <TableCell align="right">
                      <div>
                        <SuperButton
                          name={"delete"}
                          color={"error"}
                          width={"15px"}
                          height={"25px"}
                        />
                      </div>
                      <div>
                        <SuperButton
                          name={"edit"}
                          color={"primary"}
                          width={"15px"}
                          height={"25px"}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
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
