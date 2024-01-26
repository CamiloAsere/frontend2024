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
      <img
        src={product.image} // Asegúrate de que tu producto tenga un campo de imagen
        alt={product.name} // Asegúrate de que tu producto tenga un campo de nombre
        className="img-fluid"
      />

      <h3 className="text-center my-2">Precio: {product.price}$</h3> // Asegúrate de que tu producto tenga un campo de precio

      {/* Entrada de tarjeta del usuario */}
      <div className="form-group">
        <CardElement />
      </div>
      {error && <p>{error}</p>}
      <button disabled={!stripe} className="btn btn-success">
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
        ) : (
          'Comprar'
        )}
      </button>
    </form>
  );
};
