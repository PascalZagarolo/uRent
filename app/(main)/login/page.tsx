import Image from 'next/image'
import CredForm from '../_components/login-form'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/utils/auth'
import { redirect } from 'next/navigation';


export default async function Home() {

    const session = await getServerSession(authOptions);

    
    if(session) {
        return redirect('/')
    }
    return (
        <div>
            <main>
                <div className='flex justify-center items-center'>
                    <h3 className='font-semibold text-2xl py-8'>
                        Login
                    </h3>
                </div>

                <div className='flex justify-center items-center'>
                    <CredForm />
                </div>
                    
            </main>
        </div>
    )
}
