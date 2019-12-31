import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const isAuthenticated = () => {
  return !!cookies.get('inspector_token');
};
