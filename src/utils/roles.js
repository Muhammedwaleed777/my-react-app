export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.role || ROLES.USER;
};

export const isAdmin = () => {
  return getUserRole() === ROLES.ADMIN;
};

export const isUser = () => {
  return getUserRole() === ROLES.USER;
};