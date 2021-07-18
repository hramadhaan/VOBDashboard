import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons components
// import ArrowDownward from "@material-ui/icons/ArrowDownward";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
import EmojiEvents from "@material-ui/icons/Description";
import GroupAdd from "@material-ui/icons/GroupAdd";
import InsertChartOutlined from "@material-ui/icons/Category";
import PieChart from "@material-ui/icons/Assignment";

// core components
import CardStats from "components/Cards/CardStats.js";

import componentStyles from "assets/theme/components/header.js";
import { useSelector } from "react-redux";

const useStyles = makeStyles(componentStyles);

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();

  const article = useSelector(state => state.article.article)
  const category = useSelector(state => state.category.category)
  const auth = useSelector(state => state.auth)

  const filterArticleByUser = article?.filter(art => art.idPenulis === auth.uid)

  return (
    <>
      <div className={classes.header}>
        <Container
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <div>
            <Grid container>
              <Grid item xl={3} lg={6} xs={12}>
                <CardStats
                  subtitle="Jumlah Kategori"
                  title={category.length}
                  icon={InsertChartOutlined}
                  color="bgError"
                />
              </Grid>
              <Grid item xl={3} lg={6} xs={12}>
                <CardStats
                  subtitle="Jumlah Artikel"
                  title={article.length}
                  icon={PieChart}
                  color="bgWarning"
                />
              </Grid>
              <Grid item xl={3} lg={6} xs={12}>
                <CardStats
                  subtitle="Jumlah Pengguna"
                  title={auth?.users?.length}
                  icon={GroupAdd}
                  color="bgWarningLight"
                />
              </Grid>
              <Grid item xl={3} lg={6} xs={12}>
                <CardStats
                  subtitle="Artikel Anda"
                  title={filterArticleByUser?.length}
                  icon={EmojiEvents}
                  color="bgInfo"
                />
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
