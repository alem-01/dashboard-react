import React, { useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: 0,
    padding: 0,
    // marginTop: "15px"
  },
});

const list = (arr = [], len = 30, height = 40) => {
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export default function ListSkeleton() {
  const classes = useStyles();
  const [arr] = useState(list);

  return (
    <div className={classes.root}>
      <Skeleton animation="wave" variant="rect" height={118} />
      {arr.map((value) => {
        return <Skeleton key={value} animation="wave" height={40} />;
      })}
    </div>
  );
}
