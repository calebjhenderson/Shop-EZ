import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import products from "./dummy-products";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  productTitle: {
    paddingTop: 10,
    paddingBottom: 10,
    background: "#ad77eb",
    color: "#ffffff",
  },
  productPrice: {},
  productMedia: {
    padding: 10,
  },
  productContent: {
    padding: 10,
    justifyContent: "center",
  },
  ratingContainer: {
    justifyContent: "center",
    paddingTop: 5,
  },
  cardButtons: {
    justifyContent: "center",
  },
});

function ProductCard() {
  const classes = useStyles();
  return (
    <Grid container spacing={8} justify="center">
      {products.map((products) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={products.title}>
          <Card variant="outlined">
            <CardActionArea>
              <Typography
                align="center"
                className={classes.productTitle}
                gutterBottom
                variant="h5"
                component="h2"
              >
                {products.title}
              </Typography>
              <Typography
                align="center"
                className={classes.productPrice}
                gutterBottom
                variant="h5"
                component="h2"
              >
                {products.price}
              </Typography>
              <CardMedia
                className={classes.productMedia}
                component="img"
                image={products.image}
                title="Product example"
              />
              <CardContent>
                <Typography className={classes.productContent} component="p">
                  {products.excerpt}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Grid container className={classes.ratingContainer}>
              <Rating name="size-large" defaultValue={2} size="large" />
            </Grid>
            <CardActions className={classes.cardButtons}>
              <Button size="small" color="primary">
                Buy Now
              </Button>
              <Button size="small" color="primary">
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductCard;
