import firebase from '../firebaseApp'

const getAllUsersFromFB = async () =>
{
    let users=[];
    firebase.firestore().collection('Users').get().then(data=>
        {
            data.forEach(user =>
                    {
                        let obj = {firstName:user.data().FirstName,
                                    lastName:user.data().LastName,
                                    userName:user.data().UserName };
                                    users.push(obj);
                    })            
        })
    return users;
}

const getAllMoviesFromFB = async () =>
{
    let movies = [];
    firebase.firestore().collection('Movies').get().then(data=>
        {
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
        });
    //let lessMovies = movies.slice(1,10);
    return movies;
}

//
const getWatchedMembers = async (movieId) =>
{
    let watchedMembers = []
    let obj={}
    //get all Sub
    firebase.firestore().collection('Subscriptions').get().then(data =>
        {
        
            data.forEach(item=>
                {
                    //if the movieId appired in the movies arr - add memberId to the subArr
                    item.data().movies.forEach(x=>
                        {
                            if(x.movieId===movieId)
                                {obj={memberId:item.data().member, date:x.date}
                                watchedMembers.push(obj)}
                        })
                })
        })
        return watchedMembers;
}

//input: a member FB id
//output: member full data
const getUserDataById = (memberId) =>
{
    let obj={}
    firebase.firestore().collection('Members').get().then(data =>
        {
            data.forEach(memberFB=>
                {
                
                    if(memberId===memberFB.id)
                    {
                        obj = {id:memberId, 
                                    name:memberFB.data().name,
                                    email: memberFB.data().email,
                                    city:memberFB.data().city}
                    }
                })
        })
    return obj
}

const addUserToFB = (obj) =>
{
   return firebase.firestore().collection('Users').add(obj)
}


export default {getAllUsersFromFB,getAllMoviesFromFB, getWatchedMembers, getUserDataById, addUserToFB };