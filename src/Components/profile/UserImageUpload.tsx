import React, { useState } from "react";
import { createImage } from "../../api/userImage.api";
import { User } from "../../routes/Profile";
import { updateUser } from "../../api/user.api";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UserImageUpload = ({
  userInfo,
  setPreview,
}: {
  userInfo: User;
  setPreview;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [preview, setPreview] = useState<string | null>(null);

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
      //   setUser({ ...userInfo, imageUrl: res });
      await updateUser(userInfo._id, { ...userInfo, imageUrl: res });
      console.log("successfully created image : ", res);
    } catch (e) {
      console.error("Fail to upload user's iamge", e);
    }
  };

  return (
    <form onSubmit={handleUpload} style={{ display: "flex" }}>
      <Button
        component='label'
        role={undefined}
        tabIndex={-1}
        sx={{ padding: "0 5px 0 5px" }}
      >
        Upload photo
        <VisuallyHiddenInput
          type='file'
          onChange={handleFileChange}
          accept='image/*'
        />
      </Button>
      {/* <input type='file' onChange={handleFileChange} accept='image/*' /> */}
      <Button
        type='submit'
        startIcon={<CloudUploadIcon />}
        sx={{ padding: "0 5px 0 5px", marginLeft: "10px" }}
      >
        Save
      </Button>
    </form>
  );
};

export default UserImageUpload;
