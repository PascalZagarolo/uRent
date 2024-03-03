import NewPassword from "../_components/new-password-form";

const Page = () => {
    return ( 
        <div>
            <h3 className="flex justify-center font-semibold text-xl">
                Neues Passwort eingeben
            </h3>
            <NewPassword/>
        </div>
     );
}
 
export default Page;