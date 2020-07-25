import React, {useRef, useState, useEffect} from 'react';
import { StatusBar, SafeAreaView, Text } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {MapsAPI} from '../../config';
import MapViewDirections from 'react-native-maps-directions';
import useDevsUberApi from '../../useDevsUberApi';
import AddressModal from '../../components/AddressModal';
import { 
    Container,
    IntineraryArea,
    IntineraryItem,
    IntineraryLabel,
    IntineraryPoint,
    IntineraryTitle,
    IntineraryValue,
    IntineraryPlaceholder,
    RequestDetails,
    RequestDetail,
    RequestTitle,
    RequestValue,
    RequestButtons,
    RequestButton,
    RequestButtonText
     
 } from './style';

const Page = () => {

    const map = useRef();
    const api = useDevsUberApi();


    const [mapLoc, setMapLoc] = useState({
        center:{
            latitude:-23.941862,
            longitude:-46.326518
        },
        zoom:16,
        pitch:0,
        altitude:0,
        heading:0
    });

    const [fromLoc, setFromLoc] = useState({});
    const [toLoc, setToLoc] = useState({});
    const [showDirections, setShowDirection] = useState(false);
    const [requestDistance, setRequestDistance] = useState(0);
    const [requestTime, setRequestTime] = useState(0);
    const [requestPrice, setRequestPrice] = useState(0);
    const [modalTitle, setModalTitle] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(()=>{     
        Geocoder.init(MapsAPI, {language:'pt-br'});
        getMyCurrentPosition();
    }, []);

    useEffect(()=>{      
        if(fromLoc.center && toLoc.center){
            setShowDirection(true);
        }
    }, [toLoc]);

    const getMyCurrentPosition = () => {
        Geolocation.getCurrentPosition(async (info)=>{
            const geo = await Geocoder.from(info.coords.latitude, info.coords.longitude);
          
            if(geo.results.length > 0 ){
                const loc = {
                    name:geo.results[0].formatted_address,
                    center:{
                        latitude:info.coords.latitude,
                        longitude:info.coords.longitude
                    },
                    zoom:16,
                    pitch:0,
                    altitude:0,
                    heading:0 
                };
                setMapLoc(loc);
                setFromLoc(loc);
            }
        }, (error) => {

        });

    }

    const handleFromClick = () => {
        setModalTitle('Escolha uma origem');
        setModalVisible(true);
    }

    const handleDirectionsReady = async (r) => {

        setRequestDistance(r.distance);
        setRequestTime(r.duration );

        const priceReq = await api.getRequestPrice(r.distance)
        if(!priceReq.error){
            setRequestPrice (priceReq.price);
        }

        map.current.fitToCoordinates(r.coordinates, {
            edgePadding:{
                left:50,
                right: 50,
                bottom:50,
                top:850
            }
        });
    }

    const handleToClick = async () => {
        const geo = await Geocoder.from('Sesc - Santos');
        if(geo.results.length > 0){
            const loc = {
                name:geo.results[0].formatted_address,
                center:{
                    latitude:geo.results[0].geometry.location.lat,
                    longitude:geo.results[0].geometry.location.lng
                },
                zoom:16,
                pitch:0,
                altitude:0,
                heading:0 
            };

            setToLoc(loc);
        }
    }

    const handleRequestCancel = () => {
        setToLoc({});
        setShowDirection(false);
        setRequestDistance(0);
        setRequestPrice(0);
        setRequestTime(0);
        setMapLoc(fromLoc);

    }

    const handleRequestGo = () => {
       
    }

    const handleMapChange = async () => {
        const cam = await map.current.getCamera();
        cam.altitude = 0;
        setMapLoc(cam);
    }

    return(
        <Container>            
            <StatusBar barStyle='dark-content' />
            <AddressModal
                title={modalTitle}
                visible={modalVisible}
                visibleAction={setModalVisible}

            
            />
            <MapView 
                ref={map}
                style={{flex:1}}
                provider="google"
                camera={mapLoc}
                onRegionChangeComplete={handleMapChange}
            >
                {fromLoc.center &&
                    <MapView.Marker pinColor='black' coordinate={fromLoc.center} />
                }
                 {toLoc.center &&
                    <MapView.Marker pinColor='black' coordinate={toLoc.center} />
                }
                {showDirections &&                  
                  <MapViewDirections 
                    origin={fromLoc.center}
                    destination={toLoc.center}
                    strokeWidth={5}
                    strokeColor="black"
                    apikey={MapsAPI}    
                    onReady={handleDirectionsReady}               
                   />
                }

            </MapView>
            <IntineraryArea>
                <IntineraryItem onPress={handleFromClick} underlayColor='#EEE'>
                    <>
                        <IntineraryLabel>
                            <IntineraryPoint color='#0000FF'/>
                            <IntineraryTitle>Origem</IntineraryTitle>
                        </IntineraryLabel>
                        {fromLoc.name &&
                            <IntineraryValue>{fromLoc.name}</IntineraryValue>
                        }
                        {!fromLoc.name &&
                            <IntineraryPlaceholder>Escolha um local de origem</IntineraryPlaceholder>
                        }
                    </>
                </IntineraryItem>
                <IntineraryItem onPress={handleToClick} underlayColor='#EEE'>
                    <>
                        <IntineraryLabel>
                            <IntineraryPoint color='#00FF00' />
                            <IntineraryTitle>Destino</IntineraryTitle>
                        </IntineraryLabel>
                        {toLoc.name &&
                            <IntineraryValue>{toLoc.name}</IntineraryValue>
                        }
                        {!toLoc.name &&
                            <IntineraryPlaceholder>Escolha um local de destino</IntineraryPlaceholder>
                        }
                    </>
                </IntineraryItem>

                {fromLoc.center && toLoc.center &&
                <IntineraryItem>
                <>
                        <RequestDetails>
                           
                            <RequestDetail>
                                <RequestTitle>Distância</RequestTitle>
                                <RequestValue>
                                    {requestDistance > 0 ? `${requestDistance.toFixed(1)}km` : '---' }
                                </RequestValue>
                            </RequestDetail>
                            <RequestDetail>
                                <RequestTitle>Tempo</RequestTitle>
                                <RequestValue>
                                     {requestTime > 0 ? `${requestTime.toFixed(0)}mins` : '---' }
                                </RequestValue>
                            </RequestDetail>
                            <RequestDetail>
                                <RequestTitle>Preço</RequestTitle>
                                <RequestValue>
                                     {requestPrice > 0 ? `R$ ${requestPrice.toFixed(2)}` : '---' }
                                     </RequestValue>
                            </RequestDetail>
                            </RequestDetails>
                            <RequestButtons>                          
                                <RequestButton color='#00FF00' onPress={handleRequestGo}>
                                    <RequestButtonText>Solicitar motorista</RequestButtonText>
                                </RequestButton>
                                <RequestButton color='#FF0000' onPress={handleRequestCancel}>
                                    <RequestButtonText>Cancelar</RequestButtonText>
                                </RequestButton>                         
                             </RequestButtons>            
                            </>        
                             
                </IntineraryItem>
                }
            </IntineraryArea>
        </Container>
    )
}

export default Page;