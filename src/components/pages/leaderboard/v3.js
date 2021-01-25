import React, { useEffect, useState } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

import FilterForm from "./filterform";
import useTable from "../../components/useTable";
import ProgressBar from "../../components/progressbar";
import { convertXp, customFetch, getMaxXp } from "../../services";

const useStyles = makeStyles((theme) => {
  pageContent: {
    margin: theme.spacing(5);
    padding: theme.spacing(3);
  }
});

const rows = [
  { id: 1, login: "Snow", generation: "2019", total_xp: 32035 },
  { id: 2, login: "Lannister", generation: "2020", total_xp: 42032 },
  { id: 3, login: "Lannister", generation: "2019", total_xp: 42035 },
  { id: 4, login: "Stark", generation: "2020", total_xp: 12036 },
  { id: 5, login: "Targaryen", generation: "2019", total_xp: 203 },
  { id: 6, login: "Melisandre", generation: "2019", total_xp: 120350 },
  { id: 7, login: "Clifford", generation: "2019", total_xp: 42034 },
  { id: 8, login: "Frances", generation: "2020", total_xp: 32036 },
  { id: 9, login: "Roxie", generation: "2019", total_xp: 62035 },
];

const headCells = [
  { id: "login", label: "Login" },
  { id: "progress", label: "Progress" },
  { id: "xp", label: "XP" },
  { id: "generation", label: "Generation" },
];

const LeaderBoard = (props) => {
  const styles = useStyles();
  const [users, setUsers] = useState(rows);
  // const [users, setUsers] = useState(props.users);
  const [maxXp, setMaxXp] = useState(0);

  useEffect(() => {
    setMaxXp(getMaxXp(users));
  }, []);

  const { TblContainer, TblHead, TblPagination } = useTable(users, headCells);

  return (
    <div>
      <FilterForm />
      <Paper className={styles.pageContent}>
        <TblContainer>
          <TblHead />

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                {/* <TableCell>{user.id}</TableCell> */}
                <TableCell align="center">{user.login}</TableCell>
                <TableCell key="progress">
                  <ProgressBar current={user.total_xp} MAX={maxXp} />
                </TableCell>
                <TableCell align="center">{user.total_xp}</TableCell>
                <TableCell align="center">{user.generation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </div>
  );
};

export default LeaderBoard;
