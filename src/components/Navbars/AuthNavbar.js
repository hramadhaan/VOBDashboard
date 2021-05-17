import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";


import Toolbar from "@material-ui/core/Toolbar";

// core components
import componentStyles from "assets/theme/components/auth-navbar.js";

const useStyles = makeStyles(componentStyles);

export default function AuthNavbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="absolute" color="transparent" elevation={0}>
        <Toolbar>
          <Container
            display="flex!important"
            justifyContent="space-between"
            alignItems="center"
            marginTop=".75rem"
            component={Box}
            maxWidth="xl"
          >
            <Box
              alt="..."
              height="30px"
              component="img"
              className={classes.headerImg}
              src={require("assets/img/brand/argon-react-white.png").default}
            />
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
