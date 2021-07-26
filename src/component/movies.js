import React , {useEffect, lazy, Suspense} from 'react';
import Button from '@material-ui/core/Button';
import firebaseBL from '../BL/firebaseBL'
import {useState} from 'react'
import firebase from '../firebaseApp'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import {useHistory } from "react-router-dom"


const MovieComp = lazy(()=>import ('./movie'))

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
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    card:{
      flexGrow: 1,
      padding: theme.spacing(0),
      margin: 'auto',
      width: 500,
      height:'auto', 
    },
  }));


export default function MoviesComp ()
{
    const [moviesState, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [addMovieButton, setAddMovieButton] = useState("none")
    const [newMovieName, setnewMovieName] = useState("")
    const [newMovieGeners, setNewMovieGeners] = useState("")
    const [newMoviePrem, setnewMoviePrem] = useState("")
    const classes = useStyles();
    const history = useHistory();
    
    useEffect (()=>
    {
        firebase.firestore().collection('Movies').get().then(data=>
        {
            let movies = [];
            data.forEach(item=>
                {
                    let obj = {id: item.id,
                                name: item.data().name,
                                premiered:item.data().Premiered.substring(0,4),
                                geners:item.data().geners,
                                mediumImage: item.data().image.medium,
                                originalImage:item.data().image.original};

                    movies.push(obj);
                })
            setMovies(movies); 
        });
          //fetchData();        
    },[])

    function addMovieSection ()
    {
      if (addMovieButton === 'none') 
      {
        setAddMovieButton('block')
      }
      else
      {
        setAddMovieButton('none')
      }
    }

    function addMovie() {
      let obj = {name : newMovieName , geners : [newMovieGeners], Premiered: newMoviePrem,image:{medium:"",original:"" } };
      firebase.firestore().collection('Movies').add(obj)
       .then(data=>
        {
          alert('Movie created ! ');
        })
        setAddMovieButton('none')
        history.push('/Dashbord/movies')
    }

  /*  const fetchData = async () => {
      firebaseBL.getAllMoviesFromFB().then(result=>setMovies(result))
      };*/

      let moviesFilter = moviesState.filter(item=>item.name.includes(search))
        
   console.log(search)
    return(
        <div>
            <Autocomplete
                id="free-solo-2-demo"
                freeSolo
                options={moviesState.map((item) => item.name)}
                onChange={e=>setSearch(e.target.textContent)} 
                renderInput={(params) => (
              <TextField {...params} label="search" margin="normal" variant="outlined"/>
        )}
      />
            <Button onClick={addMovieSection} variant="contained" color="primary">Add Movie</Button>
            <br/><br/>
            <div style={{display:addMovieButton}}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    Name: <input type="text" onChange={e=>setnewMovieName(e.target.value)}/>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Geners: <input type="text" onChange={e=>setNewMovieGeners(e.target.value)}/>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    premiered: <input type="text" onChange={e=>setnewMoviePrem(e.target.value)}/>
                                </Typography>
                                <Button onClick={addMovie} color="primary">ADD</Button>
                                </Grid>                                
                        </Grid>
                        </Grid>
                    </CardActionArea>
                  </Card>
            </div>
            <br/>
            <Suspense fallback={<div>Loading...</div>}>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {moviesFilter.map((item,index) => (
                            <Grid key={index} item>
                                <MovieComp Data={item} className={classes.paper} />
                            </Grid> ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Suspense>
        </div>
    )
}
