import React from 'react';
import { Link } from 'react-router-dom'

class CourseRow extends React.Component {
  constructor(props) {
    super(props);
    this.deleteCourse = this.deleteCourse.bind(this);
    // console.log(props.course);
    // console.log(props.deleteHandler);

  }
  render() {
    return (
      <tr className="row col-12"><td className="col-5">
        <Link to={`/course/${this.props.course.id}`}>
          {this.props.course.title}
        </Link>
      </td>
      <td className="col-3">
          me
      </td>
      <td className="col-2">
          {this.props.course.modified}
      </td>
      <td className="col-1">

      </td>
      <td className="col-1">
          <i className="fa fa-times wbdv-hand-cursor" onClick={this.deleteCourse}></i>
      </td>
      </tr>
    )
  }

  deleteCourse(){
      this.props.deleteHandler(this.props.course.id);
  }
}
export default CourseRow;
