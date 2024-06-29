import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import '@/styles/globals.css';
import theme from '@/styles/theme';

function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default App;