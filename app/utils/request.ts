"use server";

import { FullSchema } from "../types";
import { query } from "./constants";

export interface IResponse {
  [key: string]: string | IResponse[] | IResponse;
}

export const sendRequest = async (
  query: string,
  url: string,
  variables?: string,
  headers?: string
) => {
  try {
    const res = fetch(url, {
      method: "POST",
      headers: headers
        ? JSON.parse(headers)
        : {
            "Content-type": "application/json",
          },
      body: JSON.stringify({
        query: query,
        variables: variables ? JSON.parse(variables) : {},
      }),
    }).then((result) => {
      return { data: result.json(), status: result.status };
    });
    return res;
  } catch {
    throw new Error("Failed to fetch");
  }
};

export async function getSchema(
  endpoint: string,
  headers?: string
): Promise<FullSchema> {
  try {
    const res = fetch(endpoint, {
      method: "POST",
      headers: headers
        ? JSON.parse(headers)
        : {
            "Content-type": "application/json",
          },
      body: JSON.stringify({ query }),
    })
      .then((response) => {
        if (response.status === 401) throw new Error("Unauthorized");
        return response.json();
      })
      .then((data) => data.data.__schema);
    return res;
  } catch (e) {
    const err = e as Error;
    throw new Error(err.message);
  }
}
