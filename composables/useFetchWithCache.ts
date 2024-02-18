export const useFetchWithCache = async <T = any>(
  requestData: ApiFunctionData
) => {
  const nuxtApp = useNuxtApp();
  const request = await useFetch<CachedRequest<T>>(requestData.url, {
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    baseURL: "http://localhost:3001/",
    key: requestData.key,
    transform: (data): CachedRequest<T> => {
      return {
        data: data as T,
        fetchedAt: new Date(),
      };
    },
    getCachedData: (key) => {
      const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      if (
        !cachedData ||
        Date.now() - new Date(cachedData.fetchedAt).getTime() > 300000
      ) {
        return;
      }
      return cachedData;
    },
  });
  return request;
};
