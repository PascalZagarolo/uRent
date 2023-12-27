import CredForm from "../_components/login-form";

const RegisterPage = () => {
    return (
        <div>
            <main>
                <div className='flex justify-center items-center'>
                    <h3 className='font-semibold text-2xl py-8'>
                        Konto erstellen
                    </h3>
                </div>

                <div className='flex justify-center items-center'>
                    <CredForm 
                    
                    />
                </div>

            </main>
        </div>
    )
}
 
export default RegisterPage;