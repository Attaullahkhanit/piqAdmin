import React from 'react'
import { useLocation } from 'react-router-dom'
import MainDesktopLayout from '../mainDesktop/MainDesktopLayout';
import BusinessLayout from '../businessLayout/BusinessLayout';

function LayoutAlternator({children}) {
    const location = useLocation();

    //check if path starts with /business
    if (location.pathname.startsWith("/business")) {
        return(
            <BusinessLayout>
                {children}
            </BusinessLayout>
        )
    } else {
        return(
            <MainDesktopLayout>
                {children}
            </MainDesktopLayout>
        )
    }
   
}

export default LayoutAlternator
