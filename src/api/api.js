const host = "http://192.168.1.5:3030/";

async function serviceHandler(method, url, data) {
  let options = {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (data !== undefined) {
    options.body = JSON.stringify(data);
  }

  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user) {
    options.headers["X-Authorization"] = user.accessToken;
  }

  try {
    const response = await fetch(host + url, options);
    
    if (response.ok !== true) {
      const error = await response.json();
      throw new Error(error.message);
    }

    if (response.status == 204) {
      return response;
    } else {
      return response.json();
    }
  } catch (error) {
    window.alert(error);
    throw error;
  }
}

export const get = serviceHandler.bind(null, "GET");
export const post = serviceHandler.bind(null, "POST");
export const put = serviceHandler.bind(null, "PUT");
export const del = serviceHandler.bind(null, "DELETE");
