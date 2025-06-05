export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);
  const response = await fetch("https://<API>/new", {
    method: "POST",
    body: formData
  });
  const data = await response.json();
  return data[0].gateway_url as string;
};
