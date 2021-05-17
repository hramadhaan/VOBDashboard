import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons components
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import ModalForm from "../../components/ModalForm";

// core components
import componentStyles from "assets/theme/views/auth/login.js";

// REDUX
import * as authActions from "../../store/actions/auth";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(componentStyles);

function Login() {
  const classes = useStyles();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [modal, showModal] = useState(false);

  const handleClose = () => {
    showModal(false);
  };

  const dispatch = useDispatch();

  return (
    <>
      <Grid item xs={12} lg={5} md={7}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardContent classes={{ root: classes.cardContent }}>
            <Box
              color={theme.palette.gray[600]}
              textAlign="center"
              marginBottom="1rem"
              fontSize="1rem"
            >
              <Box fontSize="80%" fontWeight="400" component="small">
                Masuk dengan E-Mail dan Password
              </Box>
            </Box>
            <Box
              color={theme.palette.gray[600]}
              textAlign="center"
              marginBottom="1rem"
              fontSize="1rem"
            >
              <Button
                color="primary"
                variant="contained"
                onClick={(event) => {
                  event.preventDefault();
                  showModal(true);
                }}
              >
                this button for dev register
              </Button>
            </Box>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="email"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                }
              />
            </FormControl>

            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
              <Button
                color="primary"
                variant="contained"
                disabled={
                  !/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(
                    email
                  )
                }
                onClick={() => {
                  // event.preventDefault()
                  dispatch(authActions.login(email, password));
                  console.log("Email: ", email);
                }}
              >
                Masuk
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <ModalForm open={modal} handleClose={handleClose} />
    </>
  );
}

export default Login;
