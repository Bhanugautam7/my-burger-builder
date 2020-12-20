import React from 'react';
import classes  from './Modal.module.css';
import Aux from '../../../Auxiliary/Auxillar/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';



const Modal = props => {

    // shouldComponentUpdate(nextprops, nextstate){
    //     return nextprops.show !== this.props.show|| nextprops.children !==this.props.children;

    // }
   
    
        return(
        <Aux>
            <Backdrop show={props.show}  clicked={props.modalClosed}/>
        <div 
            className={classes.Modal}
            style={{transform: props.show ? 'translateY(0)' :'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                }}>
                {props.children}
            </div>

        </Aux>
        );
    

    

        };



export default React.memo(Modal,
    (prevProps, nextprops)=> nextprops.show ===prevProps.show && nextprops.children === prevProps.children
    );