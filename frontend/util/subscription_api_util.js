export const subscribe = (subscription) => {
  return $.ajax({
    method: "POST",
    url: "/api/subscriptions",
    data: { subscription },
  });
};

export const unsubscribe = (subscribeeId) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/subscriptions/${subscribeeId}`,
  });
};
