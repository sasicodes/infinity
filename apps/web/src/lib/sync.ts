import { getAuthToken } from "@dynamic-labs/sdk-react-core";
import { API_URL } from "./constants";
import type { FlowData, NodeContent } from "./idb";

export const syncFlowToDb = async (data: FlowData) => {
  const response = await fetch(`${API_URL}/sync/flow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify({ flow: JSON.stringify(data) })
  });
  const result = await response.json();
  return result.success;
};

export const syncNodeContentToDb = async (
  data: NodeContent,
  flowId: string
) => {
  const response = await fetch(`${API_URL}/sync/node`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify({ node: JSON.stringify(data), flowId })
  });
  const result = await response.json();
  return result.success;
};

export const syncDeleteNodeContentToDb = async (id: string, flowId: string) => {
  const response = await fetch(`${API_URL}/sync/node`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify({ id, flowId })
  });
  const result = await response.json();
  return result.success;
};

export const syncFlowAndNodeContentFromDb = async (flowId: string) => {
  const response = await fetch(`${API_URL}/sync/all?flowId=${flowId}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`
    }
  });
  const result = await response.json();
  return { flow: result.flow, nodes: result.nodes };
};

export const createPost = async (
  ipId: string,
  tokenId: string,
  licenseTermsId: string,
  nodeId: string,
  html: string
) => {
  const response = await fetch(`${API_URL}/post/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify({ ipId, tokenId, licenseTermsId, nodeId, html })
  });
  const result = await response.json();
  return result.success;
};

export const updatePurchase = async (
  postId: string,
  tokenId: string,
  txHash: string
) => {
  const response = await fetch(`${API_URL}/post/update-purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify({ postId, tokenId, txHash })
  });
  const result = await response.json();
  return result.success;
};

export const getAllPosts = async (page = 1, pageSize = 10) => {
  const res = await fetch(
    `${API_URL}/posts?page=${page}&pageSize=${pageSize}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`
      }
    }
  );
  const data = await res.json();

  if (!data.success) {
    throw new Error("Failed to fetch posts");
  }

  return data;
};

export const getMyPosts = async (page = 1, pageSize = 10) => {
  const res = await fetch(
    `${API_URL}/posts/me?page=${page}&pageSize=${pageSize}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`
      }
    }
  );
  const data = await res.json();

  if (!data.success) {
    throw new Error("Failed to fetch posts");
  }

  return data;
};

export const getPostsByCategory = async (
  category: string,
  page = 1,
  pageSize = 10
) => {
  const res = await fetch(
    `${API_URL}/posts/category?category=${category}&page=${page}&pageSize=${pageSize}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`
      }
    }
  );
  const data = await res.json();

  if (!data.success) {
    throw new Error("Failed to fetch posts");
  }

  return data;
};
