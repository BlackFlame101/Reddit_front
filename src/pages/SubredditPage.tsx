import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import "../styles/SubredditPage.css";

const SubredditPage = () => {
  const { subredditName } = useParams();
  const navigate = useNavigate();

  
  const [subreddit, setSubreddit] = useState<{ name: string; description?: string } | null>(null);
  
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setSubreddit({
        name: subredditName || "general",
        description: "A place for all general discussions.",
      });
      setPosts([
        {
          _id: "1",
          title: "Post 1",
          content: "This is the content of the first post.",
        },
        {
          _id: "2",
          title: "Post 2",
          content: "This is the content of the second post.",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, [subredditName]);

  if (loading) return <p>Loading...</p>;

  if (!subreddit) {
    return (
      <div className="content-container">
        <div className="not-found">
          <h1>Subreddit not found</h1>
          <p>The subreddit r/{subredditName} does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <div className="subreddit-banner">
        <h1>r/{subreddit.name}</h1>
        {subreddit.description && <p>{subreddit.description}</p>}
      </div>
      <div className="posts-container">
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts yet. Be the first to post</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default SubredditPage;
