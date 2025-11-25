// Component to protect actions that require authentication
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/infraestructure/auth/auth-provider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/core/ui/dialog"
import { Button } from "@/core/ui/button"
import { ShoppingCart, User, Lock } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  action?: 'cart' | 'purchase' | 'profile'
  showDialog?: boolean
}

export function AuthGuard({ 
  children, 
  fallback,
  action = 'cart',
  showDialog = true
}: AuthGuardProps) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [showAuthDialog, setShowAuthDialog] = useState(false)

  const actionMessages = {
    cart: {
      title: "Inicia sesión para añadir al carrito",
      description: "Necesitas una cuenta para guardar productos en tu carrito y realizar compras.",
      icon: ShoppingCart
    },
    purchase: {
      title: "Inicia sesión para comprar",
      description: "Para completar tu compra necesitas iniciar sesión o crear una cuenta.",
      icon: ShoppingCart
    },
    profile: {
      title: "Acceso restringido",
      description: "Esta sección requiere que inicies sesión para acceder.",
      icon: User
    }
  }

  const currentAction = actionMessages[action]
  const Icon = currentAction.icon

  const handleAuthRequired = () => {
    if (showDialog) {
      setShowAuthDialog(true)
    } else {
      router.push('/auth')
    }
  }

  const handleGoToAuth = () => {
    setShowAuthDialog(false)
    router.push('/auth')
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <>
      {/* Render fallback or protected action trigger */}
      {fallback ? (
        <div onClick={handleAuthRequired}>
          {fallback}
        </div>
      ) : (
        <div onClick={handleAuthRequired}>
          {children}
        </div>
      )}

      {/* Auth Required Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <Lock className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <DialogTitle className="text-xl font-semibold">
              {currentAction.title}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mt-2">
              {currentAction.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 mt-6">
            <Button
              onClick={handleGoToAuth}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700"
            >
              <User className="mr-2 h-4 w-4" />
              Iniciar Sesión
            </Button>
            
            <Button
              onClick={() => setShowAuthDialog(false)}
              variant="outline"
              className="w-full h-11"
            >
              Continuar viendo productos
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              ¿No tienes cuenta?{' '}
              <button 
                onClick={handleGoToAuth}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Regístrate gratis
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Hook for easy authentication checking
export function useAuthGuard() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const requireAuth = (callback: () => void, redirectToAuth = true) => {
    if (isAuthenticated) {
      callback()
    } else if (redirectToAuth) {
      router.push('/auth')
    }
    return isAuthenticated
  }

  return {
    isAuthenticated,
    requireAuth
  }
}