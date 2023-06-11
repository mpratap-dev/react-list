import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CALLBACK_PATH = process.env.REACT_APP_CALLBACK_PATH;
const ISSUER = process.env.REACT_APP_ISSUER;
const HOST = process.env.REACT_APP_HOST;
const SCOPES = process.env.REACT_APP_SCOPES;
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;

function Header({ url }) {
  const auth = useOktaAuth();
  const { oktaAuth } = auth;
  const { search } = useLocation();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);
  const loginWithRedirect = () => oktaAuth.signInWithRedirect();
  const searchParams = new URLSearchParams(search);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const logOut = () => oktaAuth.signOut();
  const buttonText = userInfo ? "Logout" : "Login";
  const btnLogic = userInfo ? logOut : loginWithRedirect;


  const userinfo = async (responseData) => {
    const { access_token } = responseData;
    const url = 'https://dev-67222366.okta.com/oauth2/default/v1/userinfo';

    const res = await axios.get(url, {
      headers: { 'Authorization': `Bearer ${access_token}` }
    });
    setUserInfo(res);
    history.push('/dashboard');
    localStorage.setItem('userinfo', JSON.stringify(res.data));
  }

  const getUserData = async () => {
    try {
      setLoading(true);
      const o = localStorage.getItem('okta-shared-transaction-storage');
      const storageData = JSON.parse(o);
      const code_verifier = storageData[state].transaction.codeVerifier;
  
      const data = {
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier,
        code_challenge_method: "S256",
        scope: SCOPES.split(/\s+/)
      }
      const serializedData = new URLSearchParams(data).toString()
  
      const url = 'https://dev-67222366.okta.com/oauth2/default/v1/token';
  
      const res = await axios.post(url, serializedData, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      });
  
      const responseData = res.data;
      responseData && userinfo(responseData);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    !loading && code && state && getUserData();
  }, [code, state, loading]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 20, background: "black", color: "#fff" }}>
      <h5 style={{ marginBottom: 0 }}>Okta React</h5>
      <button 
        style={{ background: "white", border: "none", borderRadius: 8, padding: "8px 15px" }} 
        onClick={btnLogic}
        disabled={loading}
      >
          {buttonText}
      </button>
    </div>
  );
}

export { Header };