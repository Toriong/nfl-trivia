import { Image } from "react-native";
import SeahawksLogo from '../assets/seahawks-icon.png';

const PATHS = [
    {
        name: 'Seahawks',
        logo: SeahawksLogo
    }
]

function Logo({ teamName, dimensions = { width: 100, height: 100 } }) {
    if (!teamName) {
        console.error("No 'teamName' prop was provided.")
        return null;
    };

    const targetTeamObj = PATHS.find(({ name }) => name === teamName);

    if (!targetTeamObj) {
        console.error("Invalid 'teamName' prop was passed.")
        return null;
    }

    return <Image
        style={{
            width: dimensions.width,
            height: dimensions.height
        }}
        source={targetTeamObj.logo}
    />

};

export default Logo;
