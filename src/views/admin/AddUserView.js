import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import {
  FormLabel,
  Box,
  Card,
  CardContent,
  FilledInput,
  FormControl,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { SendRounded, Image } from "@material-ui/icons";
import swal from "sweetalert";
import Lottie from "lottie-react";

import componentStyles from "../../assets/theme/views/admin/profile";
import Header from "../../components/Headers/Header";
import loadingComponent from "../../components/LottieJSON/loading.json";
import * as authAction from "../../store/actions/auth";

const useStyles = makeStyles(componentStyles);

const AddUserView = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const cardContentClasses = { root: classes.cardContent };

  const auth = useSelector((state) => state.auth);

  const authData = auth?.users.find(
    (auth) => auth.uid === props.location?.query?.uid
  );

  const [data, setData] = useState({
    email: null,
    password: null,
    typeUser: authData?.typeUser ?? null,
    displayName: null,
    photoURL: null,
  });

  const submitHandler = () => {
    if (authData) {
      // alert('Update')
      dispatch(authAction.updateUser(authData.uid, data.typeUser))
    } else {
      // alert('Register')
      dispatch(authAction.register(data.email, data.password, data.displayName, data.photoURL))
    }
  };

  const deleteHandler = (id, imageUrl) => {
    dispatch(authAction.deleteUser(id, imageUrl));
  };

  let renderContent = (
    <Card
      classes={{
        root: classes.cardRoot + " " + classes.cardRootSecondary,
      }}
    >
      <CardContent classes={cardContentClasses}>
        <FormLabel>Email</FormLabel>
        <FormControl
          variant="filled"
          component={Box}
          width="100%"
          marginBottom="1rem!important"
        >
          <FilledInput
            autoComplete="off"
            type="text"
            placeholder="Email"
            disabled={authData ? true : false}
            defaultValue={authData && authData.email}
            onChange={(value) => {
              setData({ ...data, email: value.target.value });
            }}
          />
        </FormControl>
        {!authData && (
          <div>
            <FormLabel>Password</FormLabel>
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
                  setData({ ...data, password: value.target.value });
                }}
              />
            </FormControl>
          </div>
        )}
        <FormLabel>Nama</FormLabel>
        <FormControl
          variant="filled"
          component={Box}
          width="100%"
          marginBottom="1rem!important"
        >
          <FilledInput
            autoComplete="off"
            type="text"
            placeholder="Nama"
            defaultValue={authData && authData.displayName}
            onChange={(value) => {
              setData({ ...data, displayName: value.target.value });
            }}
          />
        </FormControl>
        <FormLabel>Role</FormLabel>
        <FormControl
          variant="filled"
          component={Box}
          width="100%"
          marginBottom="1rem!important"
        >
          <Select
            onChange={(event) => {
              setData({
                ...data,
                typeUser: event.target.value,
              });
            }}
            value={data.typeUser}
          >
            <MenuItem value="1">Admin</MenuItem>
            <MenuItem value="2">User</MenuItem>
          </Select>
        </FormControl>
        {authData?.photoURL && (
          <>
            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
              <img
                src={authData?.photoURL}
                style={{ height: "30", width: "60%" }}
              />
            </Box>
          </>
        )}
        {data.photoURL && (
          <>
            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
              <img
                src={URL.createObjectURL(data.photoURL)}
                style={{ height: "30", width: "60%" }}
              />
            </Box>
          </>
        )}
        {!authData && (
          <label htmlFor="add-category">
            <Button color="secondary" variant="contained" component="label">
              <input
                type="file"
                accept="image/*"
                id="add-category"
                hidden
                onChange={(event) => {
                  setData({
                    ...data,
                    photoURL: event.target.files[0],
                  });
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
        )}
        <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={(event) => {
              event.preventDefault();
              if (data.name === null) {
                swal({
                  title: "Data tidak berhasil diunggah",
                  text: "Harap mengisi nama kategori",
                  icon: "warning",
                });
              } else {
                submitHandler();
              }
            }}
          >
            <Box
              component={SendRounded}
              marginRight=".75em"
              top="2px"
              position="relative"
            />
            Kirim
          </Button>
        </Box>
        {authData && (
          <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
            <Button
              color="default"
              variant="outlined"
              fullWidth
              onClick={(event) => {
                event.preventDefault();
                deleteHandler(authData?.uid, authData?.photoURL);
              }}
            >
              Delete
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const renderLoading = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30vh",
        }}
      >
        <Lottie
          animationData={loadingComponent}
          style={{
            height: 100,
            width: 100,
            alignSelf: "center",
          }}
        />
      </div>
    );
  };

  return (
    <div>
      <Header />
      {auth.loading ? renderLoading() : renderContent}
    </div>
  );
};

export default AddUserView;
