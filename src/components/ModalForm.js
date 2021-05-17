import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons components
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import Person from "@material-ui/icons/Person";
import Image from "@material-ui/icons/Image";
// core components
import componentStyles from "assets/theme/views/auth/login.js";
import { useDispatch } from "react-redux";
import * as authAction from "../store/actions/auth";

const useStyles = makeStyles(componentStyles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ModalForm = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [path, setPath] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");

  const dispatch = useDispatch();

  const cardClasses = { root: classes.cardRoot };
  const buttonClasses = { root: classes.buttonRoot };
  const cardContentClasses = { root: classes.cardContent };
  const checkboxClasses = {
    root: classes.formControlLabelRoot,
    label: classes.formControlLabelLabel,
  };
  const titleTypographyProps = {
    component: Box,
    textAlign: "center",
    marginBottom: "1rem!important",
    marginTop: ".5rem!important",
    fontSize: "1rem!important",
  };
  return (
    <>
      <Dialog
        maxWidth="xs"
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          props.handleClose();
          setPath(null);
          setDisplayName("");
          setEmail("");
          setPassword("");
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Card classes={cardClasses}>
            <CardHeader
              className={classes.cardHeader}
              title={
                <Box
                  fontSize="80%"
                  fontWeight="400"
                  component="b"
                  color={theme.palette.gray[600]}
                >
                  Ini Muncul Ketika Development
                </Box>
              }
              titleTypographyProps={titleTypographyProps}
            ></CardHeader>
            <CardContent classes={cardContentClasses}>
              <Box fontSize="80%" fontWeight="400" component="small">
                Register with Email for Development
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
                  value={email}
                  onChange={(value) => {
                    setEmail(value.target.value);
                  }}
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
                  onChange={(value) => {
                    setPassword(value.target.value);
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Lock />
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
                  type="text"
                  placeholder="Your Name"
                  onChange={(value) => {
                    setDisplayName(value.target.value);
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <label htmlFor="file-button">
                <Button
                  color="primary"
                  variant="contained"
                  component="label"
                  fullWidth
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="file-button"
                    hidden
                    onChange={(event) => {
                      setPath(event.target.files[0]);
                    }}
                  />
                  <Box
                    component={Image}
                    marginRight=".75em"
                    top="2px"
                    position="relative"
                  />
                  Photo Profile
                </Button>
              </label>
              {path && (
                <>
                  {/* <Box fontSize="80%" fontWeight="400" component="small">
                    {path.name}
                  </Box> */}
                  <Box
                    textAlign="center"
                    marginTop="1.5rem"
                    marginBottom="1.5rem"
                  >
                    <img
                      src={URL.createObjectURL(path)}
                      style={{ height: "120", width: "60%" }}
                    />
                  </Box>
                </>
              )}
              <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch(
                      authAction.register(email, password, displayName, path)
                    );
                  }}
                >
                  Register
                </Button>
              </Box>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalForm;
