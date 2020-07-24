export default () => ({
    signIn:(email, password) => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json = {
                    error:'',
                    token:'123'
                };

                resolve(json);    
            }, 1000);
        })
    },

    signUp:(name, email, senha) => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json = {
                    error:'',
                    token:'123'
                };
                if(email == 'erro@gmail.com'){
                    alert('Email ja exite');
                }else{
                    json.token = '123';
                }

                resolve(json);    
            }, 1000);
        })
    }
});