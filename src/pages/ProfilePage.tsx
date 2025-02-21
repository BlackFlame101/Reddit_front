import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import "../styles/SubmitPage.css";

const ProfilePage = () => {
  const { username } = useParams();

  
  const posts = [
    {
      _id: "1",
      subject: "Post 1",
      body: "This is the first post.",
      _creationTime: Date.now(),
      authorId: {username},
      author: { username: "dev_guru" },
      subreddit: { name: "react" },
    },
    {
      _id: "2",
      subject: "Post 2",
      body: "This is the second post.",
      _creationTime: Date.now() - 86400000, 
      authorId: "dev_guru",
      author: { username: "dev_guru" },
      subreddit: { name: "vuejs" },
    },
  ];

  const stats = {
    posts: posts.length, 
  };

  
  if (!posts || posts.length === 0)
    return (
      <div className="content-container">
        <div className="profile-header">
          <h1>u/{username}</h1>
        </div>
        <div className="loading">Loading posts...</div>
      </div>
    );

  return (
    <div className="content-container">
      <div className="profile-header">
        <h1>u/{username}</h1>
        <p style={{ color: "#7c7c7c" }}>Posts: {stats.posts ?? 0}</p>
      </div>
      <div className="posts-container">
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts yet</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post ={post} showSubreddit={true} />
          ))
        )}
        {/* Simulate "Load More" functionality */}
        {false && (
          <button className="load-more" onClick={() => {}}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
