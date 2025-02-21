import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/SubmitPage.css";
import { FaImage } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const SubmitPage = () => {
  const { subredditName } = useParams();
  const navigate = useNavigate();

  // Mocked subreddit data
  const subreddit = {
    _id: "12345",
    name: subredditName || "general",
  };

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mocked function to simulate post creation
  const createPost = (postData: any) => {
    console.log("Post created:", postData);
    // Simulate successful post creation
    navigate(`/r/${subredditName}`);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subreddit) {
      alert("Please enter a title and select a subreddit");
      return;
    }

    try {
      setIsSubmitting(true);
      let imageUrl = undefined;

      // Simulate image upload (if image is selected)
      if (selectedImage) {
        // Mock image upload process
        imageUrl = "mock_storage_url"; // In a real app, you would get a URL after uploading the image
      }

      // Create the post with mocked data
      createPost({
        subject: title.trim(),
        body: body.trim(),
        subreddit: subreddit._id,
        storageId: imageUrl,
      });
    } catch (error) {
      console.log(error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="content-container">
      <div className="submit-container">
        <h1>Create a post in r/{subredditName}</h1>
        <form className="submit-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="submit-title"
            maxLength={100}
          />
          <div className="media-input-container">
            <label className="image-upload-label">
              <FaImage className="image-icon" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: "none" }}
              />
            </label>
            {imagePreview && (
              <div className="image-preview-container">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="image-preview"
                />
                <button
                  type="button"
                  className="remove-image-button"
                  onClick={handleRemoveImage}
                >
                  <IoMdClose />
                </button>
              </div>
            )}
          </div>
          <textarea
            placeholder="Text (optional)"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="submit-body"
          />
          <div className="submit-actions">
            <button
              type="button"
              onClick={() => navigate(`/r/${subredditName}`)}
              className="back-button"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting || !title.trim()}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitPage;
