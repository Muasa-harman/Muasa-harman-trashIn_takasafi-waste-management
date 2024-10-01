import React,{useState} from "react";
import { StatusBar } from "expo-status-bar";
import {Formik} from "formik";
import {Octicons,Feather,AntDesign} from "@expo/vector-icons"
import { Colors, ExtraText } from "../components/style";

import {
    StyledContainer,
    InnerContainer,
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

const Signup = ({navigation}) =>{
    const [hidePassword, setHidePassword] = useState(true)
    return(
        <KeyboardAvoidingWrapper>
        <StyledContainer>
             <StatusBar style="dark"/> 
            <InnerContainer>
                <PageTitle>Smart Waste</PageTitle>
                <SubTitle>Account Signup</SubTitle>

                <Formik initialValues={{fullName:'',email:'',phoneNumber:'', password:'',confirmPassword:''}}
                 onSubmit={(values)=>{console.log(values);
                navigation.navigate("landing")}}
                >{({handleChange,handleBlur,handleSubmit,values})=>(
                    (<StyledFormArea>
                        <MyTextInput label="Full Name"
                        icon="person"
                        placeholder="harmanman"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('fullName')}
                        onBlur={handleBlur('fullName')}
                        values={values.fullName}
                        />
                        <MyTextInput label="Email Address"
                        icon="mail"
                        placeholder="smartwaste@gmail.com"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        values={values.email}
                        keyboardType="email-address"
                        />
                        <MyTextInput label="Phone Number"
                        // icon="phone"
                        placeholder="+25472145699"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        values={values.phoneNumber}
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
                        <MyTextInput label="Confirm Password"
                        icon="lock"
                        placeholder="* * * * * * * * * *"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        values={values.confirmPassword}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                        />
                        <MsgBox>...</MsgBox>
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>
                                Sign up
                            </ButtonText>
                        </StyledButton>
                        <Line/>
                       
                        <ExtraView>
                            <ExtraText>Already have an account?</ExtraText>
                            <TextLink onPress={()=>navigation.navigate('login')}>
                                <TextLinkContent>Login</TextLinkContent>
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

export default Signup;