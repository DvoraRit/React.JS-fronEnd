import React, {useState, useEffect} from 'react'
import { Paper } from '@material-ui/core'
import firebase from '../firebaseApp'
import { Link } from "react-router-dom"

export default function Subscriptions(props) {

    //var subRef = firebase.firestore().collection('Subscriptions');
    var memberRef = firebase.firestore().collection('Members')
    const [subWatched, setsubWatched] = useState([])

    useEffect ( () =>{
        /*let watchedMembers = []
        //get all Sub
        subRef.get().then(data =>
            {
                data.forEach(item=>
                    {
                        //if the movieId appired in the movies arr - add memberId to the subArr
                        item.data().movies.forEach(x=>
                            {
                                
                                if(x.movieId===props.id)
                                    { 
                                        watchedMembers.push({date:x.date, memberId:item.data().member})
                                    }
                            })
                            
                    })
            
                setsubWatched(watchedMembers)
            })*/
            
            let watchedMembers = []
        //get all Sub
        memberRef.get().then(data =>
            {
                data.forEach(item=>
                    {
                        //if the movieId appired in the movies arr - add memberId to the subArr
                        item.data().movies.forEach(movie=>
                            {
                                
                                if(movie.movieId===props.id)
                                    { 
                                        watchedMembers.push({date:movie.date, name:item.data().name,memberId:item.id })
                                    }
                            })
                            
                    })
            
                setsubWatched(watchedMembers)
            })
            
        }, [props])


    return (
        <div>
            <Paper>
                Subscriptions Watched
                <ul>
                    {subWatched.map((item, index) =>
                            {
                                return <li key={index}><Link to={"/member/" + item.memberId}>{item.name}</Link>, {item.date} </li>
                            })}
                </ul>
            </Paper>
           <br/>
        </div>
    )
}
