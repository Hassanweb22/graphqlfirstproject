import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from '../components/AppBar'
import Parents from '../components/Parent/Parent'
import Childrens from '../components/Parent/Childrens'
import Home from '../components/Home'
import Childs from '../components/Childs'


export default function Routes() {
    return (
        <Router>
            <AppBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/parents" component={Parents} />
                <Route path="/parents/:id" component={Childrens} />
                <Route path="/childs" component={Childs} />
            </Switch>
        </Router>
    )
}
