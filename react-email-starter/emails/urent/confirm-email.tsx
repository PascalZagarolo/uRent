import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
import { Inter } from "next/font/google";
  import * as React from "react";
import EmailFooter from "../email-template/email-footer";
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}`
    : "";
  
    interface ConfirmMailProps {
        confirmLink : string
    }

  export const ConfirmMail: React.FC<ConfirmMailProps> = ({
    confirmLink
  }) => (
    <Html>
      <Head />
      <Preview>Willkommen auf uRent</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <img              
              src={`${baseUrl}/uRent.png`}
              alt="uRent Logo"
              width={120}
              height={120}
            />
            <Hr style={hr} />
            <Text style={paragraph}>
              Vielen Dank für die Erstellung eines Accounts auf uRent.
            </Text>
            <Text style={paragraph}>
              Du kannst deinen Account jetzt aktivieren, indem du auf den Button unten klickst.
              Nachdem dein Account aktiviert wurde, kannst du dich einloggen und es kann mit deinem uRent Erlebnis losgehen.
            </Text>
            <Button style={button} href={confirmLink}>
              Account aktivieren
            </Button>
            <Hr style={hr} />
            <EmailFooter />
            
            
            
          </Section>
        </Container>
      </Body>
    </Html>
  );
  
  export default ConfirmMail;

  const inter = Inter({ subsets: ['latin'] });

  const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: 'Inter, sans-serif' 
};
  
  const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
  };
  
  const box = {
    padding: "0 48px",
  };
  

  
  const paragraph = {
    color: "#525f7f",
    fontWeight : "500",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const,
  };

  
  const anchor = {
    color: "#556cd6",
  };
  
  const button = {
    backgroundColor: "#131420",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "100%",
    padding: "10px",
  };
  
  
  const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  };
  
  