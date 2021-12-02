import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import AddStudentModal from "./AddStudentModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(2),
    color: "#115293",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <AddStudentModal />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Grid>
    </>
  );
};

export default Header;
