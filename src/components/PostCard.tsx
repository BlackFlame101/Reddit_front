import { FaRegCommentAlt, FaTrash } from "react-icons/fa";
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/PostCard.css";

interface Post {
  _id: string;
  subject: string;
  body: string;
  _creationTime: number;
  author?: {
    username: string;
  };
  subreddit?: {
    name: string;
  };
  imageUrl?: string;
}

interface PostCardProps {
  post: Post;
  showSubreddit?: boolean;
  expandedView?: boolean;
}

const VoteButtons = () => {
  return (
    <div className="post-votes">
      <button className="vote-button">
        <TbArrowBigUp size={24} />
      </button>
      <span className="vote-count total-count">0</span>
      <button className="vote-button">
        <TbArrowBigDown size={24} />
      </button>
    </div>
  );
};

const PostHeader = ({
  author,
  subreddit,
  showSubreddit,
  creationTime,
}: {
  author?: { username: string };
  subreddit?: { name: string };
  showSubreddit: boolean;
  creationTime: number;
}) => {
  return (
    <div className="post-header">
      {author ? (
        <Link to={`/u/${author.username}`}>u/{author.username}</Link>
      ) : (
        <span className="post-author">u/deleted</span>
      )}
      {showSubreddit && subreddit && (
        <>
          <span className="post-dot">-</span>
          <Link to={`/r/${subreddit.name}`} className="post-subreddit">
            r/{subreddit.name}
          </Link>
        </>
      )}
      <span className="post-dot">-</span>
      <span className="post-timestamp">
        {new Date(creationTime).toLocaleString()}
      </span>
    </div>
  );
};

const PostContent = ({
  subject,
  body,
  image,
  expandedView,
}: {
  subject: string;
  body?: string;
  image?: string;
  expandedView: boolean;
}) => {
  return (
    <>
      {expandedView ? (
        <>
          <h1 className="post-title">{subject}</h1>
          {image && (
            <div className="post-image-container">
              <img src={image} alt="Post content" className="post-image" />
            </div>
          )}
          {body && <p className="post-body">{body}</p>}
        </>
      ) : (
        <div className="preview-post">
          <h2 className="post-title">{subject}</h2>
          {body && <p className="post-body">{body}</p>}
          {image && (
            <div className="post-image-container small-img">
              <img src={image} alt="Post content" className="post-image" />
            </div>
          )}
        </div>
      )}
    </>
  );
};

const PostCard = ({
  post,
  showSubreddit = false,
  expandedView = false,
}: PostCardProps) => {
  const [showComments, setShowComments] = useState(expandedView);
  const navigate = useNavigate();

  const handleComment = () => {
    if (!expandedView) {
      navigate(`/post/${post._id}`);
    } else {
      setShowComments(!showComments);
    }
  };

  return (
    <div className={`post-card ${expandedView ? "expanded" : ""}`}>
      <VoteButtons />
      <div className="post-content">
        <PostHeader
          author={post.author}
          subreddit={post.subreddit}
          showSubreddit={showSubreddit}
          creationTime={post._creationTime}
        />
        <PostContent
          subject={post.subject}
          body={post.body}
          image={post.imageUrl}
          expandedView={expandedView}
        />
        <div className="post-actions">
          <button className="action-button" onClick={handleComment}>
            <FaRegCommentAlt />
            <span>0 Comments</span>
          </button>
          <button className="action-button delete-button">
            <FaTrash />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
