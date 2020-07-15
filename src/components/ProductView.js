import React from "react";
import { Grid, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  productContainer: {
    color: "#ffffff",
    paddingLeft: "150px",
    paddingRight: "150px",
    background: "#080849",
  },
  rightContainer: {
    height: "100%",
    padding: 50,
  },
  leftContainer: {
    height: "100%",
    padding: 50,
  },
  productViewTitle: {
    paddingTop: 10,
    paddingBottom: 10,
    background: "#40407a",
    color: "#ffffff",
  },
  productViewPrice: {},
  productViewMedia: {},
  productViewContent: {
    paddingBottom: 10,
  },
  productViewButtons: {
    justifyContent: "center",
    background: "#40407a",
  },
});

function ProductView() {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={4}
      className={classes.productContainer}
      align="center"
    >
      <Grid xs={12} sm={6} item>
        <Card className={classes.leftContainer} variant="outlined">
          <CardMedia
            className={classes.productViewMedia}
            height="100%"
            component="img"
            image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/thebreakfastclub-1548798769.jpg"
            title="Product example"
          />
          <Rating name="read-only" />
        </Card>
      </Grid>

      <Grid Grid xs={12} sm={6} item>
        <Card
          height="100%"
          className={classes.rightContainer}
          variant="outlined"
        >
          <CardActionArea>
            <Typography
              align="center"
              className={classes.productViewTitle}
              gutterBottom
              variant="h5"
              component="h2"
            >
              Title
            </Typography>

            <Typography
              align="center"
              className={classes.productViewPrice}
              gutterBottom
              variant="h5"
              component="h2"
            >
              Price: 99
            </Typography>
            <CardContent>
              <Typography className={classes.productViewContent} component="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque quis suscipit magna, vitae posuere dolor.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.productViewButtons}>
            <Button size="small" color="primary">
              Add to Cart
            </Button>
            <Button size="small" color="primary">
              Buy Now
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ProductView;
