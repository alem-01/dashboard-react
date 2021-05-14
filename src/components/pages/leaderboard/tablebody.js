import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import ProgressBar from "../../progressbar";
import { getComparator, humanFileSize, stableSort } from "../../../services";

function LeaderboardTableBody(props) {
  const {
    classes,
    history,
    renderStudents,
    order,
    orderBy,
    rowsPerPage,
    page,
    maxXp,
  } = props;

  const handleClick = (login) => history.push(`/profile/${login}`);
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, renderStudents.length - page * rowsPerPage);

  return (
    <TableBody>
      {stableSort(renderStudents, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(({ login, num, total_xp, generation }, index) => {
          return (
            <TableRow
              hover
              onClick={() => handleClick(login)}
              tabIndex={-1}
              key={index}
              className={classes.row}
            >
              <TableCell padding="checkbox" id="tableNum">
                {num}
              </TableCell>

              <TableCell component="th" id={login} scope="row">
                {login}
              </TableCell>

              <TableCell align="right" id="tableProgress">
                <ProgressBar current={total_xp} MAX={maxXp} />
              </TableCell>

              <TableCell align="right">{humanFileSize(total_xp)}</TableCell>
              <TableCell align="right" id="tableGeneration">
                {generation}
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
  );
}

LeaderboardTableBody.propTypes = {
  classes: PropTypes.object.isRequired,
  renderStudents: PropTypes.array.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  maxXp: PropTypes.number.isRequired,
};

export default withRouter(LeaderboardTableBody);
