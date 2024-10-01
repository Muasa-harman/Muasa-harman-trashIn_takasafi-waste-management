import React,{useState} from "react";
import { StatusBar } from "expo-status-bar";
import {Formik} from "formik";
import {Octicons,Feather, Fontisto} from "@expo/vector-icons"
import { Colors, ExtraText } from "../components/style";

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    TextLink,
    TextLinkContent
} from "../components/style"
import { View } from "react-native";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const {brand,darkLight,primary} = Colors;

const Login = ({navigation}) =>{
    const [hidePassword, setHidePassword] = useState(true)
    return(
        <KeyboardAvoidingWrapper>
        <StyledContainer>
             <StatusBar style="dark"/> 
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('../assets/waste.jpg')}/>
                <PageTitle>Smart Waste</PageTitle>
                <SubTitle>Account Login</SubTitle>

                <Formik initialValues={{email:'', password:''}}
                 onSubmit={(values)=>{console.log(values);
                navigation.navigate("landing")
                }}
                >{({handleChange,handleBlur,handleSubmit,values})=>(
                    (<StyledFormArea>
                        <MyTextInput label="Email Address"
                        icon="mail"
                        placeholder="smartwaste@gmail.com"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        values={values.email}
                        keyboardType="email-address"
                        />
                        <MyTextInput label="Password"
                        icon="lock"
                        placeholder="* * * * * * * * * *"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        values={values.password}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                        />
                        <MsgBox>...</MsgBox>
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>
                                Login
                            </ButtonText>
                        </StyledButton>
                        <Line/>
                        <StyledButton google={true} onPress={handleSubmit}>
                            <Fontisto name="google" color={primary} size={25}/>
                            <ButtonText google={true}>
                                Sign in with Google
                            </ButtonText>
                        </StyledButton>
                        <ExtraView>
                            <ExtraText>Don't have an account?</ExtraText>
                            <TextLink onPress={()=>{navigation.navigate("signup")}}>
                                <TextLinkContent>Signup</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)
                )}</Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}
const MyTextInput = ({label, icon,hidePassword,setHidePassword,isPassword, ...props}) =>{
   return(
    <View>
        <LeftIcon>
            <Octicons name={icon} size={30} color={brand}/>
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props}/>
        {isPassword && (<RightIcon onPress={()=>setHidePassword(!hidePassword)}>
          <Feather name={hidePassword ? 'eye-off' : 'eye'} size={30} color={darkLight}/>
        </RightIcon>)}
    </View>
   )
}

export default Login;