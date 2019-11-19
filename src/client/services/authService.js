import Cookies from 'universal-cookie';

export const isAuthenticated = () => {
    const cookies = new Cookies();
    if(cookies.get('inspector_token')) {
        return true;
    } return false
}