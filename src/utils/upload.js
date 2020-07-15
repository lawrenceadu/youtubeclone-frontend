import { toast } from "react-toastify";

import axios from "axios";

export default async (resourceType, file) => {
  const formData = new FormData();
  formData.append("upload_preset", "youtubeclone");
  formData.append("file", file);

  let toastId = null;
  const config = {
    onUploadProgress: (p) => {
      const progress = p.loaded / p.total;
      if (toastId === null) {
        toastId = toast("Upload in Progress", {
          progress,
        });
      } else {
        toast.update(toastId, {
          progress,
        });
      }
    },
  };

  const { data } = await axios.post(
    `${process.env.REACT_APP_CLOUDINARY_ENDPOINT}/${resourceType}/upload`,
    formData,
    config
  );

  toast.dismiss(toastId);

  return data.secure_url;
};
