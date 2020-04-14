import React, { useRef, useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';

const Storage = () => {
  const refUploadInput = useRef<HTMLInputElement | null>();
  const [img, setImg] = useState('');

  const uploadImage = () => {
    if (!!img) {
      const storage = firebase.storage().ref(`/product-images/${'51131321321'}.jpg`);
      storage
        .putString(img, 'data_url', { contentType: 'image/jpg' })
        .then(res => {
          console.log({ res });
          res.ref.getDownloadURL().then(url => console.log(url));
        })
        .catch(err => console.log({ err }));
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Storage</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <input
                ref={r => (refUploadInput.current = r)}
                type="file"
                accept="image/*"
                hidden
                onChange={event => {
                  if (!!event.target.files) {
                    toBase64(event.target.files[0]).then(base64 => setImg(base64 as string));
                  }
                }}
              />
              <IonButton onClick={() => refUploadInput.current?.click()}>load image</IonButton>
              <IonButton color="success" onClick={uploadImage}>
                upload image
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <img src={img} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default Storage;

const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
