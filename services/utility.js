export function withTimeout(promise, ms, controller) {
  let timeoutId;

  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      if (controller) controller.abort();
      reject(new Error("Request timed out"));
    }, ms);
  });

  return Promise.race([promise, timeout])
    .finally(() => {
      if (timeoutId) clearTimeout(timeoutId);
    });
}