import { Clock10Icon, Pen, UnlockKeyhole } from "lucide-react";

const Drafts = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-800/50 p-4">
          <h2 className="text-center font-bold flex justify-center items-center"><Pen className="mr-2 h-5 w-5"/>Titel</h2>
          <main>
            
          </main>
        </div>
        <div className="bg-white p-4 font-semibold">
          <h2 className="text-center flex justify-center items-center"><Clock10Icon className="mr-2 h-5 w-5"/>Datum</h2>
          <main className="mt-8">
            <div className="py-2">
                23.01
            </div>
          </main>
        </div>
        <div className="bg-blue-800/50 p-4">
          <h2 className="text-center font-bold flex justify-center items-cente"><UnlockKeyhole className="mr-2 h-5 w-5"/>Status</h2>
          <main>

          </main>
        </div>
      </div>
      

    );
}

export default Drafts;