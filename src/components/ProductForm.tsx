import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSpinner,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import { IProduct } from '../api/model/product';

type State = { loading: boolean; error: string };
const initialProduct: IProduct = {
  name: 'domates',
  brand: 'ispanya',
  category: 'sebze',
  price: 1.99,
};

const ProductForm = () => {
  const [state, setState] = useState<State>({ loading: false, error: '' });
  const [product, setProduct] = useState<IProduct>(initialProduct);

  const saveProduct = () => {
    setState({ loading: true, error: '' });

    const a = firebase.firestore().collection('products');
    a.add(product)
      .then(res => {
        console.log('add product data res:', res);
        setState({ loading: false, error: '' });
      })
      .catch(err => {
        console.log('add product data err:', err);
        setState({ loading: false, error: err.message });
      });
  };

  return state.loading ? (
    <IonSpinner />
  ) : !!state.error ? (
    <IonItem>
      <IonLabel color="danger">{state.error}</IonLabel>
      <IonButton slot="end" onClick={() => setState({ loading: false, error: '' })}>
        Ok
      </IonButton>
    </IonItem>
  ) : (
    <IonCard style={{ width: '450px' }}>
      <IonCardHeader>
        <IonCardTitle>Product Form</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonItem>
            <IonLabel position="floating">name</IonLabel>
            <IonInput
              value={product.name}
              onIonChange={e => setProduct({ ...product, name: e.detail.value || '' })}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">price</IonLabel>
            <IonInput
              type="number"
              value={product.price}
              onIonChange={e => setProduct({ ...product, price: Number(e.detail.value) || 0 })}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">category</IonLabel>
            <IonInput
              value={product.category}
              onIonChange={e => setProduct({ ...product, category: e.detail.value || '' })}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">brand</IonLabel>
            <IonInput
              value={product.brand}
              onIonChange={e => setProduct({ ...product, brand: e.detail.value || '' })}></IonInput>
          </IonItem>
        </IonList>
        <IonButton onClick={saveProduct}>Save Product</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default ProductForm;
