import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import { Controls } from "./Controls";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));
const ConfirmDialog = (props) => {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <>
      <Dialog open={ConfirmDialog.isOpen} classes={{ paper: classes.dialog }}>
        <DialogTitle className={classes.dialogTitle}>
          <IconButton disableRipple className={classes.titleIcon}>
            <NotListedLocationIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="h6">{ConfirmDialog.title}</Typography>
          <Typography variant="subtitle2">{ConfirmDialog.subtitle}</Typography>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <Controls.Button
            text="No"
            color="default"
            onClick={() =>
              setConfirmDialog({ ...ConfirmDialog, isOpen: false })
            }
          />
          <Controls.Button
            text="Yes"
            color="secondary"
            onClick={ConfirmDialog.onConfirm}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
