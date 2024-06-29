import { extendTheme } from '@chakra-ui/react';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

const theme = extendTheme({
    fonts: {
        body: 'Inter, sans-serif',
        heading: 'Inter, sans-serif',
    },
});

export default theme;