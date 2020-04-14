import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow } from '@ionic/react';
import Authentication from '../components/Authentication';
import Database from '../components/Database';
import Storage from '../components/Storage';

const HomePage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Firebase Workshop</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <Storage />
          </IonRow>
          <IonRow>
            <Authentication />
          </IonRow>
          <IonRow>
            <Database />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
