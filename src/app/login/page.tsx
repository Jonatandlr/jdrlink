import Button from '@/components/Button'
import React from 'react'

export default function page() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background">
          <div className="max-w-md w-full space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground">Bienvenido</h1>
              <p className="text-muted-foreground">Inicia sesión en tu cuenta para continuar!</p>
            </div>
            <Button func='signInGoogle' button="red" className='flex w-full justify-center'>
              <ChromeIcon className="mr-2 h-5 w-5" />
              Inicia Sesión con Google
            </Button>
          </div>
        </div>
      )
}
function ChromeIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="21.17" x2="12" y1="8" y2="8" />
        <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
        <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
      </svg>
    )
  }
