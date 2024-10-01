import React from "react";
import { StatusBar } from "expo-status-bar";
import { Modal } from "react-native";
import { PageTitle,InfoText,StyledButton,ButtonText,Colors, ModalContainer, ModalView } from "./style";
// icon
import {Ionicons} from '@expo/vector-icons'


// color
const {primary,green,tertiary,red} = Colors;


const VerificatinModel = ({modalVisible, setModalVisible,successful,requestMessage,persistLoginAfterOTPVerification,}) =>{
 const buttonHandler = ()=>{
     if(successful){
        persistLoginAfterOTPVerification();
     };
     setModalVisible(false);
 };
 
    return(
        <>
        <Modal animationType="slide" visible={modalVisible} transparent={true}>
            <ModalContainer>
              {!successful &&<FailContent buttonHandler={buttonHandler} errorMessage={requestMessage}/>}
              {successful && <SuccessContent buttonHandler={buttonHandler}/>}
            </ModalContainer>
        </Modal>
        </>
    );
};

const SuccessContent = ({buttonHandler}) =>{
    return (
        <ModalView>
            <StatusBar style="dark"/>
            <Ionicons name="checkmark-circle" size={100} color={green}/>

            <PageTitle style={{fontSize:25,color:tertiary,marginBottom:10}}>Verified</PageTitle>

            <InfoText style={{marginBottom:15}}>You have successfully Verified your Account.</InfoText>

            <StyledButton style={{backgroundColor: green, flexDirection:'row'}} onPress={buttonHandler}>
                <ButtonText>Continue to App</ButtonText>
                <Ionicons name="arrow-forward-circle" size={25} color={primary}/>
            </StyledButton>
        </ModalView>
    );
};

const FailContent = ({errorMessage,buttonHandler}) =>{
    return (
        <ModalView>
            <StatusBar style="dark"/>
            <Ionicons name="close-circle" size={100} color={red}/>

            <PageTitle style={{fontSize:25,color:tertiary,marginBottom:10}}>Failed!</PageTitle>

            <InfoText style={{marginBottom:15}}>{`Oops! Account verification failed. ${errorMessage}`}</InfoText>

            <StyledButton style={{backgroundColor: red, flexDirection:'row'}} onPress={buttonHandler}>
                <ButtonText>Try Again</ButtonText>
                <Ionicons name="arrow-redo-circle" size={25} color={primary}/>
            </StyledButton>
        </ModalView>
    )
}

export default VerificatinModel;