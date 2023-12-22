import Image from 'next/image'
import CredForm from '../_components/login-form'

export default function Home() {
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
