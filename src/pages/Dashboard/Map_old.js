import {Component} from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component {

  state = {
    viewport: {
      width: '100%',
      height: 400,
      latitude: 20.9743,
      longitude: 105.6514,
      zoom: 8
    }
  };

  render() {
    return (
      <ReactMapGL
        mapboxApiAccessToken='pk.eyJ1IjoibWlrZWxocGRhdGtlIiwiYSI6ImNqdGloN3gzazBwdGc0NHAycXVtaWNlMDMifQ.Oi2bN4--FRp_Q7vs1Kz2Lg'
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}

export default Map;