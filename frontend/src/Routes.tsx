import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import TaskDetails from './pages/TaskDetails';
import ProjectEdit from './pages/ProjectEdit';
import TaskEdit from './pages/TaskEdit';


interface Props {

}

const Routes = (props: Props) => {
    return (
        <Switch>
            <Route
                exact
                path="/login"
                component={Login}
            />
            <Route
                exact
                path="/signup"
                component={Signup}
            />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/projects/edit" component={ProjectEdit} />
            <PrivateRoute exact path="/projects/:id" component={ProjectDetails} />
            <PrivateRoute exact path="/projects/:projectId/tasks/edit" component={TaskEdit} />
            <PrivateRoute exact path="/projects/:projectId/tasks/:taskId" component={TaskDetails} />
        </Switch>
    )
}

export default Routes;