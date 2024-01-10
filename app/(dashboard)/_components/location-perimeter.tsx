'use client'

import { Infinity, icons } from 'lucide-react';
import Select from 'react-select';

const LocationPerimeter = () => {

    const options = [
        { value : '5', label : '5 km' },
        { value : '10', label : '10 km' },
        { value : '20', label : '20 km' },
        { value : '35', label : '35 km' },
        { value : '50', label : '50 km' },
        { value : 'inf' , label : 'Ꝏ',icons : <Infinity/> }
    ]

    return (
        <div className='w-[300px] flex justify-start'>
             
        
        </div> 
        
     );
}
 
export default LocationPerimeter;