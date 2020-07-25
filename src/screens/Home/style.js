import styled from 'styled-components/native';

export const Container = styled.View`
flex:1;
backgroundColor: #ff0000;
`;

export const IntineraryArea = styled.View`
position: absolute;
left:10px;
right:10px;
top:50px;
backgroundColor: #FFF;
borderRadius: 5px;
boxShadow: 0px 0px 4px #999;
borderColor: #EEE;
borderWidth: 1px;
`;

export const IntineraryItem = styled.TouchableHighlight`
padding: 15px 20px;
borderBottomColor: #EEE;
borderBottomWidth: 1px;
`;

export const IntineraryLabel = styled.View`
flexDirection: row;
alignItems: center;
marginBottom: 10px;
`;

export const IntineraryPoint = styled.View`
width: 10px;
height: 10px;
borderRadius: 5px;
backgroundColor:${props=>props.color};

`;

export const IntineraryTitle = styled.Text`
marginLeft: 10px;
color:#999;

`;

export const IntineraryValue = styled.Text`
color#000;
font-size:16px;
`;

export const IntineraryPlaceholder = styled.Text`
color#555;
font-size:16px;
textAlign: center;
`;

export const RequestDetails = styled.View`
flexDirection: row;
`;

export const RequestDetail = styled.View`
flex:1;
alignItems: center;
`;

export const RequestTitle = styled.Text`
color:#999;
fontWeight: bold;
fontSize: 15px;
`;

export const RequestValue = styled.Text`
color:#000;
fontSize:17px;
`;

export const RequestButtons = styled.View`
flexDirection: row;
`;

export const RequestButton = styled.TouchableHighlight`
flex:1;
height: 40px;
justifyContent: center;
alignItems: center;
borderRadius: 5px;
backgroundColor: ${props=>props.color};
margin:10px 5px;
`;

export const RequestButtonText = styled.Text``;