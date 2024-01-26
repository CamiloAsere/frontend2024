import React, { useState, FormEvent } from 'react';
import { CardElement, ElementsConsumer, Elements } from '@stripe/react-stripe-js'; 
import { loadStripe, Stripe as StripeType,StripeElements } from '@stripe/stripe-js';
import axios from 'axios';
import { STRIPE_PUBLIC_KEY } from '../pages/config';
import styles from '../../../assets/ProductCard.module.css';
const morado='#572364'
const naranja='#FFA500'
const ProductCard = ({ product, onSelectProduct }) => {
  return (
    <div className={styles.productCard} onClick={() => onSelectProduct(product)}>
      <img src={product.image} alt={product.name} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h2 className={styles.productName} >{product.name}</h2>
        <p className={styles.productPrice}>{product.amount}$</p>
      </div>
    </div>
  );
};

const STRAPI_URL='https://localhost:3001/api/checkout'

const ProductList = ({ products, onSelectProduct }) => {
  return(
    <div className={styles.gridstyles}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
      ))}
    </div>
  );
};

const ProductDetail = ({ product, stripe, elements }) => {
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
      const { id } = paymentMethod!;
      try {
        const { data } = await axios.post(
          STRAPI_URL,
          {
            id,
            amount: product.price, // Asegúrate de que tu producto tenga un campo de precio
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
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img
      src={product.image} // Asegúrate de que tu producto tenga un campo de imagen
      alt={product.name} // Asegúrate de que tu producto tenga un campo de nombre
      style={{ width: '150px', height: '150px', borderRadius: '5%', objectFit: 'cover' }}
    />
  </div>

  <h3 className="text-center my-2">Precio: {product.amount}$</h3> {/* Asegúrate de que tu producto tenga un campo de precio */}

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
  const [stripePromise, setStripePromise] = useState(() => loadStripe(STRIPE_PUBLIC_KEY));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const products = [
{
    amount:100,
    name: "Ally",
    image: "https://i.ibb.co/88qydfc/lilu.jpg",
   
  },
  { amount:80,
    name: "Molly",
    image: "https://i.ibb.co/PcWmskm/molly.jpg",
    
  },
  { amount:110,
    name: "Mayumi",
    image: "https://i.ibb.co/3pvs9XR/mayumi2.jpg",
   
  },
  { amount:200,
    name: "Himeko",
    image: "https://i.ibb.co/kMfJ9Dn/himeko.jpg",
    
  },
  ]; // reemplaza esto con tus productos

  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row h-100">
          <div className="col-md-4">
            <ProductList products={products} onSelectProduct={setSelectedProduct} />
          </div>
          <div className="col-md-4 offset-md-4 h-100">
            {selectedProduct && (
              <ElementsConsumer>
                {({ stripe, elements }) => (
                  <ProductDetail product={selectedProduct} stripe={stripe} elements={elements} />
                )}
              </ElementsConsumer>
            )}
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default StrapiApp;

