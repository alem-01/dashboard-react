import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Avatar from "@material-ui/core/Avatar";
// import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2%",
    display: "grid",
    gridTemplateColumns: "2fr 3.5fr",
    justifyContent: "spase-around",
  },
  left: { paddingTop: "10px" },
  right: { paddingTop: "10px" },

  card: {
    minWidth: "80vw",
    margin: theme.spacing(2),
  },
  media: {
    height: "80vh",
  },
}));

function Media(props) {
  // const { loading = false } = props;
  const classes = useStyles();

  return (
    <Paper variant="outlined">
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={200}
              height={200}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={100}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
        //   subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
      </Card>
      {/* <Skeleton animation="wave" variant="rect" className={classes.media} /> */}

      <CardContent>
        <React.Fragment>
          <Skeleton animation="wave" height={100} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </React.Fragment>
      </CardContent>
    </Paper>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function ProfileSkeleton() {
  return (
    <div>
      <Media loading />
      {/* <Media /> */}
    </div>
  );
}
