import Button from '@material-ui/core/Button';
import React from 'react'
import Subscriptions from './Subscriptions'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import {useHistory, Link} from 'react-router-dom'
import { ButtonGroup } from 'react-bootstrap';
import firebase from '../firebaseApp'

export default function MovieComp(props)
{
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            padding: theme.spacing(0),
            margin: 'auto',
            width: 550,
            height:270,          
          },
          image: {
            width: 180,
            height: 250,
          },
          img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
          },
          button:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              margin: theme.spacing(1),
            },
          }
        }));

    const classes = useStyles()
    const history = useHistory()
    
    function imgClickHandle() {
        history.push("/LargeImage")
    }

    function deleteMovie ()
    {
        let movieToDel = firebase.firestore().collection('Movies').doc(props.Data.id)
        movieToDel.delete().then(data=>
            {
                alert('Deleted');
            })
        history.push('/Dashbord')
    }
    
    return(
       <div>
           <Card className={classes.root}>
           <CardActionArea>
             <Grid container spacing={2}>
                    <Grid item>
                      <img className={classes.img} alt={props.Data.name} src={props.Data.mediumImage} />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {props.Data.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Geners: {props.Data.geners.map(item=>
                                                    {
                                                        return item+",  ";
                                                    })}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {props.Data.premiered}
                                </Typography>
                                    <Subscriptions id={props.Data.id}/>
                                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                    <Button>Edit</Button>
                                    <Button onClick={deleteMovie}>Delete</Button>
                                 </ButtonGroup>
                                </Grid>                               
                        </Grid>
                        </Grid>
                    </Grid>
                </CardActionArea>             
            </Card>
            <br/>
        </div>
     
    )
}