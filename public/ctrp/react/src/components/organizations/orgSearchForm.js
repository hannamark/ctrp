
'use strict';

var React = require('react');
var Input = require('../common/textInput');

var OrgSearchForm = React.createClass({
	propTypes: {
		searchParams: React.PropTypes.object,
		onSubmit: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired		
	},

	render: function() {
		return (
			<div className="container">
				<div className="row">
					<form className="form-horizontal" role="form">
							<h4>Search Organizations <small><mark>* for wild card (e.g. university* for any university)</mark></small></h4>
							<Input name="organizationName" label="Organization Name" onChange={this.props.onChange} />
							<input type="submit" value="Search" className="btn btn-primary" onClick={this.props.onSubmit} />	
					</form>
				</div>
			</div>
			);
	}
});

module.exports = OrgSearchForm;