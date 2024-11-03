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
        backgroundColor: '#FFFFFF',  // White background for a clean look
        color: '#333333'  // Dark gray text for readability
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30
    },

    logo: {
        width: 80
    },

    companyDetails: {
        textAlign: 'right'
    },

    reportTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#333333'
    },

    subHeading: {
        fontSize: 9,
        color: '#666666'
    },

    invoiceDetails: {
        fontSize: 10,
        color: '#333333',
        marginBottom: 8
    },

    address: {
        fontSize: 10,
        color: '#666666',
        lineHeight: 1.4
    },

    tableHeader: {
        fontSize: 9,
        fontWeight: 'bold',
        padding: 6,
        backgroundColor: '#F2F2F2',  // Light gray for table headers
        color: '#333333',  // Dark text for table headers
        textAlign: 'center'
    },

    tableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
    },

    rowLight: {
        backgroundColor: '#F9F9F9'  // Alternating row background
    },

    column: {
        flex: 1,
        textAlign: 'center',
        color: '#333333'
    },

    columnDesc: {
        flex: 3,
        textAlign: 'left',
        paddingLeft: 10,
        color: '#333333'
    },

    totalSection: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#DDDDDD'
    },

    totalLabel: {
        fontWeight: 'bold',
        fontSize: 11,
        color: '#333333',
        marginRight: 10
    },

    totalValue: {
        fontSize: 11,
        color: '#333333'
    },

    footer: {
        marginTop: 20,
        fontSize: 8,
        color: '#888888',
        textAlign: 'center'
    },

    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
});


const InvoiceTitle = () => (
    <View style={styles.headerContainer}>
        <Image style={styles.logo} src="/uRent.png" />
        <View style={styles.companyDetails}>
            <Text style={styles.reportTitle}>uRent UG (haftungsbeschränkt)</Text>
            <Text style={styles.subHeading}>Bozenerstr. 26, 42659 Solingen, Nordrhein-Westfalen, Deutschland</Text>
            <Text style={styles.subHeading}>VAT ID: DE123456789</Text> {/* VAT ID added */}
        </View>
    </View>
);

const InvoiceDetails = ({ invoice_no, date }) => (
    <View style={styles.spaceBetween}>
        <View>
            <Text style={styles.invoiceDetails}>Rechnungsnr.: {invoice_no}</Text>
            <Text style={styles.invoiceDetails}>Rechnungsdatum: {date}</Text>
        </View>
    </View>
);

const UserAddress = ({ address }) => (
    <View style={styles.spaceBetween}>
        <View>
            <Text style={styles.subHeading}>Rechnungsadresse:</Text>
            <Text style={styles.address}>
                {[
                    address.line1,
                    address.line2,
                    address.postal_code && `${address.postal_code} ${address.city ?? ''}`,
                    address.state,
                    address.country
                ]
                    .filter(Boolean) 
                    .join(', ')}     
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

const TableBody = ({ plan, price, index }) => (

    <View style={[styles.tableRow, index % 2 === 0 && styles.rowLight]} >
        <Text style={styles.columnDesc}>{plan}</Text>
        <Text style={styles.column}>{price.toFixed(2)}</Text>
        <Text style={styles.column}>{1}</Text>
        <Text style={styles.column}>{(price).toFixed(2)}</Text>
    </View>

);

const TableTotal = ({ total }) => (
    <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Gesamt:</Text>
        <Text style={styles.totalValue}>{total.toFixed(2)} €</Text>
    </View>
);

const InvoiceTemplate = ({ price, invoice_no, address, date, plan, amount }) => {


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <InvoiceTitle />
                <InvoiceDetails invoice_no={invoice_no} date={date} />
                <UserAddress address={address} />
                <TableHead />
                <TableBody plan={plan} price={price} index={1} />
                <TableTotal total={price} />
                <Text style={styles.footer}>Vielen Dank für Ihre Bestellung bei uRent UG. Bei Fragen zur Rechnung wenden Sie sich bitte an support@urent.com.</Text>
            </Page>
        </Document>
    );
};

export default InvoiceTemplate;
