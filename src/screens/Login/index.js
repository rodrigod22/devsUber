import React, {useState} from 'react';
import { StatusBar, Platform , Text, ActivityIndicator} from 'react-native';
import useDevsUberApi from '../../useDevsUberApi';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { 
    Container,
    Header,
    HeaderTitle,
    Menu,
    MenuItem,
    MenuItemText,
    Input, 
    ActionButton,
    ActionButtonText,
    LoadingArea
    } from './style';

const Page = (props) => {

    const api = useDevsUberApi();
    const [activeMenu, setActiveMenu] = useState('signin');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [load, setLoad] = useState(false);

    const handleSignIn = async () => {
        if(email && password){
            setLoad(true);
            const res = await api.signIn(email, password);
            setLoad(false);
            if(res.error){
                alert(res.error);
            }else{
                //guardar token reducer 
                props.setToken(res.token);
                //redirecionar home
                props.navigation.dispatch(StackActions.reset({
                    index:0,
                    actions:[
                        NavigationActions.navigate({routeName:'HomeDrawer'})
                    ]
                }));
            }
        }
    }

    const handleSignUp = async () => {
        if(name && email && password){
            setLoad(true);
            const res = await api.signUp(name, email, password);
            setLoad(false);
            if(res.error){
                alert(res.error);
            }else{
                //guardar token reducer 
                props.setToken(res.token);
                //redirecionar home
                props.navigation.dispatch(StackActions.reset({
                    index:0,
                    actions:[
                        NavigationActions.navigate({routeName:'HomeDrawer'})
                    ]
                }));
            }
        }
    }

    return (
      <Container behavior={Platform.OS === 'ios' ? 'padding':null}>
          <StatusBar barStyle='light-content' />
          <Header>
              <HeaderTitle>DevsUber</HeaderTitle>
          </Header>
          <Menu >
            <MenuItem active={activeMenu == 'signin'} onPress={()=>setActiveMenu('signin')} underlayColor='transparent'>
                <MenuItemText>Login</MenuItemText>
            </MenuItem>
            <MenuItem active={activeMenu == 'signup'} onPress={()=>setActiveMenu('signup')} underlayColor='transparent'>
                <MenuItemText>Cadastrar</MenuItemText>
            </MenuItem>
          </Menu>

          {activeMenu == 'signup' &&
             <Input value={name} placeholder="Nome" placeholderTextColor='#999'
                    onChangeText={t=>setName(t)}/>
          }
          <Input value={email} placeholder="Email" placeholderTextColor='#999'
               editable={!load} onChangeText={t=>setEmail(t)} keyboardType='email-address' autoCapitalize='none'
          />
          <Input value={password} placeholder="Senha" placeholderTextColor='#999'
               editable={!load} onChangeText={t=>setPassword(t)} secureTextEntry={true}
          />

          {activeMenu == 'signin' &&
          <ActionButton disabled={load} onPress={handleSignIn}>
              <ActionButtonText>Login</ActionButtonText>
          </ActionButton>
          }
          {activeMenu == 'signup' &&
          <ActionButton disabled={load} onPress={handleSignUp}>
              <ActionButtonText>Cadastrar</ActionButtonText>
          </ActionButton>
          }
          <Text>Token: {props.token}</Text>

          {load &&
            <LoadingArea>
                <ActivityIndicator size='large' color='#FFF' />
            </LoadingArea>
          }        
      </Container>
    );
}

const mapStateToProps = (state) => {
    return{
        token:state.userReducer.token
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        setToken:(token)=>dispatch({type:'SET_TOKEN', payload:{token}})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Page);
