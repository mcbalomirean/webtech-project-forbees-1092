import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// import {EmailShareButton} from "react-share";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  gridContainer: {
    paddingLeft: "30px",
    paddingRight: "20px"
  }
});

//TODO: grid?
export default function NoteCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Note: {props.note.title}
          
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Keywords: {props.note.keywords}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            Tags: {props.note.tags}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share 
        </Button> */}
        {/* <EmailShareButton subject={props.note.title} body={props.note.tags}>
          Share by email
        </EmailShareButton> */}
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary" onClick={() => {navigator.clipboard.writeText(props.note.tags)}}> 
          Copy
        </Button>
        <Button size="small" color="primary">
          See Note
        </Button>
      </CardActions>
    </Card>
  );
}
