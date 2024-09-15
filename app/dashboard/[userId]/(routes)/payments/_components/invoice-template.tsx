import { Image, Text, Page, Document, StyleSheet, View } from '@react-pdf/renderer';
import { Fragment } from 'react';

const styles = StyleSheet.create({
    page: {
        fontSize: 10,
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
        lineHeight: 1.5,
        flexDirection: 'column',
        backgroundColor: '#2D314B',  // Lightened background for higher contrast
        color: '#FFFFFF'  // Text remains white for readability
    },

    spaceBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },

    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },

    logo: {
        width: 60
    },

    reportTitle: {
        fontSize: 16,
        fontWeight: "demibold",
        color: '#FFFFFF'  // White text for clarity
    },

    invoiceTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',  // White text for clarity
        marginBottom: 5
    },

    subHeading: {
        fontSize: 9,
        color: '#D9D9D9'  // Lighter gray for subheadings
    },

    invoiceDetails: {
        fontSize: 10,
        color: '#FFFFFF',  // White text for main invoice details
        marginBottom: 8
    },

    address: {
        fontSize: 10,
        color: '#CCCCCC',  // Light gray for address text
        lineHeight: 1.4
    },

    tableHeader: {
        fontSize: 9,
        fontWeight: 'bold',
        padding: 6,
        backgroundColor: '#202336',  // The logo color for table headers
        color: '#FFFFFF',  // White text for the table header
        textAlign: 'center'
    },

    tableRow: {
        flexDirection: 'row',
        paddingVertical: 6,
  

    },

    rowLight: {
        backgroundColor: '#363B57'  // Subtle lighter shade for alternating row background
    },

    column: {
        flex: 1,
        textAlign: 'center',
        color: '#FFFFFF'  // White text for table columns
    },

    columnDesc: {
        flex: 3,
        textAlign: 'left',
        paddingLeft: 10,
        color: '#FFFFFF'  // White text for descriptions
    },

    totalSection: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#363B57'  // Light gray for total section border
    },

    totalLabel: {
        fontWeight: 'black',
        fontSize: 11,
        color: '#FFFFFF',  // White text for total label
        marginRight: 10
    },

    totalValue: {
        fontSize: 11,
        color: '#FFFFFF'  // White text for total value
    }
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
};

const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
        <Image style={styles.logo} src="/uRent.png" />
        <Text style={styles.reportTitle}>uRent UG</Text>
    </View>
);

const InvoiceDetails = ({ invoice_no, date }) => (
    <View style={styles.spaceBetween}>
        <View>
            <Text style={styles.invoiceTitle}>Rechnung</Text>
            <Text style={styles.subHeading}>Rechnungsnr.:</Text>
            <Text style={styles.invoiceDetails}>{invoice_no}</Text>
            <Text style={styles.subHeading}>Datum:</Text>
            <Text style={styles.invoiceDetails}>{date}</Text>
        </View>
        <View>
            <Text style={styles.subHeading}>Absender:</Text>
            <Text style={styles.address}>Bozenerstr. 26</Text>
            <Text style={styles.address}>Solingen, NRW</Text>
            <Text style={styles.address}>Deutschland</Text>
        </View>
    </View>
);

const UserAddress = ({ address }) => (
    <View style={styles.spaceBetween}>
        <View>
            <Text style={styles.subHeading}>Rechnungsadresse:</Text>
            <Text style={styles.address}>
                {`${address.line1}, ${address.line2 ? address.line2 + ', ' : ''}${address.postal_code} ${address.city}, ${address.state}, ${address.country}`}
            </Text>
        </View>
    </View>
);

const TableHead = () => (
    <View style={styles.tableRow}>
        <Text style={[styles.columnDesc, styles.tableHeader]}>Produktbeschreibung</Text>
        <Text style={[styles.column, styles.tableHeader]}>Preis (€)</Text>
        <Text style={[styles.column, styles.tableHeader]}>Menge</Text>
        <Text style={[styles.column, styles.tableHeader]}>Gesamt (€)</Text>
    </View>
);

const TableBody = ({ items }) => (
    items.map((item, index) => (
        <View style={[styles.tableRow, index % 2 === 0 && styles.rowLight]} key={item.id}>
            <Text style={styles.columnDesc}>{item.desc}</Text>
            <Text style={styles.column}>{item.price.toFixed(2)}</Text>
            <Text style={styles.column}>{item.qty}</Text>
            <Text style={styles.column}>{(item.price * item.qty).toFixed(2)}</Text>
        </View>
    ))
);

const TableTotal = ({ total }) => (
    <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Gesamt:</Text>
        <Text style={styles.totalValue}>{total.toFixed(2)} €</Text>
    </View>
);

const InvoiceTemplate = ({ price, invoice_no, address, date, plan, amount }) => {
    const total = reciept_data.items.reduce((acc, item) => acc + (item.price * item.qty), 0);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <InvoiceTitle />
                <InvoiceDetails invoice_no={invoice_no} date={date} />
                <UserAddress address={address} />
                <TableHead />
                <TableBody items={reciept_data.items} />
                <TableTotal total={total} />
            </Page>
        </Document>
    );
};

export default InvoiceTemplate;
