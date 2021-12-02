import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import StreetviewIcon from "@material-ui/icons/Streetview";

const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: orange[400],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  mainGrid: {
    margin: "20px",
    padding: "10px",
    alignItems: "center",
  },
  paperStyle: {
    padding: "20px",
    height: "75vh",
    width: 400,
    margin: "0 auto",
  },
  avatarStyle: {
    backgroundColor: "#1bbd7e",
  },
  heading: {
    margin: "10px",
  },
  textField: {
    width: "100%",
  },
  button: {
    width: "100%",
  },
});

const View = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const history = useHistory();
  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(`http://localhost:3000/students/${id}`);
        // console.log(student.data);
        setStudent(student.data);
      } catch (error) {
        console.log("Something is wrong");
      }
    }
    getStudent();
  }, [id]);

  function handleClick() {
    history.push("/");
  }

  return (
    <>
      <Grid className={classes.mainGrid}>
        <Paper className={classes.paperStyle} elevation={5}>
          <Grid align="center">
            <Avatar className={classes.avatarStyle}>
              <StreetviewIcon />
            </Avatar>
            <h2 className={classes.heading}>View Student Details</h2>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} p={2}>
              <TextField
                autoComplete="id"
                name="id"
                variant="outlined"
                id="id"
                label="ID"
                autoFocus
                value={id}
                disabled
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12} p={2}>
              <TextField
                autoComplete="stuname"
                name="stuname"
                variant="outlined"
                id="stuname"
                // label="Name"
                value={student.stuname}
                disabled
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12} p={2}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                id="email"
                // label="Email"
                value={student.email}
                disabled
                className={classes.textField}
              />
            </Grid>

            <Grid item xs={12} p={2}>
              <Box textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleClick}
                >
                  Back To Home
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default View;
