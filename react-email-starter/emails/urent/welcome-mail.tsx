import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    
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
  
    

  export const WelcomeMail = () => (
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
            Herzlich Willkommen auf uRent! Wir freuen uns, dass du dich für uRent entschieden hast. <br/>
            Entdecke die einfachste Art zu mieten und zu vermieten. <br/>
            Genieße die Flexibilität und Vielfalt unserer Angebote und finde genau das, was du brauchst, wann immer du es brauchst. <br/>
            Falls du Vermieter bist, kannst du dein Account kostenlos zum Vermieteraccount unter {`"`}Profil{`"`} umwandeln. <br/>
            </Text>
            <Text style={paragraph}>
            Falls du weitere Informationen oder Unterstützung benötigst, zögere bitte nicht, dich an unser Support-Team zu wenden.
            </Text>
            <Text style={paragraph}>
              
            </Text>
            
            <Hr style={hr} />
            
            
            
            <EmailFooter />
          </Section>
        </Container>
      </Body>
    </Html>
  );
  
  export default WelcomeMail;

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
  
  const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  };
  
  const paragraph = {
    color: "#525f7f",
    fontWeight : "500",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const,
  };

  const paragraph2 = {
    color: "#525f7f",
    fontWeight : "400",
    fontSize: "12px",
    lineHeight: "20px",
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
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
  };
  