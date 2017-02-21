import React    from 'react';
import ReactDOM from 'react-dom';
import PageList from './components/app-component.jsx';
import PageDetails from './components/page-details.jsx';

import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/:pageId" component={PageDetails} />
            <IndexRoute component={PageList} />
        </Route>
    </Router>
);

ReactDOM.render((routes), document.getElementById('react-app'));