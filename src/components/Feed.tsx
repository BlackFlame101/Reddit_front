import PostCard from "./PostCard";
import "../styles/Feed.css";

const mockPosts = [
  {
    _id: "1",
    subject: "Lorem ipsum dolor sit amet.",
    body: "Lorem ipsum dolor amet mustache knausgaard +1, blue bottle waistcoat tbh semiotics artisan synth stumptown gastropub cornhole celiac swag.",
    _creationTime: Date.now(),
    author: { username: "Develeopper" },
    subreddit: { name: "reactjs" },
    imageUrl: "/images/carbon.png",
  },
  {
    _id: "2",
    subject: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    _creationTime: Date.now() - 86400000,
    author: { username: "js_master" },
    subreddit: { name: "javascript" },
  },
];

export function Feed() {
  return (
    <div className="content-grid">
      <div className="feed-container">
        <h2 className="section-title">Trending Today</h2>
        <div className="posts-list">
          {mockPosts.map((post) => (
            <PostCard key={post._id} post={post} showSubreddit={true} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
