"use strict";
var React = require('react');

var Select = React.createClass({
    selectAuthor: function (event) {
        var authorName = event.target.value;
        var options = event.target.options;
        var authorId = '';
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                authorId = options[i].id;
            }
        }
        var authorChoosen = {
            authorId: authorId,
            authorName: authorName
        };
        this.props.selectedAuthor(authorChoosen);
    },
    render: function () {
        var authorDetails = function (author) {
            return (
                <option value={author.name} id={author.id} key={author.id}>{author.name}</option>
            );
        };
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>Author:</label>
                <select className="form-control" classID={this.props.name} onChange={this.selectAuthor}>
                    {this.props.authorList.map(authorDetails, this)}
                </select>
            </div>
        );
    }
});

module.exports = Select;