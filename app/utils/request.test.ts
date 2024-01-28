import { sendRequest, IResponse, getSchema } from "./request";

const mockData: IResponse = {
  countries: { country: [{ name: "Andorra" }] },
};
const mockResponse = {
  json: jest.fn().mockResolvedValue({ data: mockData }),
};
global.fetch = jest.fn().mockResolvedValue(mockResponse);

describe("sendRequest", () => {
  it("should send a request", async () => {
    const query = "query";
    const url = "url";

    await sendRequest(query, url);

    expect(fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: {},
      }),
    });
  });
  it("should send a request with headers and variables", async () => {
    const query = "query";
    const url = "url";
    const headers = ' {"Authorization": "Bearer My_Token" }';
    const variables = '{"name": "Morty"}';

    await sendRequest(query, url, variables, headers);

    expect(fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer My_Token",
      },
      body: JSON.stringify({
        query: query,
        variables: {
          name: "Morty",
        },
      }),
    });
  });
});

describe("getSchema func", () => {
  it("should call fetch", () => {
    getSchema("endpoint");
    expect(fetch).toHaveBeenCalled();
  });
});
