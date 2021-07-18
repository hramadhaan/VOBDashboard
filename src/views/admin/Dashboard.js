import React from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// import { Line, Bar } from "react-chartjs-2";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
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
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loadingComponent from "../../components/LottieJSON/loading.json";

import {Edit, Add} from '@material-ui/icons'

import moment from 'moment'

// core components
import Header from "components/Headers/Header.js";

import {
  chartOptions,
  parseOptions,
  // chartExample1,
  // chartExample2,
} from "variables/charts.js";

import componentStyles from "assets/theme/views/admin/dashboard.js";

import * as authAction from "../../store/actions/auth";
import * as categoryAction from '../../store/actions/category'
import * as articleAction from '../../store/actions/article'
import { useSelector } from "react-redux";

const useStyles = makeStyles(componentStyles);

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const dispatch = useDispatch();

  const article = useSelector(state => state.article.article)
  const auth = useSelector(state => state.auth)
  const category = useSelector((state) => state.category);

  const filterArticle = article?.filter(article => article.idPenulis === auth.uid)

  React.useEffect(() => {
    dispatch(authAction.fetchUser());
    dispatch(categoryAction.fetchCategory())
    dispatch(articleAction.fetchArticle())
  }, [dispatch]);

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
            title="Artikel Anda"
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
                {filterArticle?.map((item, index) => {
                    const categoryData = category?.category.find(
                      (cat) => cat.id === item.idCategory
                    );
                    const userData = auth?.users.find(
                      (user) => user.uid === item.idPenulis
                    );

                    console.log("UserData: ", userData);
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
                          {userData?.displayName ?? '-'}
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

  return (
    <>
      <Header />
      {render}
    </>
  );
}

export default Dashboard;
