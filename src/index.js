import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase";

const firebaseConfig = {
  type: "service_account",
  projectId: "henefisa-blog",
  private_key_id: "93f722cda81e607c4722da0a5d986b4481a0b2b6",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDa3G6k36QO2Oz6\nMXXbfidx/vFf8nALyH14PRD0GBupD1i2h0MGZYScBz5VllMomDnJ5Rl+iDgAo4K5\nsRo8TcrHQIvSVrkr4VdnrR5o20fdusG9zEZ1BdwiFHMBmkfjhn7n953mSP7R7muU\n4OaeoDSP+bSwdmVnWEDOy9dz8GMf6zAmZXuxw0K5QPo4hVZF95wcR8y0K+9ZV+Kb\nT/RWJt0I2wDdtuOL5MLV3zuI39GznJSZgO3aFiTlrCqTBsGDSbAS9VhodMcz067z\nAx7FHQaHH8LP0axjOG5taiTTdZlfh1yZGVXX5ViNMvY0ScaXt0nv+REM1La2wbZP\nZ6ip/B+JAgMBAAECggEAFYDI4iwS616G0gIgCUO4zmt0/a9NMOsu4KxnSQRBW3fl\niHF7tVouEEJp7nDJlNh3/Q0kVxk9H1rxUhtDb59ZCACgfDcHFHecZdRNg5Hf2rop\npOM4HPFJcpO9xO+KlqE1QMdEXUbYunmJWmRKZFVrNKYdCaVoSyIRo//FGGAK7Sy4\nx+5aPr77OW7nhyjby1afQs1PZVlZxlM2QuuiaF2JW3S7F9iFujn/3fTVgKBecioS\nUBEWk9suSG+tuGpvt7fN24UnAe7fwWH/37cRx1ZbLLGyMyj3eXcP44C4HgmCmuDP\nJ3nFjjZCBwzELZBNqay9T5a6CcU3160Tc/hAbn+YXQKBgQD5WyznqJQ1TO2J4d52\nYpYlbKOFHlGVN7Pj/ZGbPqzHC64Wa2wxR7TU2xRmmSgEiMH6pmkSMZVlwqywGlCD\nLUacR/pl7JjiA2AUxcEiLkTBBvAW6T30WhQmdehKpZ8LOX4fxqqB1+U5g0WXXcNR\nynpJuUyOluN2G18ABfLiHzTTmwKBgQDgsUD/+WQXJbYKHmtHkYryZTFK2+qHTx+8\nsU75PF/RKyvwlgJvC8gogTmeSn1vKK+5O8Ee7jUzkAPiog2+tSGq+oe1VUJIpyNc\nZ5WoNQkS2O48BzYky7HYJUiyHOqHIsJtg455WmCQYDWuQsQw5Xl5EGK77j00fC3U\nQy+pIZ5FqwKBgQCIgV46z3GbICrlkY28V0oE4M0/oZJd0qmbBQRB7XSeXomF4nbP\nH4ciA3DOncdnfApdEd5xRE2Z8JGisjUjKpT+FvU/+N7U0640kPGiqZuf5BFpKXRu\nISXozCFHRBWmCmo+MP7EqBDnhDKDo6O6UdLSKyt636VT0bYXCCqnmRfNQwKBgBY4\nUTY/Im/LkeoEQhWsxfHcofhGMTY6U+gkHKw3FT6pJ0o+e3Uh1CR1Sw5lTWw9uMr3\npsx5QBeeSVQTNIrEfNTcu6jqCokGxk9wCvO8cu5DN6QGDouq/SZj4YGDrIm6nUGZ\nPfCwSFZevVBDWAWB2/Zl8W2mTLUxBpM0JbVzFqTLAoGBAN3wLLzAh8WO4al5sDX6\njiWrOGCiRnDsJb/kPPtnnzHkP0reXea5/gkDDfZdhLi/I8SK6pLa0ZpnNbO3AWjW\n5Le3TSlzcYRVfB0twNTsI4yr1zOpcQVGPGUAjrdCsids9Sx8cqGUQ+66ooMvfQdn\nL6Ox7XyVucl0hJTk8ibeXL/H\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-rq6ky@henefisa-blog.iam.gserviceaccount.com",
  client_id: "103606374588889985420",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rq6ky%40henefisa-blog.iam.gserviceaccount.com"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
