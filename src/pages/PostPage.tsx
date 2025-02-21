import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/PostPage.css";

const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  // Mocked post data
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading post data
    setTimeout(() => {
      setPost({
        _id: postId,
        subject: "Lorem ipsum dolor sit amet.",
        body: "Lorem ipsum dolor amet mustache knausgaard +1, blue bottle waistcoat tbh semiotics artisan synth stumptown gastropub cornhole celiac swag.",
        _creationTime: Date.now(),
        author: { username: "Develeopper" },
        subreddit: { name: "reactjs" },
        imageUrl: "/images/carbon.png",
      });
      setLoading(false);
    }, 1000);
  }, [postId]);

  if (loading) return <div className="post-page loading"><div className="container">Loading...</div></div>;

  if (!post) {
    return (
      <div className="post-page not-found">
        <div className="container">Post not found</div>
      </div>
    );
  }

  return (
    <div className="post-page">
      <div className="container">
        <div className="page-header">
          <div
            onClick={() => navigate(-1)}
            className="back-link"
            style={{ cursor: "pointer" }}
          >
            <FaArrowLeft /> Back
          </div>
        </div>
        <PostCard post={post} showSubreddit={true} expandedView={true} />
      </div>
    </div>
  );
};

export default PostPage;
