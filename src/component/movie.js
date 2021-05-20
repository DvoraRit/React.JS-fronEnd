import Card from 'react-bootstrap/Card'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Subscriptions from './Subscriptions'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

export default function MovieComp(props)
{
  
      const classes = useStyles();
    //
    let gens = props.Data.geners.map(item=>
        {
            return item+",  ";
        })

    return(
       <div>
           <Paper elevation={3}>
               <img src={props.Data.mediumImage} width="100pl"/>
                <h3>{props.Data.name}, {props.Data.premiered}</h3>
                <h5>Geners: {gens}</h5>
                <Subscriptions movieId={props.Data.id}/>
                <Button variant="contained">
                    Edit
                </Button><br/>
            </Paper>
            <br/>
            
        </div>
     
    )
}