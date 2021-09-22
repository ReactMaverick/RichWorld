import React from "react";
import Svg, { Path, Rect, G } from "react-native-svg";

interface Icon {
    color?: string,
    width?: number,
    height?: number
}

const Account = ({ color = "#818181", width = 26, height = 26 }) => {
    return (
        <>
            <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 30 30">
                <G id="Layer_2" data-name="Layer 2" transform="translate(0.438 0.438)">
                    <G id="invisible_box" data-name="invisible box">
                        <Rect id="Rectangle_9" data-name="Rectangle 9" width="30" height="30" transform="translate(-0.438 -0.438)" fill="none" />
                    </G>
                    <G id="icons_Q2" data-name="icons Q2" transform="translate(1.213 1.213)">
                        <G id="Group_7" data-name="Group 7">
                            <Path id="Path_4" data-name="Path 4" d="M20.854,10a4.854,4.854,0,1,0,4.854,4.854A4.854,4.854,0,0,0,20.854,10Zm0,7.281a2.427,2.427,0,1,1,2.427-2.427A2.427,2.427,0,0,1,20.854,17.281Z" transform="translate(-7.506 -5.146)" fill="#818181" />
                            <Path id="Path_5" data-name="Path 5" d="M15.348,2A13.287,13.287,0,1,0,24.8,5.892,13.348,13.348,0,0,0,15.348,2Zm-7.4,21.357a16.018,16.018,0,0,1,7.4-1.942,16.018,16.018,0,0,1,7.4,1.942,10.86,10.86,0,0,1-14.8,0Zm16.442-1.881h0a18.627,18.627,0,0,0-9.04-2.488,18.627,18.627,0,0,0-9.04,2.488h0a10.739,10.739,0,0,1-1.881-6.128,10.921,10.921,0,1,1,21.842,0,10.739,10.739,0,0,1-1.881,6.128Z" transform="translate(-2 -2)" fill={color} />
                        </G>
                    </G>
                </G>
            </Svg>
        </>
    )

}
export default Account;