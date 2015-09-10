
'use strict';

var React = require('react');
var OrgSearchForm = require('./orgSearchForm');
var Router = require('react-router');
var toastr = require('toastr');

var ManageOrgPage = React.createClass({
	mixins: [Router],

	statics: {
		willTransitionFrom: function(transition, component) {
			console.log('will leave organization manage page');
		}
	},

	getInitialState: function() {
		return {
			searchParams: {name: ''},
			dirty: false,
			errors: {}
		};
	},

	setOrgSearchState: function(event) {
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.searchParams[field] = value;
		return this.setState({searchParams: this.state.searchParams});
	},

	submitForm: function(event) {
		event.preventDefault();
		if (this.state.searchParams["name"]) {
			console.log('about to submit search form for organization search');
		}

		toastr.success('submitted search form, now redirecting to search results');
		this.setState({dirty: false});
	},

	render: function() {
		return (
			<OrgSearchForm searchParams={this.state.searchParams} onChange={this.setOrgSearchState} onSubmit={this.submitForm} />
			);
	}

});

module.exports = ManageOrgPage;