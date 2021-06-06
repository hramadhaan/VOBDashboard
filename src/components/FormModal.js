import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  makeStyles,
  useTheme,
  Box,
  Grow,
} from "@material-ui/core";

import componentStyles from "assets/theme/views/auth/login.js";

const useStyles = makeStyles(componentStyles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const FormModal = (props) => {
  const { title, children, open, handleClose } = props;
  const classes = useStyles();
  const theme = useTheme();

  const cardContentClasses = { root: classes.cardContent };
  const cardClasses = { root: classes.cardRoot };
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
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="dialog-slide-title"
        aria-describedby="dialog-slide-description"
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
                  {title}
                </Box>
              }
              titleTypographyProps={titleTypographyProps}
            />
            <CardContent classes={cardContentClasses}>{children}</CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormModal;
