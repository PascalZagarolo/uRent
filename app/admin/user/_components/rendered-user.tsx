import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inserat, userTable } from "@/db/schema";
import { cn } from "@/lib/utils";
import { PersonIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { AlertCircleIcon, CalendarCheck2Icon, MailIcon, MailWarningIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiTransfer } from "react-icons/bi";
import { IoInformationCircle } from "react-icons/io5";
import { RiFolderUserFill } from "react-icons/ri";

interface RenderedUserProps {
  thisUser: typeof userTable.$inferSelect & {
    inserat: typeof inserat.$inferSelect[];
  };
}

const UserInfoBlock = ({ label, value }: { label: string; value?: string | null }) => (
  <div className="text-gray-200 text-sm font-semibold flex flex-row items-center space-x-2">
    <p className="font-medium text-gray-200/80 w-24">{label}</p>
    <span className={cn(!value && "text-gray-200/60 italic")}>
      {value ?? `Kein ${label.toLowerCase()} hinterlegt.`}
    </span>
  </div>
);

const RenderedUser = ({ thisUser }: RenderedUserProps) => {
  const [isOpen, setIsOpen] = useState<{ open: boolean; currentType: string | null }>({
    open: false,
    currentType: null,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  const publishedCount = thisUser.inserat.filter((i) => i.isPublished).length;
  const publishedRatio = (publishedCount / (thisUser.inserat.length || 1)) * 100;

  const handleTransfer = () => {
    // Your logic for transferring goes here
    console.log(`Transferring account to ${newAddress}`);
    setShowAlert(false);
    setIsOpen({ open: false, currentType: null });
    setNewAddress("");
  };

  const onMailSend = () => {
    try {
        const values = {
            newAddress : newAddress
        }

        

        toast.success("Email versendet.")
    } catch(e : any) {
        console.log(e);
        toast.error("Etwas ist schiefgelaufen. " + e);
    }
  }

  return (
    <>
      {/* ✅ Alert Dialog */}
      {showAlert && (
        <AlertDialog open onOpenChange={() => setShowAlert(false)}>
          <AlertDialogContent className="bg-[#191919] border-none">
            <div className="flex flex-col space-y-4">
              <div className="text-lg font-bold text-gray-200">Account wirklich übertragen?</div>
              <div className="text-gray-200/70 text-sm">
                Möchtest du den Account wirklich an{" "}
                <span className="text-indigo-400 font-semibold">{newAddress}</span> übertragen? <br/>
                Dies sendet eine E-Mail an die genannte Adresse. <br/> <br/>
                Der Erhalter der Email, kann das <span className="text-rose-400 font-semibold">Passwort</span> und Email-Addresse von diesem Account ändern und alle sensiblen Daten einsehen.
              </div>
              <div className="flex justify-end space-x-2 mt-6">
              <Button onClick={handleTransfer} className="bg-rose-600 text-gray-100 hover:bg-rose-800">
                  <AlertCircleIcon 
                   className="w-4 h-4 mr-2"
                  />
                  Account übertragen
                </Button>
                <Button onClick={() => setShowAlert(false)} className="bg-[#222222] text-gray-200 hover:bg-gray-600">
                  Abbrechen
                </Button>
                
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* ✅ User Details Dialog */}
      {isOpen.open && (
        <Dialog open onOpenChange={() => setIsOpen({ open: false, currentType: null })}>
          <DialogContent className="bg-[#191919] border-none">
            {!isOpen.currentType ? (
              <div className="flex flex-col">
                <div className="text-lg font-bold">Nutzer verwalten</div>

                {/* User Info */}
                <div className="flex mt-8 space-x-6">
                  <Image
                    alt="pfp"
                    src={thisUser.image ?? "/placeholder-person.jpg"}
                    className="w-24 h-24 rounded-full object-cover"
                    width={200}
                    height={200}
                  />
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold">{thisUser.name}</div>
                    <div className="text-gray-200/60 text-sm">{thisUser.email}</div>
                    <div className="flex items-center space-x-4 mt-4">
                      <RiFolderUserFill className={cn(thisUser.isAdmin ? "text-rose-400" : "text-indigo-500")} />
                      <div className={cn("text-sm font-semibold", thisUser.isAdmin ? "text-rose-400" : "text-indigo-500")}>
                        {thisUser.isAdmin ? "Admin" : "Nutzer"}
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <UserInfoBlock label="Vorname:" value={thisUser.vorname} />
                      <UserInfoBlock label="Nachname:" value={thisUser.nachname} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-gray-200/80 text-sm flex items-center">
                  <CalendarCheck2Icon className="w-4 h-4 mr-2" />
                  {format(thisUser.createdAt ?? new Date(), "dd MMMM yyyy", { locale: de })}
                </div>

                <div className="py-4">
                  <div className="w-full flex flex-col items-center justify-center p-8 rounded-full border border-gray-200">
                    <div className="text-4xl font-semibold">{thisUser.inserat.length}</div>
                    <Label className="mt-2">Inserate erstellt</Label>
                  </div>
                </div>

                <div className="w-full max-w-md mx-auto my-4">
                  <div className="text-sm mb-1 text-gray-200 font-semibold">Sichtbarkeit erstellter Inserate</div>
                  <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
                    <div className="bg-green-500 h-4" style={{ width: `${publishedRatio}%` }}></div>
                  </div>
                  <div className="text-xs text-gray-200/60 mt-1">
                    {publishedCount} / {thisUser.inserat.length} veröffentlicht
                  </div>
                </div>

                <div className="mt-8 space-y-2">
                  <Button
                    className="w-full bg-indigo-800 text-gray-200 hover:bg-indigo-900"
                    onClick={() => setIsOpen({ open: true, currentType: "transfer" })}
                  >
                    <BiTransfer className="w-4 h-4 mr-2" />
                    Account-Übergabe
                  </Button>
                  <Button className="w-full bg-[#222222] text-gray-200 hover:bg-[#242424]">
                    <MailWarningIcon className="w-4 h-4 mr-2" />
                    E-Mail Addresse ändern
                  </Button>
                </div>
              </div>
            ) : (
              // Transfer Mode
              <div className="flex flex-col">
                <div className="text-lg font-bold">Account übertragen</div>
                <div className="flex mt-8 space-x-6">
                  <Image
                    alt="pfp"
                    src={thisUser.image ?? "/placeholder-person.jpg"}
                    className="w-24 h-24 rounded-full object-cover"
                    width={200}
                    height={200}
                  />
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold">{thisUser.name}</div>
                    <div className="text-gray-200/60 text-sm">{thisUser.email}</div>
                    <div className="flex items-center space-x-4 mt-4">
                      <RiFolderUserFill className={cn(thisUser.isAdmin ? "text-rose-400" : "text-indigo-500")} />
                      <div className={cn("text-sm font-semibold", thisUser.isAdmin ? "text-rose-400" : "text-indigo-500")}>
                        {thisUser.isAdmin ? "Admin" : "Nutzer"}
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <UserInfoBlock label="Vorname:" value={thisUser.vorname} />
                      <UserInfoBlock label="Nachname:" value={thisUser.nachname} />
                    </div>
                  </div>
                </div>

                <div className="text-gray-200/60 text-sm py-8">
                  Es wird eine E-Mail an die angegebene Adresse gesendet, mit welcher die Zugangsdaten geändert werden können.
                </div>

                <div className="py-4">
                  <div className="w-full flex flex-col p-8 rounded-full border border-gray-200">
                    <div className="font-semibold text-sm flex items-center">
                      <MailIcon className="w-4 h-4 mr-2" />
                      Neue E-Mail-Adresse eingeben
                    </div>
                    <Input
                      className="bg-[#222222] shadow-lg border-none mt-2"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      placeholder="Neue E-Mail eingeben..."
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    className="w-full bg-rose-600 text-gray-200 hover:bg-rose-800"
                    disabled={newAddress.length < 8}
                    onClick={() => setShowAlert(true)}
                  >
                    <BiTransfer className="w-4 h-4 mr-2" />
                    Account-Übertragen
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* ✅ Mini Card */}
      <div className="bg-[#222222] rounded-md shadow-md w-full p-4" key={thisUser.id}>
        <div className="flex items-center space-x-8">
          <Image
            alt="pfp"
            src={thisUser.image ?? "/placeholder-person.jpg"}
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
          />
          <Label className="font-semibold text-base w-72 line-clamp-1 break-all">{thisUser.name}</Label>
          <Label className="text-gray-200/60 w-72">{thisUser.email}</Label>
          <Button
            className="text-sm bg-indigo-800 hover:bg-indigo-900 shadow-lg text-gray-200"
            onClick={() => setIsOpen({ open: true, currentType: null })}
          >
            <IoInformationCircle className="w-4 h-4 mr-2" />
            Weitere Informationen
          </Button>
        </div>
      </div>
    </>
  );
};

export default RenderedUser;
