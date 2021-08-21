export const fetchUsers = (filter) => {
  return $.ajax({
    url: "/api/users",
    method: "GET",
    data: { filter },
  });
};

export const signup = (user) => {
  return $.ajax({
    url: "/api/users",
    method: "POST",
    data: { user },
  });
};

export const login = (user) => {
  return $.ajax({
    url: "/api/session",
    method: "POST",
    data: { user },
  });
};

export const logout = () => {
  return $.ajax({
    url: "/api/session",
    method: "DELETE",
  });
};

export const identifyUser = (inputValue) => {
  let method;
  if (inputValue.split("@").length !== 2) {
    method = "username";
  } else {
    method = "email";
  }

  return $.ajax({
    url: `/api/identify_${method}/${inputValue}`,
    method: "GET",
  });
};
