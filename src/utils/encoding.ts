export const encode = (data: string) => btoa(data).replace(/=+$/, "");

export const decode = (encoded: string) => atob(encoded);
