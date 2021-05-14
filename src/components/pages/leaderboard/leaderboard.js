import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import EnhancedTableHead from "./tablehead";
import LeaderboardTableBody from "./tablebody";
import DashboardServices from "../../../services/dashboard-service";
import { AddOrderNum, getMaxXp } from "../../../services";
import { ListSkeleton } from "../../skeleton";
// import EnhancedTableToolbar from "./toolbar";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingBottom: "3%",
    paddingTop: "1%",
  },
  table: {
    color: "white",
  },
  row: {
    cursor: "pointer",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const EnhancedTable = () => {
  const classes = useStyles();
  const [renderStudents, setRenderStudents] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("total_xp");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [page] = useState(0);
  const [maxXp, setMaxXp] = useState(0);
  const { getAllStudents } = new DashboardServices();

  useEffect(() => {
    getAllStudents().then((data) => {
      setRenderStudents(AddOrderNum(data));
      setMaxXp(getMaxXp(data.map((student) => student.total_xp)));
      setRowsPerPage(data.length);
      setLoading(false);
    });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  if (loading) return <ListSkeleton />;

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center" paragraph>
        Students Leaderboard
      </Typography>
      {/* <EnhancedTableToolbar /> // searchbar */}

      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={renderStudents.length}
          />
          <LeaderboardTableBody
            classes={classes}
            renderStudents={renderStudents}
            order={order}
            orderBy={orderBy}
            page={page}
            rowsPerPage={rowsPerPage}
            maxXp={maxXp}
          />
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default EnhancedTable;
