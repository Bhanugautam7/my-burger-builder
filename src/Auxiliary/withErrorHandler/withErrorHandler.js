import React, { useState,useEffect } from 'react';
import Aux from '../Auxillar/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler =(WrappedComponent , axios) =>{

    return props => {

        const[error,setError]=useState(null);
         

        
            const reqInterceptor  = axios.interceptors.response.use(req=>{
                setError(null);
                return req;
            });

            const resInterceptor = axios.interceptors.response.use(res =>res, err =>{
                   setError(err);
            });
        
        useEffect(() =>{
            return () =>{
                axios.interceptors.response.eject(resInterceptor);
                axios.interceptors.request.eject(reqInterceptor);

            };
        },[resInterceptor,reqInterceptor]);
           

        
      
     const  errorConfirmedHandler= () =>{
            setError(null);
        }

        
            return(
          <Aux>
                <Modal
                 show={error}
                 modalClosed={errorConfirmedHandler}
                   >
                    {error ? error.message : null}
                </Modal>
          <WrappedComponent {...props}/>

            </Aux>
            );
        

    }
    
}

export default withErrorHandler;