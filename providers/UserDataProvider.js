import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserDataProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserDataProvider;
