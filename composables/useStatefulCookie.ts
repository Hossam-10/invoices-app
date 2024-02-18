export const useStatefulCookie = <T = any>(name: string, defaultValue?: T) => {
  const cookie = useCookie(name, { default: (): Maybe<T> => defaultValue });
  const state = useState(name, () => cookie.value);

  watch(
    state,
    () => {
      cookie.value = state.value;
    },
    { deep: true }
  );

  return state;
};
