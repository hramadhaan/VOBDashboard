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
} from "@material-ui/core";

const useStyles = makeStyles(componentStyles);

const CategoryView = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Header />
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
            </Box>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
};

export default CategoryView;
