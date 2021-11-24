import { mode, Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
    global: (props) => ({
        body: {
            bg: mode('white', 'gray.800')(props)
        }
    })
};

export default styles;
