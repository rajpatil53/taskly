import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import { QueryClient, QueryClientProvider } from 'react-query'


import Routes from './Routes';

const queryClient = new QueryClient()

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#a6d4fa',
            main: '#90caf9',
            dark: '#648dae',
            contrastText: '#DEDEDE'
        },
        secondary: {
            light: '#f6a5c0',
            main: '#f48fb1',
            dark: '#aa647b',
            contrastText: '#DEDEDE'
        },
    },
});



function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={darkTheme}>
                <Container maxWidth="lg">
                    <Router>
                        <Routes />
                    </Router>
                </Container>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
