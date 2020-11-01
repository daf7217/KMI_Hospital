import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route ,Switch} from 'react-router-dom';
import Login from './component/Login';
import Mainmenu from './component/Mainmenu';
import Update from './component/Update';
import Covid from './component/Covid';
import Quarantine from './component/Quarantine';
import Pui from './component/Pui';
import Background from './img/bg4.jpg';
function App() { 
  return (
    <BrowserRouter>
    <div className="App">
          <nav className="navbar fixed-top text-center text-white bg-dark" style={{overflow : "hidden", top : "1", width : "100%"}}>
              <span style={{marginLeft: "3%"}}><h3>Khammuang Integration Hospital&nbsp;&nbsp;ระบบบูรณาการโรงพยาบาลคำม่วง</h3></span>
          </nav>
          {/* <div style={{overflowY: "auto" , height: "100vh",backgroundImage: `url(${Background})`}}> */}
          <div>
             <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/mainmenu" component={Mainmenu}/>
                <Route exact path="/covid" component={Covid}/>
                <Route exact path="/update" component={Update}/>
                <Route exact path="/quarantine" component={Quarantine} />
                <Route exact path="/pui" component={Pui} />
            </Switch>
          </div>
        <footer className="bg-dark text-white" style={{position: "fixed",left: "0",bottom: "0",width: "100%",height: "8%",color: "white",textAlign: 'center',paddingTop: '15px'}}>
          <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <h5>© 2020 Copyright กลุ่มงานเทคโนโลยีสารสนเทศโรงพยาบาลคำม่วง</h5>
            </div>
            <div style={{textAlign: "right"}} className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              <span style={{fontSize : "10%"}}>version 2020.01</span>&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </footer>
    </div>
    </BrowserRouter>
  );
}
export default App;
