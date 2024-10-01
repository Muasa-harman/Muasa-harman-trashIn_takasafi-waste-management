import React,{useState} from "react";
import { StatusBar } from "expo-status-bar";

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeImage,
    LandingContainer,
    Avatar
} from "../components/style";


const Landing = ({navigation}) =>{
    return(
        <>
             <StatusBar style="dark"/> 
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require("../assets/solid.jpg")}/>
                <LandingContainer>
                <PageTitle welcome={true}>Welcome! friend </PageTitle>
                <SubTitle welcome={true}>Introducing "WasteWise", an innovative mobile application 
                designed to revolutionize waste management practices. 
                WasteWise is a user-friendly platform that facilitates efficient disposal of waste products 
                while promoting sustainability and environmental consciousness. 
                With WasteWise, users can easily categorize and segregate their waste according to recyclable, organic, and hazardous materials, fostering responsible waste disposal habits. The app provides real-time notifications and reminders for waste collection schedules, ensuring timely disposal and minimizing waste accumulation. WasteWise offers a comprehensive database of recycling facilities and drop-off points, empowering users to conveniently recycle materials and reduce landfill waste. Through interactive features and educational resources, WasteWise educates users on the importance of waste reduction and recycling, inspiring positive behavioral change. Users can track their waste management efforts and environmental impact through personalized analytics and progress reports within the app. WasteWise promotes community engagement by facilitating user-driven initiatives and collaborative projects aimed at improving local waste management practices. The app also fosters partnerships with local businesses, municipalities, and environmental organizations to enhance waste management infrastructure and promote sustainable development. WasteWise is the ultimate solution for individuals and communities looking to adopt eco-friendly waste management practices and make a meaningful contribution to environmental conservation.</SubTitle>
                <SubTitle welcome={true}>Discard</SubTitle>
                    <StyledFormArea>
                    <Avatar resizeMode="cover" source={require('../assets/waste.jpg')}/>
                        <Line/>
                        <StyledButton onPress={()=>{navigation.navigate('login')}}>
                            <ButtonText>Discard</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </LandingContainer>
            </InnerContainer>
        </>
    );
}

export default Landing;