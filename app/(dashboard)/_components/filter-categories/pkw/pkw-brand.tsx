'use client';
import { CarBrands, Inserat, LkwBrand } from "@prisma/client";

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import qs from "query-string";
import { getSearchParamsFunction } from "@/actions/getSearchParams";

import MultipleSelector, { Option } from '@/components/multiple-selector';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import * as React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';





const PkwBrandBar = () => {
  const brand = useSearchParams().getAll("brand");
  const [currentBrand, setCurrentBrand] = useState(brand[0]);
  const [isLoading, setIsLoading] = useState(false);

  const params = getSearchParamsFunction("brand")

  const pathname = usePathname();

  const router = useRouter();

  

  const OPTIONS: Option[] = [

  ];

  for (const brand in CarBrands) {
    if (CarBrands.hasOwnProperty(brand)) {
      OPTIONS.push({
        value: CarBrands[brand],
        label: removeUnderscore(CarBrands[brand])
      });
    }
  }

  const onSubmits = (selectedValue: string) => {
    setCurrentBrand(selectedValue)
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        brand: selectedValue,
        ...params
      }
    }, { skipEmptyString: true, skipNull: true })

    router.push(url)
  }

  React.useEffect(() => {
    console.log(brand)
  })

  function removeUnderscore(inputString: string): string {
    const outputString = inputString.replace(/_/g, ' ');
    return outputString;
  }

  const optionSchema = z.object({
    label: z.string().optional(),
    value: z.string().optional(),
    disable: z.boolean().optional(),
  });

  const FormSchema = z.object({
    brands: z.array(optionSchema).optional(),
  });

  
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    });
 
    const [loading, setLoading] = React.useState(false);

    function onSubmit(data: z.infer<typeof FormSchema>) {
      setLoading(true);

      console.log(data)
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
          <FormField
            control={form.control}
            name="brands"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Marke</FormLabel>
                <FormControl>
                  <MultipleSelector
                    defaultOptions={OPTIONS}
                    placeholder="Filter nach Marke"
                    category="brand"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        Keine Resultate gefunden.
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
        </form>
      </Form>
    );
  };


  export default PkwBrandBar;