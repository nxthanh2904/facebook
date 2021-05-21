import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Hidden, Paper } from "@material-ui/core";
import Header from "../modules/header/Header";
import { lightPrimary } from "../assets/Colors";
import Style from "./Style";

const LayoutWithHeader = (props) => {
  const mode = useSelector((state) => state.util);

  const muiTheme = createMuiTheme({
    palette: {
      type: mode ? "dark" : "light",
    },
  });

  const classes = Style();
  return (
    <ThemeProvider theme={muiTheme}>
      <Paper
        elevation={0}
        className={classes.root}
        style={{ backgroundColor: !mode && lightPrimary }}
      >

        <Grid className={classes.app}>
          <Grid item container className={classes.app__header}>
            {/* ----Header---- */}
            <Header />
          </Grid>
          <Grid item container className={classes.app__body}>
            {/* ----Body---- */}


            <Grid item container className={classes.body__feed} xs={12} sm={8} md={6}>

              {props.children}

            </Grid>


          </Grid>
        </Grid>

      </Paper>
    </ThemeProvider>
  );
};


export default LayoutWithHeader;