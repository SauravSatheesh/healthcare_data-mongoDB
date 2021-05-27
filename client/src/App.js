import React from 'react';
import {NavBar} from './component/NavBar';
import {PatientList} from './component/PatientList';
import {GlobalProvider} from './patientContext/GlobalState';
import {AuthProvider} from './authContext/authState';
import {LoginForm} from './component/LoginForm';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { RegistrationForm } from './component/registrationForm';
import setAuthToken from './authToken/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
 
  

return (
       <AuthProvider>
       <GlobalProvider>
    <div >
    <Router>
      <Route path="/" component={NavBar}/>
      <Route path="/"exact component={LoginForm}/>
      <Route path="/patient" component={PatientList}/>
      <Route path="/registration" component={RegistrationForm}/>
      </Router>
    </div>
     </GlobalProvider>
     </AuthProvider>
  );
}

export default App;
