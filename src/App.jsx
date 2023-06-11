import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import { Security, SecureRoute } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import { Header } from "./components/Header";
import { useEffect } from "react";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CALLBACK_PATH = process.env.REACT_APP_CALLBACK_PATH;
const ISSUER = process.env.REACT_APP_ISSUER;
const HOST = process.env.REACT_APP_HOST;
const SCOPES = process.env.REACT_APP_SCOPES;
const DOMAIN = process.env.REACT_APP_OKTA_DOMAIN;
const IdP = process.env.REACT_APP_IDP;
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;

if (!SCOPES || !CLIENT_ID || !CALLBACK_PATH || !ISSUER || !HOST) {
  throw new Error("All environmental variables must be set");
}

const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scopes: SCOPES.split(/\s+/),
  pkce: true
};

const oktaAuth = new OktaAuth(config);

const App = () => {
  const history = useHistory();
  const URL = `https://${DOMAIN}/oauth2/v1/authorize?idp=${IdP}&client_id=${CLIENT_ID}&response_type=code&response_mode=fragment&scope=openid%20email&redirect_uri=${REDIRECT_URI}%2F&state=WM6D&nonce=YsG76jo&code_challenge=`;

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/dashboard", window.location.origin));
  };

  useEffect(() => {
    console.log(URL);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Security restoreOriginalUri={restoreOriginalUri} oktaAuth={oktaAuth}>
          <Header url={URL} />
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/dashboard" exact component={Dashboard}/>
          </Switch>
        </Security>
      </BrowserRouter>
    </>
  );
};

export default App;
