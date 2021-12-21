import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs, } from "react-google-maps";

const Map = (props) => {

    return (
        <div>
            <GoogleMap
                {...props}
                defaultZoom={14}
                ref={props.refMap}
            >
            </GoogleMap>
        </div>
    );
}

export default withScriptjs(withGoogleMap(Map));
