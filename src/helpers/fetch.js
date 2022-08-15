//const base_url = "https://ozono-backend1.herokuapp.com";
//const base_url = "http://localhost:3333";
export const base_url = "https://ozono-backend-yvkpv.ondigitalocean.app";

export const fetchWithoutToken = (endpoint, body = {}, method = "GET") => {
  const url = `${base_url}${endpoint}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method !== "GET") {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options);
};

export const fetchWithToken = (endpoint, body = {}, method = "GET") => {
  const url = `${base_url}${endpoint}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("at")}`,
    },
  };

  if (method !== "GET") {
    options.body = JSON.stringify(body);
  }
  return fetch(url, options);
};

export const fetchWithTokenToUploadImage = (
  endpoint,
  body = {},
  method = "GET"
) => {
  const url = `${base_url}${endpoint}`;
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("at")}`,
    },
  };

  if (method !== "GET") {
    options.body = body;
  }

  return fetch(url, options);
};

export const fetchWithRefreshToken = (endpoint, body = {}, method = "GET") => {
  const url = `${base_url}${endpoint}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("rt")}`,
    },
  };

  if (method !== "GET") {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options);
};
