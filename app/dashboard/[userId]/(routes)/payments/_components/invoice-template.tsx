import {  Image, Text, Page, Document, StyleSheet, View } from '@react-pdf/renderer';

import { Fragment } from 'react';

const styles = StyleSheet.create({
    page: { fontSize: 11, paddingTop: 20, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: 'column' },

    spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: "#3E3E3E" },

    titleContainer: { flexDirection: 'row', marginTop: 24 },

    logo: { width: 90 },

    reportTitle: { fontSize: 16, textAlign: 'center' },

    addressTitle: { fontSize: 11, fontStyle: 'bold' },

    invoice: { fontWeight: 'bold', fontSize: 20 },

    invoiceNumber: { fontSize: 11, fontWeight: 'bold' },

    address: { fontWeight: 400, fontSize: 10 },

    theader: { marginTop: 20, fontSize: 10, fontStyle: 'bold', paddingTop: 4, paddingLeft: 7, flex: 1, height: 20, 
    backgroundColor: '#1F2332', borderColor: '#1F2332', borderRightWidth: 1, borderBottomWidth: 1, color: '#E5E7EB' },

    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

    tbody: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1, borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },

    total: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1.5, borderColor: 'whitesmoke', borderBottomWidth: 1 },

    tbody2: { flex: 2, borderRightWidth: 1, }

});

const reciept_data = {
    "id": "642be0b4bbe5d71a5341dfb1",
    "invoice_no": "20200669",
    "address": "Gnieselbert Haselmus Muster Weg, 42833 Magnesiumsglocke, Rumänien",
    "date": "20.07.2024",
    "items": [
        {
            "id": 1,
            "desc": "uRent - Enterprise (50 Inserate)",
            "qty": 1,
            "price": 178.99,
            
        },
        
    ]
}

const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
        <Image style={styles.logo} src="/uRent.png" />
            <Text style={styles.reportTitle}>uRent</Text>
        </View>
    </View>
);

const Address = () => (
    <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
            <View>
                <Text style={styles.invoice}>Rechnungsbeleg </Text>
                <Text style={styles.invoiceNumber}>Rechnungsnr. {reciept_data.invoice_no} </Text>
            </View>
            <View>
                <Text style={styles.addressTitle}>Bozenerstr. 26, </Text>
                <Text style={styles.addressTitle}>Solingen,</Text>
                <Text style={styles.addressTitle}>NRW, Deutschland.</Text>
            </View>
        </View>
    </View>
);

const UserAddress = () => (
    <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
            <View style={{ maxWidth: 200 }}>
                <Text style={styles.addressTitle}>Rechnungsadresse </Text>
                <Text style={styles.address}>
                    {reciept_data.address}
                </Text>
            </View>
            <Text style={styles.addressTitle}>{reciept_data.date}</Text>
        </View>
    </View>
);

const TableHead = () => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
        <View style={[styles.theader, styles.theader2]}>
            <Text >Produkt</Text>
        </View>
        <View style={styles.theader}>
            <Text>Preis</Text>
        </View>
        <View style={styles.theader}>
            <Text>Anzahl</Text>
        </View>
        <View style={styles.theader}>
            <Text>Gesamt</Text>
        </View>
    </View>
);

const TableBody = () => (
    reciept_data.items.map((receipt) => (
        <Fragment key={receipt.id}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={[styles.tbody, styles.tbody2]}>
                    <Text >{receipt.desc}</Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{receipt.price} </Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{receipt.qty}</Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{(receipt.price * receipt.qty).toFixed(2)} </Text>
                </View>
            </View>
        </Fragment>
    ))
);

const TableTotal = () => (
    <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={styles.total}>
            <Text></Text>
        </View>
        <View style={styles.total}>
            <Text> </Text>
        </View>
        <View style={styles.tbody}>
            <Text>Gesamtpreis</Text>
        </View>
        <View style={styles.tbody}>
            <Text>
                {reciept_data.items.reduce((sum, item) => sum + (item.price * item.qty), 0)} €
            </Text>
        </View>
    </View>
);

const InvoiceTemplate = () => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <InvoiceTitle />
                <Address />
                <UserAddress />
                <TableHead />
            <TableBody/>
                <TableTotal />
            </Page>
        </Document>
    );
}

export default InvoiceTemplate;