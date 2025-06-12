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

export const syncNodeContentToDb = async (data: NodeContent) => {
  const response = await fetch(`${API_URL}/sync/node`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify({ node: JSON.stringify(data) })
  });
  const result = await response.json();
  return result.success;
};

export const syncDeleteNodeContentToDb = async (id: string) => {
  const response = await fetch(`${API_URL}/sync/node`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify({ id })
  });
  const result = await response.json();
  return result.success;
};
