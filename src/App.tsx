import "./App.scss";
import React from "react";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import HomePage from "./pages/HomePage";
import * as firebase from "firebase/app";
import firebaseConfig from "./firebase.config";

firebase.initializeApp(firebaseConfig);

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <HomePage />
    </IonReactRouter>
  </IonApp>
);

export default App;
