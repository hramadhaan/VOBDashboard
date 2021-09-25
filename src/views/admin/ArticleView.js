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
import * as articleAction from "../../store/actions/article";
import FormModal from "components/FormModal";
import { Link } from "react-router-dom";

import Lottie from "lottie-react";
import loadingComponent from "../../components/LottieJSON/loading.json";
import moment from "moment";
import "moment/locale/id";

const useStyles = makeStyles(componentStyles);

const ArticleView = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(articleAction.fetchArticle());
  }, [dispatch]);

  const article = useSelector((state) => state.article);
  const category = useSelector((state) => state.category);
  const auth = useSelector((state) => state.auth);

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
            title="Artikel"
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
                    Kategori
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Penulis
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Judul
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Gambar
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Waktu
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
                {article &&
                  article?.article.map((item, index) => {
                    const categoryData = category?.category.find(
                      (cat) => cat.id === item.idCategory
                    );
                    const userData = auth?.users.find(
                      (user) => user.uid === item.idPenulis
                    );

                    return (
                      <TableRow key={`item-table=${index}`}>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {index + 1}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {category && categoryData.name}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {/* <Avatar
                            classes={{ root: classes.avatarRoot }}
                            alt="..."
                            src={auth && userData.photoURL}
                          /> */}
                          {userData?.displayName || item.penulis || '-'}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {/* <Avatar
                            classes={{ root: classes.avatarRoot }}
                            alt="..."
                            src={auth && userData.photoURL}
                          /> */}
                          {item.judul}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          <Avatar
                            classes={{ root: classes.avatarRoot }}
                            alt="..."
                            src={item.imageUrl}
                          />
                          {/* {item.judul} */}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {(item?.time?.includes('am') || item?.time?.includes('pm'))
                            ? moment(item.time, 'DD-MM-YYYY hh:mm a').format('LLL').replace('pukul', '').replace('.', ':')
                            : moment(item.time, 'LLL').format('LLL').replace('pukul', '').replace('.', ':')}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          <Link
                            to={{
                              pathname: "/admin/add-article",
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
          pathname: "/admin/add-article",
        }}
      >
        <Fab
          color="primary"
          aria-label="add-article"
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

  if (article.loading) {
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
    </>
  );
};

export default ArticleView;
