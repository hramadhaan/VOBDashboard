import React, { useState } from "react";
import Header from "components/Headers/Header";

import componentStyles from "assets/theme/views/admin/tables.js";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Container,
  Box,
  CardHeader,
  Card,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Avatar,
  Button,
  Fab,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";

// REDUX
import * as categoryAction from "../../store/actions/category";
import FormModal from "components/FormModal";
import { Link } from "react-router-dom";

import Lottie from 'lottie-react'
import loadingComponent from '../../components/LottieJSON/loading.json'

const useStyles = makeStyles(componentStyles);

const CategoryView = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const [idCategory, setIdCategory] = useState(null);

  const categoryState = useSelector((state) => state.category);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(categoryAction.fetchCategory());
  }, [dispatch]);

  const category = useSelector((state) => state.category);

  let render = (
    <>
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title="Kategori Artikel"
            titleTypographyProps={{
              component: Box,
              marginBottom: "0!important",
              variant: "h3",
            }}
          />
          <TableContainer>
            <Box
              component={Table}
              alignItems="center"
              marginBottom="0!important"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    No
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Nama Kategori
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Icon Kategori
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {category &&
                  category.category.map((item, index) => {
                    return (
                      <TableRow key={`item-table=${index}`}>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {index + 1}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {item.name}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          <Avatar
                            classes={{ root: classes.avatarRoot }}
                            alt="..."
                            src={item.image}
                          />
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          <Link
                            to={{
                              pathname: "/admin/add-category",
                              query: {
                                id: item.id,
                              },
                            }}
                          >
                            <Box
                              aria-controls={`simple-menu-${index}`}
                              aria-haspopup="true"
                              size="small"
                              component={Button}
                              width="2rem!important"
                              height="2rem!important"
                              minWidth="2rem!important"
                              minHeight="2rem!important"
                              onClick={() => {
                                setIdCategory(`${item.name}`);
                                setModalEdit(true);
                              }}
                            >
                              <Box
                                component={Edit}
                                width="1.25rem!important"
                                height="1.25rem!important"
                                position="relative"
                                top="2px"
                                color={theme.palette.gray[500]}
                              />
                            </Box>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Box>
          </TableContainer>
        </Card>
      </Container>
      <Link
        to={{
          pathname: "/admin/add-category",
        }}
      >
        <Fab
          color="primary"
          aria-label="add-category"
          style={{
            margin: 0,
            top: "auto",
            right: 20,
            bottom: 20,
            left: "auto",
            position: "fixed",
          }}
        >
          <Add />
        </Fab>
      </Link>
    </>
  );

  if (category.loading) {
    render = (
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
  }

  const formEditKategori = () => {
    const categoryId = categoryState.category.find(
      (item) => item.id === idCategory
    );
    return (
      <FormModal
        title="Edit Kategori"
        open={modalEdit}
        handleClose={() => {
          setModalEdit(false);
          setIdCategory(null);
        }}
      >
        <div>
          <p>{categoryId && categoryId?.name}</p>
        </div>
      </FormModal>
    );
  };

  const formTambahKategori = () => {
    return (
      <FormModal
        title="Tambah Kategori"
        open={modal}
        handleClose={() => {
          setModal(false);
        }}
      >
        <div
          style={{
            height: 10000,
          }}
        >
          <p>Hello</p>
        </div>
      </FormModal>
    );
  };

  return (
    <>
      <Header />
      {render}
      {formTambahKategori()}
      {idCategory && formEditKategori()}
    </>
  );
};

export default CategoryView;
