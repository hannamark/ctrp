'use strict';

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var Home = require('./components/homePage');



var routes = (
		<Route name="app" path="/" handler={require('./components/app')}>
		<DefaultRoute handler={require('./components/homePage')} />
		<Route name="searchOrgs" path="searchOrgs" handler={require('./components/organizations/manageOrgPage')} />
		</Route>
	);

module.exports = routes;