import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";


function MainPageComp ()
{

    const history = useHistory();
    return(
        <div>
            <h1>Main Page</h1>
         <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button onClick={()=>history.push("/Movies")}>Movies</Button>
            <Button>Subscriptions</Button>
            <Button>Log Out</Button>
         </ButtonGroup>
        </div>
    )
}

export default MainPageComp