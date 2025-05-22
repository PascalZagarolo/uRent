import { useState } from "react";

const PAYMENT_METHODS = [
  { id: 'card', label: 'Kreditkarte', icon: '💳' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️' },
  { id: 'sepa', label: 'SEPA Lastschrift', icon: '🏦' },
];

const MOCK_SUMMARY = {
  priceProfile: 'Standard Tarif',
  period: '12.06.2024, 10:00 - 14.06.2024, 18:00',
  extras: [
    { name: 'Navigationssystem', price: 8 },
    { name: 'Kindersitz', price: 5 },
  ],
  total: 123.00,
};

const ZahlungsAbschlussPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });
  const [sepaIban, setSepaIban] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');

  return (
    <div className="max-w-lg mx-auto p-6 bg-[#f4f6fa] dark:bg-[#181a22]/80 rounded-2xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-200 mb-2">Zahlung abschließen</h2>
      
      <div className="mb-4">
        <span className="font-semibold text-indigo-700 dark:text-indigo-200">Zahlungsmethode wählen</span>
        <div className="flex gap-3 mt-2">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMethod(method.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-150 font-medium text-sm focus:outline-none
                ${paymentMethod === method.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-200' : 'border-indigo-100 dark:border-indigo-900/40 bg-white dark:bg-[#23263a] text-gray-700 dark:text-gray-200 hover:border-indigo-400'}`}
              aria-pressed={paymentMethod === method.id}
            >
              <span className="text-lg">{method.icon}</span>
              {method.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        {paymentMethod === 'card' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Kreditkartendaten</label>
            <input
              type="text"
              placeholder="Kartennummer"
              className="w-full rounded border px-3 py-2 text-sm bg-white dark:bg-[#23263a] border-indigo-100 dark:border-indigo-900/40 focus:ring-2 focus:ring-indigo-400"
              value={cardDetails.number}
              onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })}
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-1/2 rounded border px-3 py-2 text-sm bg-white dark:bg-[#23263a] border-indigo-100 dark:border-indigo-900/40 focus:ring-2 focus:ring-indigo-400"
                value={cardDetails.expiry}
                onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })}
              />
              <input
                type="text"
                placeholder="CVC"
                className="w-1/2 rounded border px-3 py-2 text-sm bg-white dark:bg-[#23263a] border-indigo-100 dark:border-indigo-900/40 focus:ring-2 focus:ring-indigo-400"
                value={cardDetails.cvc}
                onChange={e => setCardDetails({ ...cardDetails, cvc: e.target.value })}
              />
            </div>
          </div>
        )}
        {paymentMethod === 'paypal' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">PayPal E-Mail</label>
            <input
              type="email"
              placeholder="E-Mail-Adresse"
              className="w-full rounded border px-3 py-2 text-sm bg-white dark:bg-[#23263a] border-indigo-100 dark:border-indigo-900/40 focus:ring-2 focus:ring-indigo-400"
              value={paypalEmail}
              onChange={e => setPaypalEmail(e.target.value)}
            />
          </div>
        )}
        {paymentMethod === 'sepa' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">IBAN</label>
            <input
              type="text"
              placeholder="DE..."
              className="w-full rounded border px-3 py-2 text-sm bg-white dark:bg-[#23263a] border-indigo-100 dark:border-indigo-900/40 focus:ring-2 focus:ring-indigo-400"
              value={sepaIban}
              onChange={e => setSepaIban(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-900/40">
        <span className="font-bold text-indigo-700 dark:text-indigo-200 text-base mb-2 block">Buchungsübersicht</span>
        <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">{MOCK_SUMMARY.priceProfile}</div>
        <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">{MOCK_SUMMARY.period}</div>
        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-sm mb-2">
          {MOCK_SUMMARY.extras.map((extra, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span>{extra.name}</span>
              <span className="font-semibold text-indigo-700 dark:text-indigo-200">+{extra.price.toFixed(2)} €</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-indigo-100 dark:border-indigo-900/40">
          <span className="font-bold text-indigo-900 dark:text-indigo-100">Gesamt</span>
          <span className="text-lg font-extrabold text-indigo-700 dark:text-indigo-200">{MOCK_SUMMARY.total.toFixed(2)} €</span>
        </div>
      </div>
      <div className="mb-2">
        <a
          href="#"
          className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-300 hover:underline font-medium mb-2"
          tabIndex={0}
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" /></svg>
          Wie funktioniert der Buchungsprozess auf uRent?
        </a>
      </div>
    </div>
  );
};

export default ZahlungsAbschlussPage;
