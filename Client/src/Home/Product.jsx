import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="singleProduct">

      <img src={product.image} alt="" />

      <div>

        <h1>{product.title}</h1>

        <h2>₹{product.price}</h2>

        <p>{product.description}</p>

        <button>Add To Cart</button>

        <button style={{ marginLeft: "20px" }}>
          Buy Now
        </button>

      </div>

    </div>
  );
}

export default Product;