import React from 'react';
import { View } from 'react-native';
import NextQuestion from '../buttons/NextQuestion';
import { CENTER_DEFAULT, SEAHAWKS_COLORS } from '../../../../styles/globalStylesVars';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Button } from '../../../../globalComponents/buttons';
import { PTxt } from '../../../../globalComponents/customTxts';


function NavigationSection({
    isTriviaModeOn,
    handleNextQuestionBtnPress,
    wasSubmitBtnPressed
}) {
    return (
        <View
            style={{
                width: "100%",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: "5%"
            }}
        >
            {isTriviaModeOn
                ?
                <NextQuestion
                    wasSubmitBtnPressed={wasSubmitBtnPressed}
                    handleNextQuestionBtnPress={handleNextQuestionBtnPress}
                />
                :
                <>
                    <View style={{
                        width: "100%",
                        ...CENTER_DEFAULT.center
                    }}>
                        <Button dynamicStyles={{ backgroundColor: SEAHAWKS_COLORS.home['2nd'], ...CENTER_DEFAULT.center }}>
                            <PTxt style={{ textAlign: 'center' }}>
                                <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    color="black"
                                    size={24}
                                />
                            </PTxt>
                        </Button>
                        <Button dynamicStyles={{ backgroundColor: SEAHAWKS_COLORS.home['2nd'], ...CENTER_DEFAULT.center }}>
                            <PTxt style={{ textAlign: 'center' }}>
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    color="black"
                                    size={24}
                                />
                            </PTxt>
                        </Button>
                    </View>
                    <View style={{
                        width: "100%",
                        ...CENTER_DEFAULT.center
                    }}>
                        <Button dynamicStyles={{ backgroundColor: SEAHAWKS_COLORS.home['1st'] }}>
                            <PTxt>
                                Results
                            </PTxt>
                        </Button>
                    </View>
                </>
            }
        </View>
    );
}

export default NavigationSection;
