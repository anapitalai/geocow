import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Row, Nav,Col,Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message'
import Loader from '../components/Loader'
import ReactMapGL, { Marker, Popup, Source, Layer,LayerProps,NavigationControl,FullscreenControl,FillLayer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { dataLayer } from '../map-style'
import axios from 'axios';
import SideBar from '../components/map-components/SideBar';
import { listStores } from '../actions/storeActions';
import {listMultiCoral} from '../actions/coralMultiActions';
import ControlPanel from '../components/map-components/ControlPanel';
import {listTemperatures} from '../actions/temperatureActions';
import CoralSearchBox from '../components/CoralSearchBox'
import {Route} from 'react-router-dom'
import LegendPanel from '../components/map-components/LegendPanel';

import CoralPanel from '../components/map-components/CoralPanel';
import {lowLayer9,moderateLayer9,severeLayer9,lowLayer10,moderateLayer10,severeLayer10,lowLayer11,moderateLayer11,severeLayer11,pointLayer} from '../components/map-components/MapStyle'



function MapScreen({ history, match }) {
	const keyword = match.params.keyword

	const [pointData, setPointData] = useState(null);

	
	const [ viewport, setViewport ] = useState({
		latitude: -6.635908,
		longitude: 147.864312,
		width: '100vw',
		 height: '100vh',
		zoom: 15,
		// pitch:180
	});
	
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const storeList = useSelector((state) => state.storeList);
	const { loading, error, stores, page, pages } = storeList;

	//coral stuff multipolygon
	const coralMultiList = useSelector((state) => state.coralMultiList);
	const { loadingCoral, errorCoral, corals, pageCoral, pagesCoral } = coralMultiList;

	const temperatureList = useSelector((state) => state.temperatureList);
	const { loadingTemperature, errorTemperature, temperatures, pageTemperature, pagesTemperature } = temperatureList;
     
	const userLogin = useSelector((state) => state.userLogin);
	const {userInfo} = userLogin


	useEffect(
		() => {
			dispatch(listMultiCoral(keyword));
	       console.log('corals',corals)
		},
		[ dispatch , keyword]
	);

		
	useEffect(
		() => {
			dispatch(listTemperatures());
	   
		},
		[ dispatch ]
	);


	useEffect(
		() => {
			dispatch(listStores());
			console.log('stores',stores)

		},
		[ dispatch ]
	);



	//onHover functionality
const [onHover,setonHover] =useState(null)
const [onCoralHover,setonCoralHover] = useState(null)

const cbleach = useMemo(()=>{return corals},[corals])

// const coral_markers = useMemo(() => corals.map(m => (
//     <Source key={m._id} type="geojson" data={m}>
    
//       {/* <Layer id={m._id} source='route' type='fill' paint={{'fill-color':'yellow'}} /> */}
// 	  	<Layer {...severeLayer} />
//     </Source>	
// 	)
//   ), [corals]);

  const [mapStyle, setMapStyle] = useState(null);

	return (
		<div className="map">
 
			{/* <LinkContainer to="/store">
				<Nav.Link>
					<i className="fas fa-upload" /> + STUDY AREA
				</Nav.Link>
			</LinkContainer> */}

			
			<LinkContainer to="/admin/multi">
				<Nav.Link>
					<i className="fas fa-upload" /> + BLEACHING DATA
				</Nav.Link>
			</LinkContainer>
			            <Route render={({ history }) => <CoralSearchBox history={history} />} />

			<ReactMapGL
			
				initialViewState={{ ...viewport }}
				mapboxAccessToken="pk.eyJ1IjoiYW5hcGl0YWxhaSIsImEiOiJjbDdlYzRjNjQwOXUxM3dwbGNxd3V5bDN3In0.QsuXMK_1u4kBZEht5QaO3w"
				style={{ width:1000, height: 1000 }}

				mapStyle="mapbox://styles/anapitalai/cl8dw9b8f000d14rtgqhu1exx"
			    onHover={onHover}
				onViewportChange={(viewport) => {
					setViewport(viewport);
				}}
			>
{/* 
				{loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :(<>{stores.map(s => (

					<Marker key={s.storeId} latitude={s.location.coordinates[1]} longitude={s.location.coordinates[0]}>
						<img onMouseEnter={()=>{
							setonHover(s)	}}
							onMouseLeave={()=>{
							setonHover(null)}} 
							className='marker' src="/a.png" />
					</Marker>
				 
				))}</>)} */}


{loadingTemperature ? (<Loader />) : error ? (<Message variant='danger'>{errorTemperature}</Message>) :(<>{temperatures.map(s => (

<Marker key={s._id} latitude={s.location.coordinates[1]} longitude={s.location.coordinates[0]}>
	<img onMouseEnter={()=>{
		setonHover(s)	}}
		onMouseLeave={()=>{
		setonHover(null)}} 
		className='marker' src="/t.jpeg" />
</Marker>

))}</>)}





				 {/* {corals.map(m=>(					 	
					 <Source id={m.name} type="geojson" data={m} >

					 <Layer {...severeLayer} />
					 <Layer {...moderateLayer} />
					 <Layer {...lowLayer} />

		          </Source> 


				 ))} */}



				<Source id="low11" type="geojson" data={cbleach[2]} >
                <Layer {...lowLayer11} />
                </Source> 
				<Source id="moderate11" type="geojson" data={cbleach[1]} > 
				<Layer {...moderateLayer11} /> 
				</Source> 
                 
				<Source id="severe11" type="geojson" data={cbleach[0]} >
				<Layer {...severeLayer11} />
				</Source> 

                {/* <Source id="low10" type="geojson" data={cbleach[5]} >
                <Layer {...lowLayer10} />
                </Source> 
				<Source id="moderate10" type="geojson" data={cbleach[4]} > 
				<Layer {...moderateLayer10} /> 
				</Source> 
				<Source id="severe10" type="geojson" data={cbleach[3]} >
				<Layer {...severeLayer10} />
				</Source>  
                


                <Source id="low9" type="geojson" data={cbleach[2]} >
                <Layer {...lowLayer9} />
                </Source> 
				<Source id="moderate9" type="geojson" data={cbleach[1]} > 
				<Layer {...moderateLayer9} /> 
				</Source> 
				<Source id="severe9" type="geojson" data={cbleach[0]} >
				<Layer {...severeLayer9} />
				</Source>
 */}




				 {pointData && (
          <Source type="geojson" data={pointData}>
            <Layer {...pointLayer} />
          </Source>

        )} 

<NavigationControl position="top-left" />
<FullscreenControl />
<LegendPanel />



        {onHover ? (
			                <Popup
                                  latitude={onHover.location.coordinates[1]}
                                  longitude={onHover.location.coordinates[0]}
                                  anchor="bottom" >
							<h5> {onHover.location_name} Temperature Data</h5>
							{/* <h5>{onHover.date}</h5> */}
							{/* <h4>{onHover.time}</h4> */}
							   <h5>{onHover.temp_depth_3m}M @3M</h5>
							   <h5>{onHover.temp_depth_5_5m}M @5.5M</h5>
							   <h5>{onHover.temp_depth_9m}M @9M</h5>
						   </Popup>

		) : null }

{onCoralHover ? (
			                <Popup
                                  latitude={onCoralHover.features.geometry.coordinates[1]}
                                  longitude={onCoralHover.features.geometry.coordinates[0]}
                                  anchor="bottom" >
							  <h6> {onCoralHover.name}</h6>
							
						   </Popup>

		) : null }
		
		
			</ReactMapGL>
		
			
			
		</div>
	);
}
export default MapScreen


