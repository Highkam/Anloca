// Component to protect actions that require authentication
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/core/auth/auth-context'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/core/ui/dialog"
import { Button } from "@/core/ui/button"
import { ShoppingCart, User, Lock, Settings, CreditCard } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  action?: 'cart' | 'purchase' | 'profile' | 'settings' | 'general'
  showDialog?: boolean
  redirectTo?: string
  onAuthRequired?: () => void
  blockAccess?: boolean // Nueva prop para bloquear completamente el acceso
}

export function AuthGuard({ 
  children, 
  fallback,
  action = 'general',
  showDialog = true,
  redirectTo = '/login',
  onAuthRequired,
  blockAccess = false
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
      icon: CreditCard
    },
    profile: {
      title: "Acceso a perfil restringido",
      description: "Esta sección requiere que inicies sesión para acceder a tu perfil.",
      icon: User
    },
    settings: {
      title: "Acceso a configuración restringido",
      description: "Necesitas iniciar sesión para acceder a la configuración de tu cuenta.",
      icon: Settings
    },
    general: {
      title: "Inicia sesión para continuar",
      description: "Esta acción requiere que inicies sesión o crees una cuenta.",
      icon: Lock
    }
  }

  const currentAction = actionMessages[action]
  const Icon = currentAction.icon

  // Auto-mostrar diálogo cuando blockAccess está activado y no está autenticado
  useEffect(() => {
    if (blockAccess && !isAuthenticated) {
      setShowAuthDialog(true)
    }
  }, [blockAccess, isAuthenticated])

  const handleAuthRequired = () => {
    if (onAuthRequired) {
      onAuthRequired()
      return
    }

    if (showDialog) {
      setShowAuthDialog(true)
    } else {
      router.push(redirectTo)
    }
  }

  const handleGoToAuth = () => {
    setShowAuthDialog(false)
    router.push(redirectTo)
  }

  // Si el usuario está autenticado, mostrar el contenido
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Si blockAccess está activado, NO mostrar contenido, solo el diálogo
  if (blockAccess) {
    return (
      <Dialog open={showAuthDialog} onOpenChange={(open) => {
        setShowAuthDialog(open)
        // Si se cierra el diálogo sin autenticarse, redirigir a home
        if (!open) {
          router.push('/')
        }
      }}>
        <DialogContent className="sm:max-w-md border-0 rounded-[24px] bg-white shadow-xl">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#A564D3]/20 to-[#B66EE8]/20 shadow-lg">
                <Icon className="h-8 w-8 text-[#A564D3]" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-800 mb-2 text-center">
              {currentAction.title}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 text-base leading-relaxed">
              {currentAction.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-8">
            <Button
              onClick={handleGoToAuth}
              className="w-full h-14 bg-gradient-to-r from-[#A564D3] to-[#B66EE8] hover:from-[#B66EE8] hover:to-[#C879FF] text-white rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <User className="mr-3 h-5 w-5" />
              Iniciar Sesión
            </Button>
            
            <Button
              onClick={() => {
                setShowAuthDialog(false)
                router.push('/')
              }}
              variant="outline"
              className="w-full h-12 border-2 border-gray-200 hover:bg-gray-50 rounded-xl text-gray-600 font-medium transition-all duration-200"
            >
              Volver al inicio
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              ¿No tienes cuenta?{' '}
              <button 
                onClick={handleGoToAuth}
                className="text-[#A564D3] hover:text-[#B66EE8] font-semibold transition-colors duration-200 hover:underline"
              >
                Regístrate gratis
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      {/* Render fallback or protected action trigger */}
      {fallback ? (
        <div onClick={handleAuthRequired} className="cursor-pointer">
          {fallback}
        </div>
      ) : (
        <div onClick={handleAuthRequired} className="cursor-pointer">
          {children}
        </div>
      )}

      {/* Auth Required Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md border-0 rounded-[24px] bg-white shadow-xl">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#A564D3]/20 to-[#B66EE8]/20 shadow-lg">
                <Icon className="h-8 w-8 text-[#A564D3]" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-800 mb-2 text-center">
              {currentAction.title}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 text-base leading-relaxed">
              {currentAction.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-8">
            <Button
              onClick={handleGoToAuth}
              className="w-full h-14 bg-gradient-to-r from-[#A564D3] to-[#B66EE8] hover:from-[#B66EE8] hover:to-[#C879FF] text-white rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <User className="mr-3 h-5 w-5" />
              Iniciar Sesión
            </Button>
            
            <Button
              onClick={() => setShowAuthDialog(false)}
              variant="outline"
              className="w-full h-12 border-2 border-gray-200 hover:bg-gray-50 rounded-xl text-gray-600 font-medium transition-all duration-200"
            >
              Continuar navegando
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              ¿No tienes cuenta?{' '}
              <button 
                onClick={handleGoToAuth}
                className="text-[#A564D3] hover:text-[#B66EE8] font-semibold transition-colors duration-200 hover:underline"
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

  const requireAuth = (
    callback: () => void, 
    options?: { 
      redirectToAuth?: boolean
      redirectTo?: string 
    }
  ) => {
    const { redirectToAuth = true, redirectTo = '/login' } = options || {}
    
    if (isAuthenticated) {
      callback()
    } else if (redirectToAuth) {
      router.push(redirectTo)
    }
    return isAuthenticated
  }

  const protectRoute = (routePath: string) => {
    if (!isAuthenticated) {
      router.push('/login')
      return false
    }
    router.push(routePath)
    return true
  }

  return {
    isAuthenticated,
    requireAuth,
    protectRoute
  }
}