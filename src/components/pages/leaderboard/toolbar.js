import React from "react";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";

// import {rows} from "./leaderboard";
// const handleChange = (input = "") => {};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingUp: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  // const { numSelected } = props;

  return (
    <Toolbar className={classes.root}>
      {/* <TextField
        id="search"
        label="Search field"
        type="search"
        variant="outlined"
      /> */}

      <Autocomplete
        id="combo-box-demo"
        // options={rows}
        getOptionLabel={(option) => option.login}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Search student" variant="outlined" />
        )}
      />
      <Accordion>
        <AccordionSummary>
          <Typography>Generations</Typography>
        </AccordionSummary>
        <ButtonGroup
          size="large"
          color="primary"
          aria-label="large outlined primary button group"
        >
          <Button>10.19</Button>
          <Button>11.19</Button>
          <Button>03.20</Button>
        </ButtonGroup>
      </Accordion>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
