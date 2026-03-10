async function fetchWithAutoRetry(promise, retry) {
  const controller = new AbortController();
  try {
    return await promise(controller.signal);
  } catch (e) {
    if ((e instanceof DOMException && e.name === "AbortError") || retry === 0) {
      throw e;
    }
    return fetchWithAutoRetry(promise, retry - 1);
  }
}
