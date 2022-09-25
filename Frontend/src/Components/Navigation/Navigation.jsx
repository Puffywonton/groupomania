import * as React from 'react';
import { userContext } from '../../Context/userContext';
import NavigationDesktop from './NavigationDesktop';
import { useContext } from 'react';
import NavigationMobile from './NavigationMobile';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(userContext)

    return (
        <div>
            {NavigationDesktop({
                currentUser: currentUser.userId
            })}
            {NavigationMobile({
                currentUser: currentUser.userId,
                setCurrentUser: setCurrentUser
            })}
        </div>
        
    );
}

export default Navigation