import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
    flex:1;

`;

export const Header = styled.SafeAreaView`
    height: 150px;
    backgroundColor: #3574CB;
    justifyContent: center;  
`;

export const HeaderTitle = styled.Text`
    color: #FFF;
    fontSize: 27px;
    marginLeft: 20px;
`;

export const Menu = styled.View`
backgroundColor: #3574CB;
flexDirection: row;
paddingLeft: 20px;

`;
export const MenuItem = styled.TouchableHighlight`
padding: 20px;
borderBottomWidth: 5px;
borderBottomColor:${ props=>props.active ? '#FFF' : '#3574CB'} ;
`;
export const MenuItemText = styled.Text`
    color: #FFF;
    fontSize: 16px;
`;

export const Input = styled.TextInput`
    margin: 10px 20px;
    borderBottomWidth: 2px;
    borderBottomColor: #999;
    height: 40px;
    fontSize: 16px;
    color:#333;
`;

export const ActionButton = styled.TouchableHighlight`
backgroundColor: #3574CB;
justifyContent: center;
alignItems: center;
height: 40px;
borderRadius: 5px;
margin: 20px;
box-shadow: 0px 2px 2px #999;
`;

export const ActionButtonText = styled.Text`
color: #FFF;
fontSize: 16px;
`;