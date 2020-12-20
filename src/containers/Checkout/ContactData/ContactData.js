import React, { useState } from 'react'
import Button  from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler  from'../../../Auxiliary/withErrorHandler/withErrorHandler';
import {updateObject,checkValidity} from '../../../Shared/utility';
import * as actions from '../../../store/actions/index';

const ContactData = props => {

   const[orderForm,setOrderForm]= useState({

            name:{
                elementType: 'input',
                elementConfig:{
                    type: "text",
                    placeholder: 'Your name'
                },
                value:'',
                validation:{
                    required: true
                },
                valid:false,
                touch:false
            },
            street: {
                elementType: 'input',
                elementConfig:{
                    type: "text",
                    placeholder: 'Street'
                },
                value:'',
                validation:{
                    required: true
                },
                valid:false,
                touch:false
            },
            zipcode: {
                elementType: 'input',
                elementConfig:{
                    type: "text",
                    placeholder: 'ZIP Code'
                },
                value:'',
                validation:{
                    required: true,
                    minLength:'5',
                    maxLength: '5',
                },
                valid:false,
                touch:false
            },
            country: {
                elementType: 'input',
                elementConfig:{
                    type: "text",
                    placeholder: 'Country'
                },
                value:'',
                validation:{
                    required: true
                },
                valid:false,
                touch:false
            },
            email: {
                elementType: 'input',
                elementConfig:{
                    type: "email",
                    placeholder: 'Your Email'
                },
                value:'',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid:false,
                touch:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                   options:[
                    {value: 'fastest',displayValue: 'Fastest'},
                   {value: 'cheapest',displayValue: 'Cheapest'}
                ]
                },
                value:'fastest',
                validation:{},
                valid:true
            },

        })

      const [formIsValid,setFormIsValid] = useState(false);
        
    

    

   const orderHandler=(e)=>{
        e.preventDefault();
     
         const formData={};
         for( let formElementIdentifier in orderForm){
             formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
         }
        const order={
            ingredients: props.ings,
            price: props.price,
            orderData :formData,
            userId: props.userId
        }
       
           props.onOrderBurger(order,props.token);
    }

    
    const inputChangedHandler =(event,inputIdentifier) =>{
       
       const updatedFormElement=updateObject(orderForm[inputIdentifier],{
           value:event.target.value,
           valid:checkValidity(event.target.value,orderForm[inputIdentifier].validation),
           touch:true
       });
       const updatedOrderForm= updateObject(orderForm,{
        [inputIdentifier]:updatedFormElement
       });
      
        let formIsValid =true;
         for( let inputIdentifier in updatedOrderForm){
             formIsValid =updatedOrderForm[inputIdentifier].valid && formIsValid;
         }
         setOrderForm(updatedOrderForm);
         setFormIsValid(formIsValid);
       

    }  

     

         const formElementsArray=[];
         for( let key in orderForm){
             formElementsArray.push({
                 id: key,
                 config: orderForm[key]
             });
         }
        let form =(
            <form onSubmit={orderHandler }>
            
            {formElementsArray.map(formElement =>(
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
            ))}
            <Button btnType='Success' disabled={!formIsValid} >Order</Button>


        </form>
        );
        if(props.loading){
           form=<Spinner/>
        }
         return(
             <div className={classes.ContactData}>
                 <h4>Enter your Contact Data</h4>
                {form}
             </div>
         );
     
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }

};

const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger:(orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    };
   
};

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(ContactData,axios));