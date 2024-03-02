'use client';

import { cn } from "@/lib/utils";
import clsx from "clsx";
import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  required,
  errors,
  type = 'text',
  disabled,
}) => {

  const [newType, setNewType] = useState(type);
  

  const onPasswordShow = () => {
     setNewType("text");
     
  }

  const onPasswordRelease = () => {
    setTimeout(() => {
      setNewType("password");
    }, 500)
  }

  return ( 
    <div className="">
      <label 
        htmlFor={id} 
        className="
          block 
          text-sm 
          font-bold 
          leading-6 
          text-gray-900
          dark:text-gray-100/90
        "
      >
        {label}
      </label>
      <div className={cn("mt-2", type === "password" ? "flex w-full" : "")}>
        <input
          id={id}
          type={newType}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(`
            form-input
            block 
            w-full 
            rounded-md 
            border-0 
            py-1.5 
            text-gray-900 
            shadow-sm 
            
            p-2
            dark:text-gray-100/80
             
            placeholder:text-gray-400 
            
            
            sm:text-sm 
            sm:leading-6`,
            errors[id] && 'focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default'
          )}
        />
        {type === 'password' && (
          
            <div className="items-center flex ml-2">
              <Eye className="h-4 w-4" onMouseDown={onPasswordShow} onMouseUp={onPasswordRelease}/>
            </div>
          
        )}
      </div>
    </div>
   );
}
 
export default Input;