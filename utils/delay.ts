export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function validateApiResponse(
  isSuccess: boolean,
  message: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (isSuccess) {
      resolve(`Berhasil: ${message}`);
    } else {
      reject(new Error(`Gagal: ${message}`));
    }
  });
}
