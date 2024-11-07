export const getWithCache = async (url: string, tags: string[]) => {
  const response = await fetch(url, {
    cache: "force-cache",
    next: {
      tags,
    },
  });
  const result = (await response.json()) || {};

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText} : ${result?.message} for url ${url}`);
  }
  return result;
};

export const getWithoutCache = async (url: string) => {
  const response = await fetch(url, { cache: "no-cache" });
  const result = (await response.json()) || {};

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText} : ${result?.message} for url ${url}`);
  }
  return result;
};

export const putNoCache = async (url: string, body: any) => {
  console.log("url in dbutils in putNoCache ", url);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify(body),
  });
  console.log("result in dbutils before json ", response);
  const result = (await response.json()) || {};

  if (!response.ok) {
    const message = result.message ? result.message : result.fieldErrors[0].message;
    console.log(message);
    throw new Error(message);
  }

  return result;
};
