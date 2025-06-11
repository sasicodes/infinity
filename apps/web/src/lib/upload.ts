import { API_URL } from "./constants";

export const uploadToR2 = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const data = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData
    });
    const responseData = await data.json();

    return responseData.url;
  } catch (error) {
    console.error("[Error Media Upload]", error);
    return "";
  }
};
