'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
	render: function() {
		return (
			<div className="jumbotron">
				<h1>CTRP - NCI</h1>
				<a href="#" className="btn btn-primary btn-lg">Learn more </a>
			</div>
			);
	}
});

module.exports = Home;