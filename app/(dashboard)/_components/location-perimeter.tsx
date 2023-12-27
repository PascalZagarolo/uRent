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
            <Select options={options}
        defaultValue={options[0]} 
        className='flex justify-start mt-2  w-full ml-8 position: fixed'
        />
        
        </div> 
        
     );
}
 
export default LocationPerimeter;