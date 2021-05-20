import React, {useState, useEffect} from 'react'
import { Paper } from '@material-ui/core'
import firebase from '../firebaseApp'
import { Link, useHistory } from "react-router-dom"

export default function Subscriptions(props) {

    const [members, setMembers] = useState([])

    useEffect (() =>{
        firebase.firestore().collection('Subscriptions').get().then(data =>
            {
                let watchedMembers = []
                data.forEach(item=>
                    {
                        //if the movieId appired in the movies arr - add memberId to the subArr
                        item.data().movies.forEach(x=>
                            {
                                if(x.movieId===props.movieId)
                                    {watchedMembers.push(item.data().member)}
                            })
                    })
                setMembers(watchedMembers)
            })  
    }, [])

    return (
        <div>
            <Paper>
                Subscriptions Watched
                <ul>
                    {
                     members.map(item =>
                        {
                        return <li key={item.id}><Link to={"/member/" + item.id}>{item}</Link> </li>
                        })
                    }
                </ul>
            </Paper>
           <br/>
        </div>
    )
}
