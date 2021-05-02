import { Route, Redirect, RouteProps } from 'react-router-dom';
import useAuthStore, { tokenSelector } from '../stores/AuthStore';

const PrivateRoute = ({ children, ...rest }: RouteProps) => {
    let token = useAuthStore(tokenSelector);
    if (!token) {
        let authState = JSON.parse(window.localStorage.getItem('auth') || '{}');
        if (authState && Object.keys(authState).length) {
            token = authState.state.token;
        }
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute;
