import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography } from "@material-ui/core";

export default function OpenMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentItem, setCurrentItem] = useState("Div 01");
  const { dataList } = props;
  const handleClick = (event) => {
    console.log("click: ", event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    console.log("close: ", event.target.value);
    setAnchorEl(null); // need use recieved item
    
  };

  useEffect(() => {
    console.log("anchor: ", anchorEl);
  }, []);

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {currentItem}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose/* ("Div01") */}><Typography>Div 01</Typography></MenuItem>
        <MenuItem onClick={handleClose/* ("Piscine Go") */}>Piscine Go</MenuItem>
        {/* <MenuItem onClick={handleClose("Piscine JS")}>Piscine JS</MenuItem> */}
      </Menu>
    </div>
  );
}
