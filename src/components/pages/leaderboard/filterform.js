import React from "react";
import { TextField } from "@material-ui/core";

const FilterForm = () => {
  return (
    <div className="FilterForm">
      <h3>FilterForm</h3>
      <TextField id="standard-search" label="Search field" type="search" />
    </div>
  );
};
export default FilterForm;
