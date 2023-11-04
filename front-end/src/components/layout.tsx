import {Fragment, ReactNode} from 'react'
import Header from './header'
import './layout.css'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
    return (
        <Fragment>
            
                <Header />
                    {children}
            
        </Fragment>
    )
}
export default Layout;