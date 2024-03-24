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
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
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
              
              src="https://previews.dropbox.com/p/thumb/ACMBjLxy_Y1L4nkNtpoLK8NvHs-b9ojSXoBsvx3xQe9N7XGYjoYY7-BZ2NKBQCA63G8KJHVXZah7vQ0kosLypE85tpYqv6vYF1wOYYSUBVB09xELXz_SIbMStIu9fyI9uQUnRvtRj3jySR5c_glFV_5tl6nvaBt7hrbnFXtSe2YOCZwE6LcOkT2ajZ7edlDzAqQNi_R0QFOiauOI_Ov7BCDonCaSbXScPRyvLcWP2a8vO0N49sCLwAkt5W5onaaLCFV5dfKC1hceJuyrPFjvSA52FuhmD5C8SIWwk_fUTVR8AO9GuvngS3FXZLPC5WB6G4EWodPxC-hGGjvDMfGytjfa/p.png"
              
              
              alt="uRent Logo"
            />
            <Hr style={hr} />
            <Text style={paragraph}>
              Vielen Dank für die Erstellung eines Accounts auf uRent.
            </Text>
            <Text style={paragraph}>
              Du kannst deinen Account jetzt aktivieren, indem du auf den Button unten klickst, um den vollen 
                Funktionsumfang von uRent zu nutzen.
            </Text>
            <Button style={button} href={confirmLink}>
              Account aktivieren
            </Button>
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
              uRent, 42653 Solingen, NRW, Deutschland
            </Text>
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
  