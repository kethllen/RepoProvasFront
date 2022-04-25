import { Box } from "@mui/system";
import React from "react";

const styles = {
    width: "fit-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
};

interface Props {
  children: React.ReactNode;
}

function Form({ children }: Props) {
  return (
    <Box component="form" sx={styles}>
      {children}
    </Box>
  );
}

export default Form;