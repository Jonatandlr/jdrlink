"use client"

import { SessionProvider } from "next-auth/react"


export default function Provedor({children}){
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}