import React from 'react';
import Auxx from '../../hoc/Auxx';
import classes from './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = ( props ) => (
	<Auxx>
		<Toolbar />
		<main className={classes.Content}>
			{props.children}
		</main>
	</Auxx>
);

export default Layout;