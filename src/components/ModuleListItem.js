import React from 'react';
import { Link } from 'react-router-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LessonTabs from "../containers/LessonTabs"

export default class ModuleListItem
  extends React.Component {
  constructor(props) {
    super(props);
    this.deleteModule = this.deleteModule.bind(this);
  }

  render() {
    return (
      <li className="list-group-item">
        <Link to ={`/course/${this.props.courseId}/module/${this.props.module.id}`}>{this.props.module.title}</Link>
        <span className="float-right">
          <i className="fa fa-times wbdv-hand-cursor" onClick={this.deleteModule}></i>
        </span>
      </li>
    );
  }

  deleteModule(){
      this.props.deleteModuleHandler(this.props.module.id);
  }
}
