export const debounce = <F extends (...args: never[]) => unknown>(
  func: F,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null;
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
