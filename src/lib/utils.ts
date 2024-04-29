export const getCurrentUser = () => {
  const currentUser = localStorage.getItem("user");
  if (currentUser) {
    return JSON.parse(currentUser);
  } else {
    return null;
  }
};

export const setUser = (type: string, user: any) => {
  localStorage.setItem(type, JSON.stringify(user));
};

export const removeItem = (type: string) => {
  localStorage.removeItem(type);
};
