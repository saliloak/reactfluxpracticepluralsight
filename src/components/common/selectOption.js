"use strict";
var React = require('react');

var Select = React.createClass({
    render: function () {
        var authorDetails = function (author) {
            return (
                <option key={author.id}>{author.name}</option>
            );
        };
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>Author:</label>
                <select className="form-control" classID={this.props.name}>
                    {this.props.authorList.map(authorDetails, this)}
                </select>
            </div>
        );
    }
});

module.exports = Select;