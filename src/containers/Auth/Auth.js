
import React, {useState,useEffect} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {updateObject,checkValidity} from '../../Shared/utility';


const Auth = props =>{

   const[authForm,setAuthForm] =useState({
            email: {
                elementType: 'input',
                elementConfig:{
                    type: "email",
                    placeholder: 'Mail Address'
                },
                value:'',
                validation:{
                    required: true,
                    isEmail:true
                },
                valid:false,
                touch:false
            },
            password: {
                elementType: 'input',
                elementConfig:{
                    type: "password",
                    placeholder: 'Password'
                },
                value:'',
                validation:{
                    required: true,
                    minLength:7
                },
                valid:false,
                touch:false
            }

        })

        const [isSignUp,setIsSignup]=useState(true);
        
    

        const {buildingBurger,authRedirectPath,onsetAuthRedirectPath  } =props;
        useEffect(()=>{
            if(!buildingBurger && authRedirectPath !== '/'){
                onsetAuthRedirectPath()
            }

        },[buildingBurger,authRedirectPath,onsetAuthRedirectPath])

    
    

    const inputChangedHandler =(event,controlName) =>{
        const updatedContols = updateObject(authForm,{
            [controlName]:updateObject(authForm[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touch:true

            })

        });
        setAuthForm(updatedContols);
        
    }
    
    const submitHandler=(event)=>{
        event.preventDefault();
        props.onAuth(authForm.email.value,authForm.password.value,isSignUp);

    }
    
    const switchAuthModeHandler =() =>{
        setIsSignup(!isSignUp);
    }

    
        const formElementArray=[];
        for( let key in authForm){
            formElementArray.push({
                id: key,
                config: authForm[key]
            })
        }

        let form =formElementArray.map(formElement =>(
            <Input 
             key={formElement.id}
             elementType={formElement.config.elementType} 
             elementConfig={formElement.config.elementConfig}
             value={formElement.config.value}
             changed={(event) => inputChangedHandler(event,formElement.id)}
             invalid={!formElement.config.valid}
             shouldValidate={formElement.config.validation}
             touch={formElement.config.touch}
            />
           
        ));
        if(props.loading){
            form=<Spinner/>
        }
        let errorMessage = null;

        if(props.error){
            errorMessage=(
                <p>{props.error.message}</p>
            );
        }
        let authRedirect = null;
        if(props.isAuthenticated){
            authRedirect =<Redirect to={props.authRedirectPath}/>

        }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success" >SUBMIT</Button>
                </form>
                <Button 
                clicked={switchAuthModeHandler}
                btnType="Danger">SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>

        );
    
}


const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated : state.auth.token !==null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
        
    }

};
const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onsetAuthRedirectPath:(path) =>dispatch(actions.setAuthRedirectPath('/'))
    }

};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);