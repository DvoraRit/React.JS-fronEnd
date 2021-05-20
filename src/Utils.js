import axios from 'axios'
import firebase from './firebaseApp'

const  getAllUsers= async()=>
{
    let users=[];
   let rsp= await axios.get("https://jsonplaceholder.typicode.com/users");
   let usersData = rsp.data;
   usersData.forEach(person => {
    let name = person.name;
    let email = person.email;
    let city = person.address.city;

    let obj = {name, email, city};
    users.push(obj);
   });

   return users;
}

const getAllMovies = async () =>
{
    let movies=[];
    let rsp = await axios.get ("https://api.tvmaze.com/shows");
    let moviesData = rsp.data;
    moviesData.forEach(item =>
        {
            let name = item.name; 
            let geners = item.genres;
            let image = item.image;
            let Premiered = item.premiered;

            let obj = {name, geners, image, Premiered};
            movies.push(obj);
        })

        return movies;
}

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
                                geners:[item.data().geners],
                                mediumImage: item.data().image.medium,
                                originalImage:item.data().image.original};

                    movies.push(obj);
                })
        });
    //let lessMovies = movies.slice(1,10);
    return movies;
}

const getWatchedMembers = async (movieId) =>
{
    let watchedMembers = []
    //get all Sub
    firebase.firestore().collection('Subscriptions').get().then(data =>
        {
        
            data.forEach(item=>
                {
                    //if the movieId appired in the movies arr - add memberId to the subArr
                    item.data().movies.forEach(x=>
                        {
                            if(x.movieId===movieId)
                                {watchedMembers.push(item.data().member)}
                        })
                })
        })
        return watchedMembers;
}
export default {getAllUsers,getAllMovies, getAllUsersFromFB,getAllMoviesFromFB, getWatchedMembers };