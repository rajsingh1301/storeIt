import { cn, formatDateTime } from '@/lib/utils';
import { format } from 'path';
import React from 'react'

const FormatedDateTime = ( { date , className} : { date: string; className?: string } ) => {
  return (
    <p className={cn("body-1 text-[#A3B2C7]", className)}>
        {formatDateTime( date )}
    </p>
  )
}

export default FormatedDateTime