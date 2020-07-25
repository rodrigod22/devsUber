import React, {useState, useEffect} from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import Geocoder from 'react-native-geocoding';
import {MapsAPI} from '../config';


const ModalArea =styled.View`
flex:1;
backgroundColor: #FFF;

`;

const ModalHeader = styled.View`
flexDirection: row;
padding: 20px;
`;

const ModalClose = styled.TouchableHighlight`
width: 40px;
height: 40px;
justifyContent: center;
alignItems: center;
backgroundColor: #eee;
borderRadius: 20px;

`;

const ModalCloseText = styled.Text``;

const ModalInput =styled.TextInput`
marginLeft: 20px;
fontSize: 18px;
color: #000;
`;

const ModalResults = styled.View``;

const ModalResult = styled.TouchableHighlight`
padding:15px;

`;

const ModalResultText = styled.Text`
color: #000;
fontSize: 16px;
`;

let timer;

export default (props) => {

    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(()=>{     
        Geocoder.init(MapsAPI, {language:'pt-br'});     
    }, []);

    useEffect(() => {
        if(searchText){
            //fazer a pesquisa
            if(timer){
                clearTimeout(timer);
            }
            timer = setTimeout(async ()=> {
                console.log("Fazendo Pesquisa")
                const geo = await Geocoder.from(searchText);
                console.log("Pesquisa: "+ geo.results.length);
                    if(geo.results.length > 0){
                        let tmpResults = [];    
                        for(let i in geo.results){
                           
                            tmpResults.push({
                                address:geo.results[i].formatted_address,
                                latitude:geo.results[i].geometry.location.lat,
                                longitude:geo.results[i].geometry.location.lng
                            });
                        }
                        
                        setResults(tmpResults);        
                    }else{
                        setResults([]);
                    }
            }, 1000);
        }
    }, [searchText]);


   const handleCloseAction = () => {
       props.visibleAction(false);
   }

    return (

        <Modal
            animationType='slide'
            transparent={false}
            visible={props.visible}
        >
            <ModalArea>
                <ModalHeader>
                    <ModalClose onPress={handleCloseAction}>
                        <ModalCloseText>X</ModalCloseText>
                    </ModalClose>
                    <ModalInput value={searchText} autoFocus={true} placeholder={props.title} 
                    onChangeText={t=>setSearchText(t)} placeholderTextColor='#999'/>
                </ModalHeader>

                <ModalResults>
                <ModalResult>
                            <ModalResultText>2</ModalResultText>
                        </ModalResult>                       
                    { results.map( (i, k) => {                       
                        <ModalResult key={k}>
                            <ModalResultText>{k}</ModalResultText>
                        </ModalResult>       
                    })}        
                </ModalResults>
            </ModalArea>
        </Modal>
    );
}