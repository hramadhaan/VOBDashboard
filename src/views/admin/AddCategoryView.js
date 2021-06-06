import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

// core components
import componentStyles from "assets/theme/views/admin/profile.js";
import {
  FormLabel,
  Box,
  Card,
  CardContent,
  FilledInput,
  FormControl,
  Button,
  Typography,
} from "@material-ui/core";
import Header from "components/Headers/Header";
import { useDispatch, useSelector } from "react-redux";
import { Image, SendRounded } from "@material-ui/icons";

import * as categoryAction from "../../store/actions/category";
import swal from "sweetalert";
import Lottie from "lottie-react";

import loadingComponent from "../../components/LottieJSON/loading.json";

const useStyles = makeStyles(componentStyles);

const AddCategoryView = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const cardContentClasses = { root: classes.cardContent };

  const categoryData = useSelector((state) => state.category);

  const selectedData = categoryData?.category.find(
    (cat) => cat.id === props.location?.query?.id
  );

  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: null,
    image: null,
  });

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

  const submitHandler = () => {
    // alert(data.name);
    if (selectedData) {
      // do update
      dispatch(
        categoryAction.updateCategory(
          props.location?.query?.id,
          data,
          selectedData.image
        )
      );
      // alert(data)
      // console.log('Submit: ', data)
    } else {
      dispatch(categoryAction.addCategory(data));
    }
  };

  const deleteHandler = () => {
    swal("Apakah Anda yakin ingin menghapus data tersebut ?", {
      buttons: {
        cancel: "Tidak",
        yes: {
          text: "Iya",
          value: "yes",
        },
      },
    }).then((value) => {
      if (value === "yes") {
        dispatch(
          categoryAction.deleteCategory(
            props.location?.query?.id,
            selectedData.image
          )
        );
      }
    });
  };

  const renderContent = () => {
    return (
      <Card
        classes={{
          root: classes.cardRoot + " " + classes.cardRootSecondary,
        }}
      >
        <CardContent classes={cardContentClasses}>
          <FormLabel>Nama Kategori</FormLabel>
          <FormControl
            variant="filled"
            component={Box}
            width="100%"
            marginBottom="1rem!important"
          >
            <FilledInput
              autoComplete="off"
              type="text"
              placeholder="Nama Kategori"
              defaultValue={selectedData && selectedData.name}
              onChange={(value) => {
                setData({ ...data, name: value.target.value });
              }}
            />
          </FormControl>
          {selectedData?.image && (
            <>
              <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                <Typography>Foto Kategori Sebelumnya</Typography>
                <img
                  src={selectedData?.image}
                  style={{ height: "30", width: "60%" }}
                />
              </Box>
            </>
          )}
          {data.image && (
            <>
              <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                <img
                  src={URL.createObjectURL(data.image)}
                  style={{ height: "30", width: "60%" }}
                />
              </Box>
            </>
          )}
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
                    image: event.target.files[0],
                  });
                }}
              />
              <Box
                component={Image}
                marginRight=".75em"
                top="2px"
                position="relative"
              />
              {data?.image || selectedData?.image
                ? "Ganti Foto"
                : "Tambah Foto"}
            </Button>
          </label>
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
          {selectedData && (
            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
              <Button
                color="default"
                variant="outlined"
                fullWidth
                onClick={(event) => {
                  event.preventDefault();
                  deleteHandler();
                }}
              >
                Delete
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      <Header />
      {categoryData.loading ? renderLoading() : renderContent()}
    </div>
  );
};

export default AddCategoryView;
