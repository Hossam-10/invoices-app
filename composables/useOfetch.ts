export const useOfetch = <T>(requestData: ApiFunctionData) => {
  const config = useRuntimeConfig()
  return $fetch<T>(requestData.url, {
    method: requestData.method,
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    baseURL: config.public.appBaseUrl as string,
    body: requestData.data || {},
    params: requestData.params || {},
  });
};
