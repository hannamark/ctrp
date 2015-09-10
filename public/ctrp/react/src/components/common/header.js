'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
	render: function() {
		return (
			<nav className="navbar navbar-default navbar-fixed-top nav-search-bar">
				<div className="container-fluid">
					<Link to="app" className="navbar-brand">Home</Link>
					<div className="collapse navbar-collapse">
						<ul className="nav navbar-nav inline">
							<li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" 
								aria-expanded="false">Organizations & Families <span className="caret"></span></a>
								<ul className="dropdown-menu" role="menu">
									<li><a hre="">Search Organizations</a></li>
									<li><a hre="">Add Organization</a></li>
									<li role="separator" className="divider"></li>
									<li><a hre="">Search Families</a></li>
									<li><a hre="">Add Family</a></li>									
								</ul>
							</li>

							<li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" 
								aria-expanded="false">Persons<span className="caret"></span></a>
								<ul className="dropdown-menu" role="menu">
									<li><a hre="">Search Persons</a></li>
									<li><a hre="">Add Person</a></li>
								</ul>
							</li>

							<li><Link to="searchOrgs">Search Organizations</Link></li>

						</ul>
					</div>
				</div>
			</nav>
			);
	}
});

module.exports = Header;