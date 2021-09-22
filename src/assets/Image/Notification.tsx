import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

interface Icon {
    color?: string,
    width?: number,
    height?: number
}

const Notification = ({ color = "#818181", width = 26, height = 26 }) => {
    return (
        <>
            <Svg id="icon_social_notifications_none_24px" data-name="icon/social/notifications_none_24px" width={width} height={height} viewBox="0 0 30 30">
                <Rect id="Boundary" width="24" height="24" fill="none" />
                <Path id="_Color" data-name=" ↳Color" d="M11,25.5a2.689,2.689,0,0,1-2.75-2.616h5.5A2.689,2.689,0,0,1,11,25.5Zm11-3.924H0V20.269l2.75-2.615V11.115A8.942,8.942,0,0,1,4.369,5.806,7.623,7.623,0,0,1,8.937,2.85V1.962a2.065,2.065,0,0,1,4.126,0V2.85a7.613,7.613,0,0,1,4.573,2.96,8.95,8.95,0,0,1,1.614,5.3v6.539L22,20.269v1.306ZM11,5.23A5.226,5.226,0,0,0,6.966,6.957,6.219,6.219,0,0,0,5.5,11.115v7.846h11V11.115a6.22,6.22,0,0,0-1.466-4.158A5.225,5.225,0,0,0,11,5.23Z" transform="translate(4 2)" fill={color} />
            </Svg>


        </>
    )

}
export default Notification;