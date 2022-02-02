import React, { useEffect } from 'react'
import Head from 'next/head'

import {
  AppBar,
  Box,
  CssBaseline,
  Container,
  Drawer,
  Grid,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import LabelIcon from '@mui/icons-material/Label'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://github.com/YunYouJun/webgl-lab"
        target="_blank"
      >
        YunYouJun - WebGL Lab
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function getExamples() {
  return [
    { id: 'bezier-curve', title: 'Bézier curve' },
    { id: 'model-view', title: 'Moodel View' },
    { id: 'hello-canvas', title: 'Hello Canvas' },
  ]
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />
}

export default function Layout(props) {
  const [state, setState] = React.useState({
    drawer: false,
  })

  useEffect(() => {}, [])

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState({ ...state, drawer: open })
    }

  const sideList = () => (
    <div
      style={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {getExamples().map((example) => (
          <ListItemLink href={`/${example.id}`} button key={example.id}>
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary={example.title} />
          </ListItemLink>
        ))}
      </List>
    </div>
  )

  return (
    <div>
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
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">WebGL Lab - {props.title}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={state.drawer} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
      <main>
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
  )
}
