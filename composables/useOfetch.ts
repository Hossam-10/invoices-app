export const useOfetch = <T>(requestData: ApiFunctionData) => {
  return $fetch<T>(requestData.url, {
    method: requestData.method,
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    baseURL: "http://localhost:3001/",
    body: requestData.data || {},
    params: requestData.params || {},
  });
};