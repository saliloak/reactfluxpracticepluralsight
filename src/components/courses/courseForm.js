"use strict";
var React = require('react');
var Input = require('../common/textInput');
var CourseForm = React.createClass({
    render: function () {
        return (
            <form>
                <h1>Manage Course</h1>
                <Input
                    name="title"
                    label="Course Title"
                    placeholder="Course Title"
                    value={this.props.courses.title}
                    onChange={this.props.onChange}
                    error={this.props.errors.title} />
                <br />
                <Input
                    name="length"
                    label="Course Length"
                    placeholder="Course Length"
                    value={this.props.courses.length}
                    onChange={this.props.onChange}
                    error={this.props.errors.courseLength} />
                <br />
                <Input
                    name="category"
                    label="Course Category"
                    placeholder="Category"
                    value={this.props.courses.category}
                    onChange={this.props.onChange}
                    error={this.props.errors.category} />
                <br />
                <Input
                    name="watchHref"
                    label="Course URL"
                    placeholder="Course URL"
                    value={this.props.courses.watchHref}
                    onChange={this.props.onChange}
                    error={this.props.errors.watchHref} />
                <br />
                <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
            </form>
        );
    }
});

module.exports = CourseForm;