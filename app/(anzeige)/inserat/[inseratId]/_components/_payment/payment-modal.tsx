import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectPriceProfile from "./select-price-profile";
import SelectBookingPeriod from "./select-booking-period";
import SelectExtrasPage from "./select-extras-page";
import ZahlungsAbschlussPage from "./zahlungs-abschluss-page";

const steps = [
  "Preisprofil wählen",
  "Buchungszeit wählen",
  "Extras wählen",
  "Bezahlen"
];

const PaymentModal = () => {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setOpen(false);
      setStep(0);
    }, 1800);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="relative w-full">
            <Button
              className="w-full text-lg font-extrabold py-6 rounded-xl shadow-xl bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-800 text-white transition-all duration-200 border-2 border-indigo-400/60 focus:ring-4 focus:ring-indigo-400/40 animate-pulse hover:animate-none"
              style={{ letterSpacing: '0.03em', boxShadow: '0 6px 32px 0 rgba(99,102,241,0.18)' }}
            >
              🚀 Jetzt buchen
              <span className="absolute -top-3 right-4 bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md border border-white/80">Neu</span>
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-[#f4f6fa] dark:bg-[#181a22]/95 rounded-2xl shadow-2xl backdrop-blur-md border-0">
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center min-h-[320px] animate-fade-in">
              <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg>
              <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-200 mb-2">Buchungsanfrage gesendet</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">Deine Buchungsanfrage wurde erfolgreich übermittelt.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-0 mt-4 w-full">
                {steps.map((label, idx) => {
                  const isActive = idx === step;
                  const isCompleted = idx < step;
                  const isLast = idx === steps.length - 1;
                  return (
                    <div key={label} className="flex flex-col items-center flex-1 min-w-0">
                      <div className="flex items-center justify-center w-full">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200
                            ${isActive ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg scale-110' :
                              isCompleted ? 'bg-indigo-400 border-indigo-400 text-white' :
                              'bg-white dark:bg-[#23263a] border-gray-300 dark:border-gray-700 text-gray-400'}
                          `}
                        >
                          {isCompleted ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          ) : (
                            <span className="font-bold text-base">{idx + 1}</span>
                          )}
                        </div>
                        {!isLast && (
                          <div className="h-1 w-12 bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-500 dark:from-indigo-900 dark:via-indigo-700 dark:to-indigo-600 opacity-60 rounded mx-2" />
                        )}
                      </div>
                      <span className={`mt-2 text-xs font-medium line-clamp-2 text-center max-w-[80px] h-12 ${isActive ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400'}`}>{label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="py-4 ">
                {step === 0 && (
                  <div>
                    <SelectPriceProfile />
                  </div>
                )}
                {step === 1 && (
                  <SelectBookingPeriod thisInserat={null} receivedBookings={[]} />
                )}
                {step === 2 && (
                  <SelectExtrasPage />
                )}
                {step === 3 && (
                  <ZahlungsAbschlussPage />
                )}
              </div>
              <DialogFooter className="flex gap-3 justify-end mt-4">
                <Button
                  variant="ghost"
                  className="rounded-lg px-5 py-2 font-semibold text-indigo-600 dark:text-indigo-300 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-700 bg-transparent hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
                  onClick={prevStep}
                  disabled={step === 0}
                  type="button"
                >
                  Zurück
                </Button>
                {step < steps.length - 1 ? (
                  <Button
                    className="rounded-lg px-5 py-2 font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all"
                    onClick={nextStep}
                    type="button"
                  >
                    Weiter
                  </Button>
                ) : (
                  <Button
                    className="rounded-lg px-5 py-2 font-semibold bg-indigo-700 hover:bg-indigo-800 text-white shadow-md transition-all"
                    type="button"
                    onClick={handleSuccess}
                  >
                    Zahlung abschließen
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentModal;