import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  makeStyles,
  Typography,
} from "@material-ui/core";
// import FormControlLabel from "@material-ui/core/FormControlLabel";

import ProgressBar from "../../progressbar";
import { humanFileSize, getMaxXp } from "../../../services";
import EnhancedTableHead from "./tablehead";
import { AddOrderNum, getComparator, stableSort } from "./tools";
import DashboardServices from "../../../services/dashboard-service";
import { ListSkeleton } from "../../skeleton";
// import EnhancedTableToolbar from "./toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: "70vh",
  },
  paper: {
    width: "100%",
  },
  table: {
    minWidth: 750,
    color: "white",
    cursor: "default"
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

  const handleClick = (event, login) => {
    history.push(`/profile/${login}`);
  };

  /*
    // maybe will need in future
    const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }; */

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, renderStudents.length - page * rowsPerPage);

  if (loading) return <ListSkeleton />;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center" paragraph>
          Students Leaderboard
        </Typography>
        {/* <EnhancedTableToolbar /> */}

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
                      className={classes.tb}
                    >
                      <TableCell padding="checkbox">{row.num}</TableCell>

                      <TableCell component="th" id={row.login} scope="row">
                        {row.login}
                      </TableCell>

                      <TableCell align="right">
                        <ProgressBar current={row.total_xp} MAX={maxXp} />
                      </TableCell>

                      <TableCell align="right">
                        {humanFileSize(row.total_xp)}
                      </TableCell>
                      <TableCell align="right">{row.generation}</TableCell>
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
        {/* <TablePagination
          rowsPerPageOptions={[25, 50, 75]}
          component="div"
          count={renderStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </div>
  );
};

export default withRouter(EnhancedTable);
