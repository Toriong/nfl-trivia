import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button } from '../../../../globalComponents/buttons';
import { faX } from "@fortawesome/free-solid-svg-icons";

function GoBackBtn({
    handleOnPress,
    zIndex,
    icon = <FontAwesomeIcon icon={faX} size={24} color='white' />,
    style = { position: 'fixed', top: 10, left: 10 }
}) {
    return (
        <Button
            dynamicStyles={style}
            zIndex={zIndex}
            handleOnPress={handleOnPress}
        >
            {icon}
        </Button>
    );
}

export default GoBackBtn;
