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
import EmailFooter from "../../email-template/email-footer";

  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}`
    : "";
  
    interface AccountTransferBeginProps {
        confirmLink : string,
        nativePasscode : string
    }

  export const AccountTransferBegin: React.FC<AccountTransferBeginProps> = ({
    confirmLink,
    nativePasscode
  }) => (
    <Html>
  <Head />
  <Preview>Account einlösen</Preview>
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
          Willkommen bei uRent! Schön, dass du dabei bist.
        </Text>
        <Text style={paragraph}>
          Um deinen Account zu aktivieren, klicke einfach auf den Button unten. Du wirst dann gebeten, deine neue E-Mail-Adresse einzugeben und ein Passwort festzulegen.
        </Text>
        <Text style={paragraph}>
          Danach erhältst du sofort Zugriff auf deinen Account sowie alle deine Inhalte. Du kannst deinen Fuhrpark verwalten, Verfügbarkeiten ändern oder deine Inhalte jederzeit bearbeiten.
        </Text>
        <Button style={button} href={confirmLink}>
          Account jetzt aktivieren
        </Button>
        <Text style={paragraph}>
          Dein Sicherheitscode: {nativePasscode} 
        </Text>
        <Hr style={hr} />
        <EmailFooter />
      </Section>
    </Container>
  </Body>
</Html>

  );
  
  export default AccountTransferBegin;

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
  