import { useState } from "react";

export default function Marketplace() {
  const [username] = useState("Guest"); // default guest username

  const [products, setProducts] = useState([
    { id: 1, name: "Crochet Top", price: "Ksh 2500", image: "/images/Crochet Top.jfif", reviews: [] },
    { id: 2, name: "Beaded Necklace", price: "Ksh 350", image: "/images/necklace.jpg", reviews: [] },
    { id: 3, name: "Crochet Bag", price: "Ksh 2900", image: "/images/Crochet Bag.jfif", reviews: [] },
  ]);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const handleAddToCart = (product) => {
    if (!cart.find((i) => i.id === product.id)) setCart([...cart, product]);
  };

  const handleAddToWishlist = (product) => {
    if (!wishlist.find((i) => i.id === product.id)) setWishlist([...wishlist, product]);
  };

  const handleAddReview = (productId, rating, comment) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, reviews: [...product.reviews, { rating, comment, user: username }] }
          : product
      )
    );
  };

  const getAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">CraftPal</h1>
      </header>

      <main className="flex-1 px-8 py-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Crafts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onAddReview={handleAddReview}
              getAverageRating={getAverageRating}
            />
          ))}
        </div>
      </main>

      <footer className="bg-gray-100 text-gray-600 text-center py-4 text-sm mt-auto">
        © {new Date().getFullYear()} CraftPal. All rights reserved.
      </footer>
    </div>
  );
}

function ProductCard({ product, onAddToCart, onAddToWishlist, onAddReview, getAverageRating }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const avgRating = getAverageRating(product.reviews);

  const submitReview = (e) => {
    e.preventDefault();
    if (rating && comment) onAddReview(product.id, rating, comment);
    setRating(0);
    setComment("");
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
      <h3 className="mt-4 text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-600">{product.price}</p>

      {/* Ratings */}
      <div className="flex items-center gap-1 mt-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < Math.round(avgRating) ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
        <span className="text-sm text-gray-500 ml-1">({product.reviews.length})</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onAddToCart(product)}
          className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
        <button
          onClick={() => onAddToWishlist(product)}
          className="flex-1 bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition"
        >
          Wishlist
        </button>
      </div>

      {/* Reviews */}
      <form onSubmit={submitReview} className="mt-4">
        <h4 className="text-sm font-semibold mb-2 text-gray-700">Leave a Review</h4>
        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => setRating(num)}
              className={`cursor-pointer ${rating >= num ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your feedback..."
          className="w-full p-2 border rounded-md text-sm"
          rows="2"
        />
        <button
          type="submit"
          className="mt-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
