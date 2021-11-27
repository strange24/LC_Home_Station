import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Celebrities from './pages/celebrities';
import Goals from "./pages/goals";
import Financial from "./pages/finacial";
import SummaryDetail from "./pages/summary_detail";
import RewardPunishment from './pages/punishments';
import HistoryOfLc from "./pages/history_lc";
import Manage from './pages/manage';
import Space from './pages/space';
import Album from './pages/album';
import UpdateUserInfo from './pages/space/components/userinfo_update';
import SummaryAddOrUpdate from './pages/summary-add';
import AlbumDetail from './pages/album-detail';
import TeamMembers from "./pages/members";
import HistoryNews from './pages/history_news';
import IntroductionDoc from "./pages/docs";
import Test from './pages/test';
import 'animate.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact component={Login}></Route>
        <Route path='/celebrities' exact component={Celebrities}></Route>
        <Route path='/goals' exact component={Goals}></Route>
        <Route path='/financial' component={Financial}></Route>
        <Route path='/summary_detail' component={SummaryDetail}></Route>
        <Route path='/history' component={HistoryOfLc}></Route>
        <Route path='/reward_punishment' component={RewardPunishment}></Route>
        <Route path='/manage' component={Manage}></Route>
        <Route path='/space/updateuserinfo'  component={UpdateUserInfo}></Route>
        <Route path='/space/summaryadd' component={SummaryAddOrUpdate}></Route>
        <Route path='/space' component={Space}></Route>    
        <Route path='/album/detail'component={AlbumDetail} />
        <Route path='/album' component={Album}></Route>
        <Route path='/members' component={TeamMembers}></Route>
        <Route path='/history_news' component={HistoryNews}></Route>
        <Route path='/docs' component={IntroductionDoc}></Route>
        <Route path='/test' component={Test}></Route>
        <Route path='/' component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
