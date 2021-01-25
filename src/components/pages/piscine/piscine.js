import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Box, Tab, Typography } from "@material-ui/core";

import CollapsibleTable from "./CollapsibleTable";
// import DashboardServices from "../../../services/dashboard-service";

const PiscineInfo = () => {
  // const dashboardServices = new DashboardServices();
  //  { quests, exams, raids } = props;

  return (
    <>
      <h1>Piscine Page</h1>
      <SimpleTabs />
    </>
  );
};

export default PiscineInfo;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // DO collapsed list for each quest with all quest tasks

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Quests" {...a11yProps(0)} />
          <Tab label="Exams" {...a11yProps(1)} />
          <Tab label="Raids" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CollapsibleTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Exams:
      </TabPanel>
      <TabPanel value={value} index={2}>
        Raids:
      </TabPanel>
    </div>
  );
}

/* 100++ quest {
child_id: 3001
child_name: "introduction"
grade: 1
parent_id: 27
parent_name: "Quest 01"​​​
type: "quest"​​​
user_id: 2398
}*/

/* exams: {
child_id: 3202
child_name: "displayz"​​
grade: 1​​
parent_id: 205​​
parent_name: "Exam 01"​​
type: "exam"​​
user_id: 2398
} */

/* raids: {
attrs: "wrong directory and package naming. Kazybek wrote code"
grade: 0​​
parent_id: 206​​
parent_name: "quad"​​
type: "raid"​​
user_id: 2398
} */
