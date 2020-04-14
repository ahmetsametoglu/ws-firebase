import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import PrettyPrintJson from './PrettyPrintJson';

type State = {
  username: string;
  password: string;
  user?: firebase.auth.UserCredential;
  err?: any;
};
const Authentication = () => {
  const [state, setState] = useState<State>({ username: 'ahmet@gmail.com', password: 'sametoglu' });

  const handleLogin = () => {
    setState({ ...state, user: undefined, err: undefined });
    firebase
      .auth()
      .signInWithEmailAndPassword(state.username, state.password)
      .then(res => {
        setState({ ...state, user: res });
        console.log(!!res);
      })
      .catch(err => setState({ ...state, err }));
  };

  const resetPassword = () => {
    firebase.auth().sendPasswordResetEmail(state.username);
  };

  const handleRegister = () => {
    setState({ ...state, user: undefined, err: undefined });
    firebase
      .auth()
      .createUserWithEmailAndPassword(state.username, state.password)
      .then(res => {
        setState({ ...state, user: res });
        res.user?.sendEmailVerification();
      })
      .catch(err => setState({ ...state, err }));
  };

  const loginWithGoogle = () => {
    setState({ ...state, user: undefined, err: undefined });

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(res => {
        setState({ ...state, user: res });
      })
      .catch(err => setState({ ...state, err }));
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Authentication</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonList>
                <IonItem>
                  <IonLabel>username</IonLabel>
                  <IonInput
                    value={state.username}
                    onIonChange={e => setState({ ...state, username: e.detail.value || '' })}></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>password</IonLabel>
                  <IonInput
                    value={state.password}
                    onIonChange={e => setState({ ...state, password: e.detail.value || '' })}></IonInput>
                </IonItem>
              </IonList>
              <IonButton onClick={handleLogin}>Login</IonButton>
              <IonButton color="danger" onClick={handleRegister}>
                Register
              </IonButton>
              <IonButton color="success" onClick={resetPassword}>
                Reset Password
              </IonButton>
              <IonButton color="tertiary" onClick={loginWithGoogle}>
                Login With Google
              </IonButton>
              <IonButton
                color="warning"
                onClick={() => {
                  firebase.auth().signOut();
                }}>
                Logout
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            {/* <IonCol>
              <PrettyPrintJson data={state.user} />
            </IonCol> */}
            <IonCol>
              <PrettyPrintJson data={state.err} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default Authentication;
