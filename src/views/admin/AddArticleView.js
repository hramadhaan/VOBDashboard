import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

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
  Select,
  MenuItem,
} from "@material-ui/core";
import Header from "components/Headers/Header";
import { useDispatch, useSelector } from "react-redux";
import { Image, SendRounded } from "@material-ui/icons";

import * as articleAction from "../../store/actions/article";
import swal from "sweetalert";
import Lottie from "lottie-react";

import loadingComponent from "../../components/LottieJSON/loading.json";

const useStyles = makeStyles(componentStyles);

const AddArticleView = (props) => {
  const classes = useStyles();

  const cardContentClasses = { root: classes.cardContent };

  const articleData = useSelector((state) => state.article);
  const categoryData = useSelector((state) => state.category);
  const userData = useSelector((state) => state.auth);

  const selectedUser = userData?.users.filter((user) => user.typeUser === "1");

  const selectedData = articleData?.article.find(
    (artikel) => artikel.id === props.location?.query?.id
  );

  const dispatch = useDispatch();

  const [data, setData] = useState({
    hashtag: null,
    idCategory: null,
    idPenulis: null,
    imageUrl: null,
    judul: null,
    partOne: null,
    partTwo: null,
    partThree: null,
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
    if (selectedData) {
      dispatch(
        articleAction.updateArticle(
          props.location?.query?.id,
          data,
          selectedData.imageUrl
        )
      );
    } else {
      dispatch(articleAction.addArticle(data));
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
          articleAction.deleteArticle(
            props.location?.query?.id,
            selectedData.imageUrl
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
          <FormLabel>Judul Artikel</FormLabel>
          <FormControl
            variant="filled"
            component={Box}
            width="100%"
            marginBottom="1rem!important"
          >
            <FilledInput
              autoComplete="off"
              type="text"
              placeholder="Judul Artikel"
              defaultValue={selectedData && selectedData.judul}
              onChange={(value) => {
                setData({ ...data, judul: value.target.value });
              }}
            />
          </FormControl>
          <FormLabel>Kategori</FormLabel>
          <FormControl
            variant="filled"
            component={Box}
            width="100%"
            marginBottom="1rem!important"
          >
            {selectedData ? <FilledInput
              type="text"
              disabled
              value={selectedData && categoryData.category.find(cat => cat.id === selectedData.idCategory).name}
            /> : <Select
              onChange={(event) => {
                setData({
                  ...data,
                  idCategory: event.target.value,
                });
              }}
              value={data.idCategory}
            >
              {categoryData &&
                categoryData.category.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
            </Select>}
          </FormControl>
          <FormLabel>Penulis</FormLabel>
          <FormControl
            variant="filled"
            component={Box}
            width="100%"
            marginBottom="1rem!important"
          >
            {selectedData ? <FilledInput
              type="text"
              disabled
              value={selectedData && selectedData.idPenulis}
              defaultValue={selectedData && selectedData.idPenulis}
            /> : <Select
              onChange={(event) => {
                setData({
                  ...data,
                  idPenulis: event.target.value,
                });
              }}
              value={data.idPenulis}
              defaultValue={selectedData && selectedData.idPenulis}
            >
              {userData &&
                selectedUser.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.uid}>
                      {item.displayName}
                    </MenuItem>
                  );
                })}
            </Select>}
          </FormControl>
          <FormLabel>Part Satu</FormLabel>
          <FormControl
            variant="filled"
            component={Box}
            width="100%"
            marginBottom="1rem!important"
          >
            <FilledInput
              autoComplete="off"
              multiline
              rows={5}
              type="text"
              placeholder="Part Pertama"
              defaultValue={selectedData && selectedData.partOne}
              onChange={(value) => {
                setData({ ...data, partOne: value.target.value });
              }}
            />
          </FormControl>
          <FormLabel>Part Dua</FormLabel>
          <FormControl
            variant="filled"
            component={Box}
            width="100%"
            marginBottom="1rem!important"
          >
            <FilledInput
              autoComplete="off"
              type="text"
              multiline
              rows={5}
              placeholder="Part Kedua"
              defaultValue={selectedData && selectedData.partTwo}
              onChange={(value) => {
                setData({ ...data, partTwo: value.target.value });
              }}
            />
          </FormControl>
          <FormLabel>Part Tiga</FormLabel>
          <FormControl
            variant="filled"
            component={Box}
            width="100%"
            marginBottom="1rem!important"
          >
            <FilledInput
              autoComplete="off"
              type="text"
              multiline
              rows={5}
              placeholder="Part Ketiga"
              defaultValue={selectedData && selectedData.partThree}
              onChange={(value) => {
                setData({ ...data, partThree: value.target.value });
              }}
            />
          </FormControl>
          <FormLabel>Hashtag</FormLabel>
          <FormControl
            variant="filled"
            component={Box}
            width="100%"
            marginBottom="1rem!important"
          >
            <FilledInput
              autoComplete="off"
              type="text"
              placeholder="Hashtag"
              defaultValue={selectedData && selectedData.hashtag}
              onChange={(value) => {
                setData({ ...data, hashtag: value.target.value });
              }}
            />
          </FormControl>
          {selectedData?.imageUrl && (
            <>
              <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                <Typography>Banner Artikel Sebelumnya</Typography>
                <img
                  src={selectedData?.imageUrl}
                  style={{ height: "30", width: "60%" }}
                />
              </Box>
            </>
          )}
          {data.imageUrl && (
            <>
              <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                <img
                  src={URL.createObjectURL(data.imageUrl)}
                  style={{ height: "30", width: "60%" }}
                />
              </Box>
            </>
          )}
          <label htmlFor="add-article">
            <Button color="secondary" variant="contained" component="label">
              <input
                type="file"
                accept="image/*"
                id="add-article"
                hidden
                onChange={(event) => {
                  setData({
                    ...data,
                    imageUrl: event.target.files[0],
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
                if (selectedData) {
                  submitHandler();
                } else {
                  if (
                    data.judul === null ||
                    data.partOne === null ||
                    data.imageUrl === null ||
                    data.hashtag === null ||
                    data.idCategory === null ||
                    data.idPenulis === null
                  ) {
                    swal({
                      title: "Data tidak berhasil diunggah",
                      text: "Harap mengisi isi beberapa field",
                      icon: "warning",
                    });
                  } else {
                    submitHandler();
                  }
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

export default AddArticleView;
