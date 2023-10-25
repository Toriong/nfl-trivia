import { StyleSheet } from 'react-native';
import { CENTER_DEFAULT, SEAHAWKS_COLORS } from '../../styles/globalStylesVars';

const styles = StyleSheet.create({
    mainView: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: SEAHAWKS_COLORS.home["1st"],
        height: "100%",
        width: "100%",
    },
    btnsContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        paddingTop: 13,
        gap: 15
    },
    btnStyles: {
        ...CENTER_DEFAULT.center,
        width: 230,
        height: 65,
        borderRadius: 15,
        backgroundColor: SEAHAWKS_COLORS.home["1st"]
    },
    headerContainer: {
        ...CENTER_DEFAULT.center,
        width: "100%"
    }
});

export default styles;
