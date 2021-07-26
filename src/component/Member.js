import React ,{useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useHistory} from 'react-router-dom'
import firebase from '../firebaseApp'

const useStyles = makeStyles((theme)=>({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 260,
    },
    flex: {
        flexGrow:1,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
  }));

export default function Member(props) {

    const classes = useStyles();
    const hsistory = useHistory();

    let moviesWatched = props.Data.movies.map((item, index)=>{
        return<li key={index}>{item.movieId}</li>
      })

    function goToMember() {
        
    }
    return (
        <div>
        <h4></h4>
        <Card className={classes.root} onClick={goToMember}> 
            <CardActionArea>
                <CardMedia className={classes.media}
                    image={props.Data.img}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.Data.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Email: {props.Data.email}<br/>
                        City: {props.Data.city}
                    </Typography>
                </CardContent>
                <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">  
                <Typography className={classes.heading}>Movies Watched</Typography>
                </AccordionSummary>
                <AccordionDetails>
                     <Typography>
                         {moviesWatched}
                     </Typography>
                </AccordionDetails>                
                </Accordion>
            </CardActionArea>
        </Card>
        </div>

    )
}
