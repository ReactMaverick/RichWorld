import React from "react";
import Svg, { Path, Rect, G } from "react-native-svg";

interface Icon {
    color?: string,
    width?: number,
    height?: number
}

const WishIcon = ({ color = "#818181", width = 26, height = 26 }) => {
    return (
        <>
            <Svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 30 30">
                <G id="invisible_box" data-name="invisible box">
                    <Rect id="Rectangle_10" data-name="Rectangle 10" width="30" height="30" fill="none" />
                </G>
                <G id="icons_Q2" data-name="icons Q2" transform="translate(1.5 3)">
                    <Path id="Path_6" data-name="Path 6" d="M21.636,6.46A4.715,4.715,0,0,1,25.073,7.9a4.571,4.571,0,0,1,1.473,3.36c0,1.26-.8,2.7-2.393,4.44l-8.652,9-8.652-9c-1.6-1.74-2.393-3.18-2.393-4.44A4.571,4.571,0,0,1,5.927,7.9,4.715,4.715,0,0,1,9.364,6.46a5.36,5.36,0,0,1,3.989,2.7l1.6,2.64a.684.684,0,0,0,1.1,0l1.6-2.64a5.36,5.36,0,0,1,3.989-2.7m0-2.46C19.243,4,16.727,5.86,15.5,7.9,14.273,5.86,11.757,4,9.364,4A7.447,7.447,0,0,0,4.148,6.16,7.059,7.059,0,0,0,2,11.259c0,2.46,1.657,4.56,3.068,6.119l10,10.439a.624.624,0,0,0,.859,0l10-10.439C27.343,15.819,29,13.719,29,11.259A7.342,7.342,0,0,0,21.636,4Z" transform="translate(-2 -4)" fill={color} />
                </G>
            </Svg>
        </>
    )

}
export default WishIcon;