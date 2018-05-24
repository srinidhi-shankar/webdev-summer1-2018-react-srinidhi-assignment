import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import ModuleService from "../services/ModuleService";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ModuleEditor from "./ModuleEditor";

export default class CourseEditor
  extends React.Component {

  constructor(props) {
    super(props);
    this.state = {courseId: ''};
    this.selectCourse = this.selectCourse.bind(this);
    //this.deleteModule = this.deleteModule.bind(this);
  }

  componentDidMount() {
    this.selectCourse
    (this.props.match.params.courseId);
  }

  selectCourse(courseId) {
    this.setState({courseId: courseId});
  }

  render() { return(
    <Router>
    <div className="container-fluid bg-dark">
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Course Editor</a>
        </nav>
      <div className="row">
        <div className="col-4 bg-dark">
          <ModuleList courseId={this.state.courseId}/>
        </div>
        <div className="col-8">
                <Route exact path="/course/:courseId/module/:moduleId" component={ModuleEditor}></Route>
        </div>
      </div>
    </div>
    </Router>

  );}}
