import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import TableCell from "@mui/material/TableCell";
import React from "react";

export const StarsRating = (count: number) => {
  let stars = [];

  for (let i = 0; i < count; i++) {
    stars.push(<StarPurple500SharpIcon key={i} />);
  }
  return (
    <TableCell align="right" style={{ color: "yellow" }}>
      {stars}
    </TableCell>
  );
};
