import React, {useState, useEffect} from 'react'
import { Paper } from '@material-ui/core'
import firebase from '../firebaseApp'
import { Link, useHistory } from "react-router-dom"
import Utils from '../Utils'

export default function Subscriptions(props) {

    const [members, setMembers] = useState([])

    useEffect (async() =>{
       //get all membersId &date that watched the movie
       let watchedMembers = []
       let obj={}
        firebase.firestore().collection('Subscriptions').get().then(data =>
            {
                data.forEach(item=>
                    {
                        //if the movieId appired in the movies arr - add memberId to the subArr
                        item.data().movies.forEach(x=>
                            {
                                if(x.movieId===props.movieId)
                                {
                                    obj={memberId:item.data().member, date:x.date.toDate()}
                                    watchedMembers.push(obj)
                                }
                            })
                    })
                setMembers(watchedMembers)
            })  
            
        
            //get member data by Id
            let membersFullData = []
            let obj2 = {}
            members.forEach(memberST =>
                { 
                    firebase.firestore().collection('Members').get().then(data =>
                        {
                            data.forEach(memberFB=>
                                {
                                    if(memberST.memberId===memberFB.id)
                                    {
                                        obj2 = {id:memberST.memberId, 
                                                    name:memberFB.data().name,
                                                    email: memberFB.data().email,
                                                    city:memberFB.data().city,
                                                    dateOfWatching:memberST.date.toString()}
                                        membersFullData.push(obj2)
                                    } 
                                })  
                            setMembers(membersFullData)  
                        })
                })
        }, [])

    return (
        <div>
            <Paper>
                Subscriptions Watched
                <ul>
                    {
                     members.map((item, index) =>
                        {
                         return <li key={index}><Link to={"/member/" + item.id}>{item.id}</Link>, {item.dateOfWatching} </li>
                        })
                    }
                </ul>
            </Paper>
           <br/>
        </div>
    )
}
