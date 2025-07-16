import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
const SingleProduct = () => {
  const { products, navigate, addToCart } = useAppContext();
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const product = products.find((product) => product._id === id);
  console.log("product", product);
  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (product) => product.category === product.category
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);

  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);
  return (
    product && (
      <div className="mt-16">
        <p>
          <Link to="/">Home</Link>/<Link to={"/products"}> Products</Link> /
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {" "}
            {product.category}
          </Link>{" "}
          /<span className="text-indigo-500"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img
                    src={`http://localhost:5000/images/${image}`}
                    alt={`Thumbnail ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img
                src={`http://localhost:5000/images/${thumbnail}`}
                alt="Selected product"
              />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map(
                  (_, i) =>
                    product.rating >
                    (
                      <img
                        src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                        alt="star"
                        key={i}
                        className="w-3.5 md:w-4"
                      />
                    )
                )}
              <p className="text-base ml-2">(4)</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: ${product.price}
              </p>
              <p className="text-2xl font-medium">MRP: ${product.offerPrice}</p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => addToCart(product._id)}
                className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                  scrollTo(0, 0);
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
        {/* related prodcuts  */}
        <div className="flex flex-col items-center mt-20">
          <div className="flex flex-col items-center w-max">
            <p className="text-2xl font-medium">Related Products</p>
            <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
          </div>

          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center">
            {relatedProducts
              .filter((product) => product.inStock)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
          <button
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="w-1/2 my-8 py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition"
          >
            See More
          </button>
        </div>
      </div>
    )
  );
};
export default SingleProduct;
