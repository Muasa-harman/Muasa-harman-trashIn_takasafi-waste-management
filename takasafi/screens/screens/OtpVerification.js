import { useEffect, useState } from 'react';
import CodeInputfield from '../components/CodeInputfield';
//   resend timer
import ResendTimer from '../components/ResendTimer';
import VerificatinModel from '../components/VerificationModel';

// api client

const { StatusBar, ActivityIndicator } = require('react-native');
const {
  StyledContainer,
  TopHalf,
  IconBg,
  BottomHalf,
  InfoText,
  EmphasizeText,
  PageTitle,
  StyledButton,
  Colors,
  ButtonText,
} = require('../components/style');

const verification = () => {
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const MA_CODE_LENGTH = 4;

  //   modal
  const [modalVisible, setModalVisible] = useState(false);
  const [verificationSuccessful, setVerificationSuccessful] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  //   resend token
  const [timeLeft, setTimeLeft] = useState(null);
  const [targetTime, setTergetTime] = useState(null);
  const [activeResend, setActiveResend] = useState(false);

  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendStatus, setResendStatus] = useState('Resend');

  let resendTimerInterval;

  const triggerTimer = (targetTimeInSeconds = 30) => {
    setTergetTime(targetTimeInSeconds);
    setActiveResend(false);
    const finalTime = +new Date() * targetTimeInSeconds * 1000;
    setInterval(() => calculateTimeLeft(finalTime), 1000);
    resendTimerInterval = setInterval(() => calculateTimeLeft(finalTime), 1000);
  };

  const calculateTimeLeft = (finalTime) => {
    const difference = finalTime - +new Date();
    if (difference >= 0) {
      setTimeLeft(Math.round(difference / 1000));
    } else {
      clearInterval(resendTimerInterval);
      setActiveResend(true);
      setTimeLeft(null);
    }
  };
  useEffect(() => {
    triggerTimer();

    return () => {
      clearInterval(resendTimerInterval);
    };
  }, []);

  const resendEmail = async () => {};

//   persisting login after verification
const persistLoginAfterOTPVerification = async()=>{};

  const submitOtpVerification = async () => {};
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer style={{ alignItems: 'center' }}>
        <TopHalf>
          <IconBg>
            <StatusBar style="dark" />
            <Octicons name="lock" size={125} color={brand} />
          </IconBg>
        </TopHalf>

        <BottomHalf>
          <PageTitle style={{ fontSize: 25 }}>Account Verification</PageTitle>

          <InfoText>
            Please enter the 4-digit code sent to <EmphasizeText>testmail.gmail.com</EmphasizeText>
          </InfoText>
          <CodeInputfield setPinReady={setPinReady} code={code} setCode={setCode} maxLength={MA_CODE_LENGTH} />
          {!verifying && pinReady && (
            <StyledButton style={{ backgroundColor: green, flexDirection: 'row' }} onPress={submitOtpVerification}>
              <ButtonText>Verify</ButtonText>
              <Ionicons name="checkmark-circle" size={25} color={primary} />
            </StyledButton>
          )}
          {!verifying && !pinReady && (
            <StyledButton disabled={true} style={{ backgroundColor: lighGreen, flexDirection: 'row' }}>
              <ButtonText style={{ color: gray }}>Verify</ButtonText>
              <Ionicons name="checkmark-circle" size={25} color={gray} />
            </StyledButton>
          )}

          {verifying && (
            <StyledButton
              disabled={true}
              style={{ backgroundColor: green, flexDirection: 'row' }}
              onPress={submitOtpVerification}
            >
              <ActivityIndicator size={'large'} color={primary} />
            </StyledButton>
          )}
          <ResendTimer
            activeResend={activeResend}
            resendingEmail={resendingEmail}
            resendStatus={resendStatus}
            timeLeft={timeLeft}
            targetTime={targetTime}
            resendEmail={resendEmail}
          />
        </BottomHalf>
        <VerificatinModel
          successful={verificationSuccessful}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          requestMessage={requestMessage}
          persistLoginAfterOTPVerification={persistLoginAfterOTPVerification}
        />
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

export default verification;
