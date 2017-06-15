"use strict";

var React = require('react');
var Link = require('react-router').Link;

var CourseList = React.createClass({
    render: function () {
        var createCourseRow = function (course) {
            var authorId = '';
            var authorName = '';
            if(course.author.id === '' && course.author.name === ''){
            authorId = 'author-not-applicable';
            authorName = 'N/A';
            }
            else{
            authorId = course.author.id;
            authorName = course.author.name;
            }
            return (
                <tr key={course.id}>
                    {/*<td><a href="#" onClick={this.watchCourse.bind(this, course.watchHref)}>Watch</a></td>
                    <td><a href="#" onClick={this.deleteCourse.bind(this, course.id)}>Delete</a></td>*/}
                    <td><a href="#">Watch</a></td>
                    <td><a href="#">Delete</a></td>
                    {/*Create page for Manage Course*/}
                    <td><Link to="manageCourse" params={{ id: course.id }}>{course.id}</Link></td>
                    <td>{course.title}</td>
                    <td key={authorId}>{authorName}</td>
                    <td>{course.length}</td>
                    <td>{course.category}</td>
                </tr>
            );
        };
        return (
            <div>
                <table className="table">
                    <thead>
                        <th></th>
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Length</th>
                        <th>Category</th>
                    </thead>
                    <tbody>
                        {this.props.courses.map(createCourseRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = CourseList;