import { Button } from '@/components/ui/button';
import { ArrowRightCircle, X } from 'lucide-react';
import { object } from 'zod';
import BecomeCustomer from '../_components/become-customer';
const HomePage = () => {
    return (
        <div className="w-full">

            <div className="curved">
                <div>
                    <div className='flex justify-center gap-x-8 p-8'>
                        <div className='flex justify-center'>
                            <img className='h-[280px] w-[400px] rounded-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border border-gray-200' src='agreement.png' />
                        </div>
                        <div>
                            <h3 className='flex justify-start text-4xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                                <div>
                                    uRent
                                </div>
                            </h3>
                            <p className='writing'> Mir tut alles weh :D </p>
                            <div className='text-justify flex flex-wrap content-between mt-8 leading-relaxed w-[400px]'>
                                Ey (K-K-Kingsake)
                                Ey, Pasha, ey, ja, ey (YungGlizzy)
                                Shababs botten, grüne Augen, braune Locken
                                Tn's rocken, halbe Kiste, wenn wir shoppen
                                Shababs botten, grüne Augen, braune Locken
                                Tn's rocken, halbe Kiste, wenn wir shoppen
                            </div>
                            <div className='mt-4'>
                                <BecomeCustomer/>
                            </div>
                        </div>



                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#fff" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,
                267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,
                320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                    </path></svg>
            </div>
            <div>

            </div>


        </div>




    );
}

export default HomePage;