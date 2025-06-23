import { getAuthToken } from "@dynamic-labs/sdk-react-core";
import { API_URL } from "./constants";

export const uploadToR2 = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const data = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    const responseData = await data.json();

    return responseData.url;
  } catch (error) {
    console.error("[Error Media Upload]", error);
    return "";
  }
};

export const uploadJsonToR2 = async (json: string): Promise<string> => {
  try {
    const data = await fetch(`${API_URL}/upload-json`, {
      method: "POST",
      body: json,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    const responseData = await data.json();

    return responseData.url;
  } catch (error) {
    console.error("[Error JSON Upload]", error);
    return "";
  }
};
