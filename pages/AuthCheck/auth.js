export const isAuthenticated = () => {
  return !!(localStorage.getItem('supportTicketLoginUserUserPosition') === 'admin');
  // return !!localStorage.getItem('supportTicketLoginUserUserPosition');
};
