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
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}`
    : "";
  
    

  export const ConfirmDeletedAccount = () => (
    <Html>
      <Head />
      <Preview>Account gelöscht</Preview>
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
            Dein Konto wurde erfolgreich gelöscht. <br/>
            Falls du deine Meinung änderst, kannst du jederzeit ein neues Konto erstellen. <br/>
            Wir freuen uns darauf, dich wieder bei uRent begrüßen zu dürfen.
            </Text>
            
            
            
            <Hr style={hr} />
            
            
            
            <Text style={paragraph2}>
            Wir möchten sicherstellen, dass Ihre uRent-Erfahrung reibungslos verläuft. 
            Falls Sie Fragen oder Anliegen haben, zögern Sie bitte nicht, sich an unser Support-Team support@urent-rental.de zu wenden.  <br/>
            Wir stehen Ihnen jederzeit gerne zur Verfügung.
            </Text>
            <Text style={paragraph2}>
            Wir freuen uns darauf, Ihnen bei der Erfüllung Ihrer Bedürfnisse im Bereich Mieten und Vermieten behilflich zu sein. <br/>
            
            </Text>
            <Text style={paragraph2}>— Das uRent Team</Text>
            <Hr style={hr} />
            <Text style={footer}>
            uRent UG (haftungsbeschränkt), Bozenerstr.26, 42659 Solingen, NRW, Deutschland
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
  
  export default ConfirmDeletedAccount;

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
  