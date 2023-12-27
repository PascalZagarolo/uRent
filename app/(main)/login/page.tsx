import Image from 'next/image'
import CredForm from '../_components/login-form'
import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation';


export default async function Home() {



    
   
    return (
        <div>
            <main>
                <div className='flex justify-center items-center'>
                    <h3 className='font-semibold text-2xl py-8'>
                        Anmelden
                    </h3>
                </div>

                <div className='flex justify-center items-center'>
                    <CredForm />
                </div>
                    
            </main>
        </div>
    )
}
