import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import BoardsPage from '../pages/BoardsPage';
import BoardPage from '../pages/BoardPage'
import Page404 from '../pages/Page404';

const Routes = () => {

	return(
		<Switch>

			<Redirect exact from='/' to='/boards' />

			<Route exact path='/boards' component={BoardsPage} key="BoardsPage" />
			<Route path='/boards/:id' component={BoardPage} key="BoardPage" />

			<Route path="*" component={Page404} key="Page404" />

		</Switch>
	)
}

export default Routes;