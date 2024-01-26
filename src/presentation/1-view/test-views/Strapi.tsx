
import React, { useState, FormEvent } from 'react';

import { CardElement, ElementsConsumer, Elements } from '@stripe/react-stripe-js'; 
import { loadStripe, Stripe as StripeType,StripeElements } from '@stripe/stripe-js';
import axios from 'axios';
import { STRIPE_PUBLIC_KEY } from '../pages/config';

// Reemplaza esto con tu clave pública de Stripe
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
const STRAPI_URL='https://localhost:3001/api/checkout'
interface CheckoutFormProps {
  stripe: StripeType | null;
  elements:StripeElements | null;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ stripe, elements }) => {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
    });

    if (error) {
      console.log(error);
      setError('Ocurrió un error al procesar el pago.');
      setLoading(false);
    } else {
      //setLoading(true);
      const { id } = paymentMethod!;
      try {
        const { data } = await axios.post(
            STRAPI_URL,
          {
            id,
            amount: 10000, //cents
          }
        );
        console.log(data);
        cardElement!.clear();
      } catch (error) {
        console.log(error);
        setError('Ocurrió un error al procesar el pago.');
      }
      setLoading(false);
    }
  };

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      {/* Información del producto */}
      <img
        src="https://i.ibb.co/88qydfc/lilu.jpg"
        alt="Corsair Gaming Keyboard RGB"
        className="img-fluid"
      />

      <h3 className="text-center my-2">Precio: 100$</h3>

      {/* Entrada de tarjeta del usuario */}
      <div className="form-group">
        <CardElement />
      </div>
      {error && <p>{error}</p>}
      <button disabled={!stripe} className="btn btn-success">
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span  className="sr-only">Cargando...</span>
          </div>
        ) : (
          'Comprar'
        )}
      </button>
    </form>
  );
};

const StrapiApp: React.FC = () => {

  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row h-100">
          <div className="col-md-4 offset-md-4 h-100">
            <ElementsConsumer>
              {({ stripe, elements }) => (
                <CheckoutForm stripe={stripe} elements={elements} />
              )}
            </ElementsConsumer>
          </div>
        </div>
      </div>
    </Elements>
  );

}

export default StrapiApp;
