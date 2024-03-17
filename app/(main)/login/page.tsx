
import { auth } from '@/auth';
import CredForm from '../_components/login-form'

import { KeyRound } from 'lucide-react';



export default async function Home() {

    

    
   
    return (
        <div>
            <main>
                <div className='flex justify-center items-center'>
                    <h3 className='font-semibold text-2xl py-8 flex'>
                      <KeyRound className='mr-2'/>  Anmelden oder Registrieren
                    </h3>
                </div>

                <div className='flex justify-center items-center '>
                    <CredForm />
                </div>
                   
            </main>
        </div>
    )
}
