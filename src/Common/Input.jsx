import { TextField } from "@material-ui/core";
import React from "react";

const Input = (props) => {
  const { name, label, student, onChange, error = null, ...other } = props;

  return (
    <>
      <TextField
        variant="outlined"
        label={label}
        name={name}
        value={student}
        onChange={onChange}
        {...other}
        {...(error && { error: true, helperText: error })}
      />
    </>
  );
};

export default Input;
