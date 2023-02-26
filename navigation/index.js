import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

const Providers = () => {
    return (
         <AuthProvider>
             <Routes />
        </AuthProvider>
    );
};

// const Providers = () => {
//         return (
//             <Routes />
//         );
//     };

export default Providers;