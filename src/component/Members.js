import React, {useEffect, useState,lazy, Suspense} from 'react'
import firebase from '../firebaseApp'
import LoadingGif from './LoadingGif'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const Member = lazy(()=>import ('./Member'))

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

export default function MembersComp() {
    const classes = useStyles();
    const [membersListState, setMembersListState] = useState([])
    const [watched, setWatched] = useState([])

useEffect(() => {
    let membersList = [];
    let watched = []
    firebase.firestore().collection('Members').get().then(data=>
    {
        data.forEach(item=>
            {
                item.data().movies.forEach(mvi=>{
                    watched.push({movieId: mvi.movieId, date:mvi.date})
                })
               
                let obj = {id: item.id,
                          name: item.data().name,
                          email: item.data().email,
                          city:item.data().city,
                          img: item.data().image,
                          movies: watched};
//
                membersList.push(obj);
                watched = []
            })

        setMembersListState(membersList); 
    });
}, [])

    return (
        <div>
            <Suspense fallback={<LoadingGif/>}>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {membersListState.map((item,index) => (
                            <Grid key={index} item>
                                <Member Data={item}   key={index} className={classes.paper} />
                            </Grid> ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Suspense>                   
        </div>
    )
}
