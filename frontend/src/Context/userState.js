import GlobalStateContext from './userContext'
import { useState } from 'react';
const GlobalStateProvider = (props) => {
    const [emailVerifiedN, setEmailVerified] = useState(false);

    return (
        <GlobalStateContext.Provider value={{ emailVerifiedN, setEmailVerified }}>
            {props.children}
        </GlobalStateContext.Provider>
    );
};
export default GlobalStateProvider;