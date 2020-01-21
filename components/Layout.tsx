import React, { useEffect } from "react";
import Head from "next/head";

import CssBaseline from "@material-ui/core/CssBaseline";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";

import MenuIcon from "@material-ui/icons/Menu";
import LabelIcon from "@material-ui/icons/Label";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/YunYouJun/webgl-lab"
        target="_blank"
      >
        YunYouJun - WebGL Lab
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  list: {
    width: 250
  }
}));

function getExamples() {
  return [
    { id: "bezier-curve", title: "Bézier curve" },
    { id: "model-view", title: "Moodel View" },
    { id: "hello-canvas", title: "Hello Canvas" }
  ];
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function Layout(props) {
  const classes = useStyles({});

  const [state, setState] = React.useState({
    drawer: false
  });

  useEffect(() => {
  }, []);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, drawer: open });
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {getExamples().map(example => (
          <ListItemLink href={`/${example.id}`} button key={example.id}>
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary={example.title} />
          </ListItemLink>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <Head>
        <title>{props.title} - WebGL Lab</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            WebGL Lab - {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={state.drawer} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
      <main>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {props.children}
            </Grid>
          </Grid>
          <Box py={2}>
            <Copyright />
          </Box>
        </Container>
      </main>
      {/* <style jsx global>{`
        .demo-canvas {
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
        }
      `}</style> */}
    </div>
  );
}
