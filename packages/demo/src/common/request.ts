const data2StrParams = (data: Record<string, any>) => {
  return (
    "?" +
    Object.keys(data)
      .map((key) => {
        return `${key}=${data[key]}`;
      })
      .join("&")
  );
};
export const request = ({
  url = "",
  method = "get",
  data = {},
  headers = {},
}) => {
  const reqMethod = method.toLowerCase();
  const api = `${url}${reqMethod === "get" ? data2StrParams(data) : ""}`;
  const body = ["get", "head"].includes(reqMethod)
    ? undefined
    : JSON.stringify(data);
  return fetch(api, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    mode: "cors",
    body,
  })
    .then(function (res) {
      if (res.status === 200 || res.status === 201) {
        return res.json();
      } else {
        return Promise.reject(res.json());
      }
    })
    .finally(() => {
      // 添加统计
    });
};
