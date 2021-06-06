import React from "react";
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
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

import * as userAction from "../../store/actions/auth";
import loadingComponent from "../../components/LottieJSON/loading.json";

const useStyles = makeStyles(componentStyles);

const UserView = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userAction.fetchUser());
  }, [dispatch]);

  const user = useSelector((state) => state.auth);

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
                    Nama Akun
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Foto Profil
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Hak Akses
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
                {user &&
                  user.users.map((item, index) => {
                    return (
                      <TableRow key={`item-table=${index}`}>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {index + 1}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {item.displayName}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          <Avatar
                            classes={{ root: classes.avatarRoot }}
                            alt="..."
                            src={item.photoURL}
                          />
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {item.typeUser === "1"
                            ? "Admin"
                            : item.typeUser === "2"
                            ? "User"
                            : null}
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

  if (user.loading) {
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
};

export default UserView;
