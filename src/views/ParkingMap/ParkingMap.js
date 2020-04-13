import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
const Key = 'AIzaSyBGMhq5hvSgEBS3o-_UqCQp-Y5i9F9MMeo';
 
class ParkingMap extends Component {
  static defaultProps = {
    center: {
      lat: 16.1,
      lng: 108.25
    },
    zoom: 11
  };
  
  render() {
    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '90vh', width: '100%' }}>
        <GoogleMapReact
          //bootstrapURLKeys={{ key: Key}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
        >
          <AnyReactComponent
            lat={16.1}
            lng={108.25}
            text="Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default ParkingMap;