import { useEffect, useRef, useState } from "react";
import { FaComment, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likeAnim, setLikeAnim] = useState({});
  const containerRef = useRef(null);

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const res = await API.get("/api/community"); // backend route
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      alert("Failed to load posts. Make sure you are logged in.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Snap scrolling handler
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const height = window.innerHeight;
    const index = Math.round(scrollTop / height);
    setCurrentIndex(index);
  };

  // Like/Unlike post
  const handleDoubleClick = async (postId) => {
    try {
      // Optimistic UI update
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, likes: [...post.likes, "temp"] } : post
        )
      );
      setLikeAnim({ [postId]: true });
      setTimeout(() => setLikeAnim({ [postId]: false }), 800);

      const res = await API.post(`/api/community/${postId}/like`); // backend route
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, likes: Array(res.data.likes).fill("id") } : post
        )
      );
    } catch (err) {
      console.error("Error liking post:", err);
      alert("You must be logged in to like posts.");
    }
  };

  // Add comment
const handleAddComment = async (postId, text) => {
  if (!text) return;
  try {
    const res = await API.post(`/community/${postId}/comment`, { text });
    setPosts(prev =>
      prev.map(post => post._id === postId ? { ...post, comments: res.data } : post)
    );
  } catch (err) {
    console.error("Error adding comment:", err);
    if (err.response && err.response.status === 401) {
      // Token invalid or missing
      localStorage.removeItem("token");
      setAuthToken(null);
      alert("Session expired. Please log in.");
      window.location.href = "/login"; // redirect manually
    } else {
      alert("Failed to comment.");
    }
  }
};

  // Optional infinite scroll
  useEffect(() => {
    const container = containerRef.current;
    const handleEndScroll = () => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
        // Fetch more posts with pagination here if needed
      }
    };
    container.addEventListener("scroll", handleEndScroll);
    return () => container.removeEventListener("scroll", handleEndScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      {posts.map((post) => (
        <div
          key={post._id}
          className="h-screen w-full snap-start relative bg-black flex items-end"
        >
          {/* Post Image */}
          {post.mediaUrl && (
            <img
              src={post.mediaUrl}
              alt={post.content || "post image"}
              className="absolute w-full h-full object-cover"
              onDoubleClick={() => handleDoubleClick(post._id)}
            />
          )}

          {/* Heart Animation */}
          {likeAnim[post._id] && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <FaHeart className="text-white text-6xl animate-pop-heart" />
            </div>
          )}

          {/* Overlay Info */}
          <div className="relative z-10 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent w-full text-white">
            <Link to={`/profile/${post.userId.username}`}>
              <p className="font-semibold text-lg hover:underline">
                {post.userId.username}
              </p>
            </Link>
            <p className="mt-2 text-md">{post.content}</p>

            {/* Action Buttons */}
            <div className="flex mt-4 gap-6">
              <button
                onClick={() => handleDoubleClick(post._id)}
                className="flex items-center gap-1 text-red-500 font-bold"
              >
                <FaHeart /> {post.likes.length}
              </button>
              <Link to={`/post/${post._id}`}>
                <button className="flex items-center gap-1 text-blue-400 font-bold">
                  <FaComment /> {post.comments.length}
                </button>
              </Link>
            </div>

            {/* Add Comment */}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 p-2 rounded-lg text-black"
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    await handleAddComment(post._id, e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
