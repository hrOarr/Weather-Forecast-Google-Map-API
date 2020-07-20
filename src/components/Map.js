import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const API_KEY_GOOGLE = "*****************";

export default function Map(props){

	  let googleMapURL = "https://maps.googleapis.com/maps/api/js?key="+API_KEY_GOOGLE+"&v=3.exp&libraries=geometry,drawing,places";
	  const MyMap = withScriptjs(withGoogleMap(prop =>
       <GoogleMap
          defaultZoom={7}
          onClick={prop.onMapClick}
          defaultCenter={{lat: props.details.latitude, lng: props.details.longitude}}
          center={{lat: props.details.latitude, lng: props.details.longitude}}
       >
       <Marker
         position={{lat: props.details.latitude, lng: props.details.longitude}}
       />
       </GoogleMap>
       ));
	  return (
	  	<MyMap
             googleMapURL={googleMapURL}
             loadingElement={ <div style={{ height: `100%` }} /> }
             containerElement={ <div style={{ height: `97vh` }} /> }
             mapElement={ <div style={{ height: `100%` }} /> }
             latitude={props.details.latitude}
             longitude={props.details.longitude}
             onMapClick={props.details.handleMapClick}
          />
	  );
};