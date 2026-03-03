function withTimeout(promise, ms, controller) {
  const timeout = new Promise((_, reject) => {
    const id = setTimeout(() => {
      controller.abort(); // cancel the request
      reject(new Error("Request timed out"));
    }, ms);
  });

  return Promise.race([promise, timeout]);
}