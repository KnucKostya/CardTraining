import c from "features/app/ProgressBar/ProgressBar.module.scss";
import { LinearProgress } from "@mui/material";
import React from "react";

export const ProgressBar = () => {
  return (
    <div className={c.barWrapper}>
      <LinearProgress
        value={20}
        sx={{
          height: 7,
          borderRadius: 5,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          "& .MuiLinearProgress-bar": {
            borderRadius: 5,
            backgroundColor: "#1a90ff",
          },
        }}
      />
    </div>
  );
};
