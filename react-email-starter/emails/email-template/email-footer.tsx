import {
  Hr,
  Text,
} from "@react-email/components";

const EmailFooter = () => {
  return ( 
    <>
      <Text style={paragraph2}>
        Wir möchten sicherstellen, dass deine uRent-Erfahrung reibungslos verläuft. 
        Falls du Fragen oder Anliegen hast, zögere bitte nicht, dich an unser Support-Team support@urent-rental.com zu wenden. <br/>
        Wir stehen dir jederzeit gerne zur Verfügung.
      </Text>
      <Text style={paragraph2}>
        Wir freuen uns darauf, dir bei der Erfüllung deiner Bedürfnisse im Bereich Mieten und Vermieten behilflich zu sein. <br/>
      </Text>
      <Text style={paragraph2}>— Das uRent Team</Text>
      <Hr style={hr} />
      <Text style={footer}>
        uRent UG (haftungsbeschränkt), Bozenerstr. 26, 42659 Solingen, NRW, Deutschland <br/>
        HRB 35082, Handelsregister B, Amtsgericht Wuppertal <br/>
        USt-IdNr: DE449786181 <br/>
        Vertreten durch: Pascal Zagarolo, Vincent Garber
      </Text>
    </>
  );
}

export default EmailFooter;

const paragraph2 = {
  color: "#525f7f",
  fontWeight : "400",
  fontSize: "12px",
  lineHeight: "20px",
  textAlign: "left" as const,
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};
