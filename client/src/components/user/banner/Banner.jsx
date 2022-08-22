import { Box } from "@mui/material";
import axios from "axios";
import serverURL from "../../../serverURL";
import React, { useEffect } from "react";
import SearchBar from "../searchBox/SearchBox";
import BookData from "../../../Data.json";
import { Collapse } from "@material-ui/core";
import { useState } from "react";

const Banner = () => {
  const style = {
    backgroundImage: `url(../../../bg-hom.jpg)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    // backgroundSize: "100% 100%",
    // height:"35rem",
    // marginTop:"20px",
    height: "50em",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center"
  };

  const [checked, setChecked] = useState();

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className="">
      <Box sx={style}>
        <Collapse in={checked}
        {...(checked ? {timeout :500}:{})}
        collapsedHeight={70}
        >
          <SearchBar placeholder="Where to ? " data={BookData} />
        </Collapse>
      </Box>
    </div>
  );
};

export default Banner;
