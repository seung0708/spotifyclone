export const clientId = '63f74899ca954c22aa8844c796fdfbbc'; 


const redirectUrl = 'http://localhost:3000';
const params = new URLSearchParams(window.location.search);
export const code = params.get("code")
const scope = "user-read-private user-read-email playlist-modify-public"


function generateCodeVerifier(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
}

export async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId, 
    scope, 
    code_challenge_method: 'S256',
    code_challenge: challenge,
    redirect_uri: redirectUrl
  });

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: 'POST',
    headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUrl,
        client_id: clientId,
        code_verifier: verifier,
    })
  });
  const data = await response.json();
  
  if (!(Date.now() >= data.expires_in * 1000)) {
    const refreshToken = getRefreshToken()
  } else {
    return data.access_token
  }

}

export async function fetchProfile(token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}

const getRefreshToken = async () => {

  // refresh token that has been previously stored
  const refreshToken = localStorage.getItem('refresh_token');
  const url = "https://accounts.spotify.com/api/token";

   const payload = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     body: new URLSearchParams({
       grant_type: 'refresh_token',
       refresh_token: refreshToken,
       client_id: clientId
     }),
   }

   const response = await fetch(url, payload);

   localStorage.setItem('access_token', response.accessToken);
   localStorage.setItem('refresh_token', response.refreshToken);
 }