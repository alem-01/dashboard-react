import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ProgressBar from "../../progressbar";
import { humanFileSize, getMaxXp } from "../../../services";
import EnhancedTableHead from "./tablehead";
import { AddOrderNum, getComparator, stableSort } from "./tools";
import DashboardServices from "../../../services/dashboard-service";
import { ListSkeleton } from "../../skeleton";
// import EnhancedTableToolbar from "./toolbar";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingBottom: "3%",
    paddingTop: "1%",
  },
  table: {
    color: "white",
    cursor: "default",
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

const dashboardServices = new DashboardServices();

const EnhancedTable = ({ history }) => {
  const classes = useStyles();
  const [renderStudents, setRenderStudents] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("total_xp");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [page] = useState(0);
  const [maxXp, setMaxXp] = useState(0);

  useEffect(() => {
    dashboardServices.getAllStudents().then((data) => {
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

  const handleClick = (event, login) => history.push(`/profile/${login}`);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, renderStudents.length - page * rowsPerPage);

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
          <TableBody>
            {stableSort(renderStudents, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.login)}
                    tabIndex={-1}
                    key={index}
                  >
                    <TableCell padding="checkbox" id="tableNum">
                      {row.num}
                    </TableCell>

                    <TableCell component="th" id={row.login} scope="row">
                      {row.login}
                    </TableCell>

                    <TableCell align="right" id="tableProgress">
                      <ProgressBar current={row.total_xp} MAX={maxXp} />
                    </TableCell>

                    <TableCell align="right">
                      {humanFileSize(row.total_xp)}
                    </TableCell>
                    <TableCell align="right" id="tableGeneration">
                      {row.generation}
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default withRouter(EnhancedTable);
