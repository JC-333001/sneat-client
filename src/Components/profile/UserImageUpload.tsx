import React, { useState } from "react";
import { createImage } from "../../api/userImage.api";
import { User } from "../../routes/Profile";

const UserImageUpload = ({ userInfo }: { userInfo: User }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);

    // Create a preview of the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // Handle form submit (e.g., uploading the file)
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select an image file first");
      return;
    }

    // Example: upload logic goes here
    // This can be an API call to upload the file to the server or S3 bucket
    console.log("File ready for upload:", selectedFile);
    try {
      let res = await createImage(selectedFile, userInfo._id);
      console.log("successfully created image: ", res);
    } catch (e) {
      console.error("Fail to upload user's iamge", e);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type='file' onChange={handleFileChange} accept='image/*' />
      {preview && (
        <div>
          <h4>Image Preview:</h4>
          <img src={preview} alt='Preview' style={{ width: "200px" }} />
        </div>
      )}
      <button type='submit'>Upload</button>
    </form>
  );
};

export default UserImageUpload;
