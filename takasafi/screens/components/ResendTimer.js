import { ActivityIndicator, View } from "react-native";
import { InfoText,EmphasizeText,InlineGroup,TextLink,TextLinkContent,Colors } from "./style";

const {brand} = Colors;

const ResendTimer  = ({activeResend,resendEmail,resendingEmail,resendStatus,timeLeft,targetTime}) =>{

    return (
        <View>
            <InlineGroup>

                <InfoText>Din't receive the email?</InfoText>
                {!resendingEmail && (<TextLink style={{opacity: !activeResend && 0.5}} disabled={!activeResend
                } onPress={resendEmail}>
                    <TextLinkContent resendStatus={resendStatus} style={{textDecorationLine:'underline'}}>
                        {resendStatus}
                    </TextLinkContent>
                </TextLink>)}
                {resendEmail && (<TextLink disabled>
                    <TextLinkContent>
                        <ActivityIndicator color={brand}/>
                    </TextLinkContent>
                </TextLink>)}
            </InlineGroup>
            {!activeResend && (<InfoText>in <EmphasizeText>{`${timeLeft || targetTime}`}</EmphasizeText>
            second(s)</InfoText>)}
        </View>
    )
}

export default ResendTimer;