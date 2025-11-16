# Anloca - Conexión Backend y Frontend

## 🎯 Resumen de Cambios

He configurado correctamente la conexión entre tu frontend Next.js y los microservicios backend de NestJS. Aquí están los cambios implementados:

## 🔧 Cambios Realizados

### 1. **Configuración de Endpoints** ✅
- **Archivo**: `services/frontend/src/core/config/constants.ts`
- **Cambios**: Configuración de URLs específicas para cada microservicio
- **URLs configuradas**:
  - Auth Service: `http://localhost:3001`
  - Cart Service: `http://localhost:3002` 
  - Catalog Service: `http://localhost:3000`

### 2. **Servicios API del Frontend** ✅
- **Auth Service**: `services/frontend/src/infraestructure/auth/auth.service.ts`
- **Cart Service**: `services/frontend/src/infraestructure/cart/cart.service.ts`
- **Catalog Service**: `services/frontend/src/infraestructure/catalog/catalog.service.ts`
- **Endpoints actualizados**: `services/frontend/src/infraestructure/api/endpoints.ts`

### 3. **Variables de Entorno** ✅
- **Archivo**: `services/frontend/.env.local`
- **Template**: `services/frontend/.env.example`

### 4. **Gestión de Sesiones** ✅
- **Auth Context**: `services/frontend/src/core/auth/auth-context.tsx`
- **Cart Hook**: `services/frontend/src/core/hooks/use-cart.ts`
- **Products Hook**: `services/frontend/src/core/hooks/use-products.ts`

### 5. **Componentes Actualizados** ✅
- **Nuevo componente**: `services/frontend/src/components/ShoppingPage.tsx`
- **Page.tsx simplificado**: Ahora usa los servicios reales

### 6. **Configuración CORS** ✅
- **Auth Service**: `services/auth-service/src/main.ts`
- **Cart Service**: `services/cart-service/src/main.ts`
- **Catalog Service**: `services/catalog-service/src/main.ts`

## 🚀 Cómo Probar la Conexión

### 1. Instalar Dependencias del Frontend

```bash
cd services/frontend
npm install
# o si usas pnpm
pnpm install
```

### 2. Verificar Variables de Entorno

Asegúrate de que el archivo `.env.local` esté en `services/frontend/`:

```env
NEXT_PUBLIC_AUTH_URL=http://localhost:3001
NEXT_PUBLIC_CART_URL=http://localhost:3002
NEXT_PUBLIC_CATALOG_URL=http://localhost:3000
```

### 3. Levantar los Servicios Backend

En terminales separadas:

```bash
# Terminal 1 - Auth Service
cd services/auth-service
npm run start:dev

# Terminal 2 - Cart Service  
cd services/cart-service
npm run start:dev

# Terminal 3 - Catalog Service
cd services/catalog-service
npm run start:dev
```

### 4. Levantar el Frontend

```bash
# Terminal 4 - Frontend
cd services/frontend
npm run dev
```

### 5. Verificar las Conexiones

**URLs de verificación:**

- **Frontend**: http://localhost:3000
- **Auth Service API**: http://localhost:3001/api/docs
- **Cart Service API**: http://localhost:3002/api/docs  
- **Catalog Service API**: http://localhost:3000/api/docs

## 🔍 Funcionalidades Implementadas

### **Autenticación**
- Login/logout con tokens de sesión
- Gestión automática de tokens en localStorage
- Verificación de sesión automática

### **Gestión de Productos**
- Carga de productos desde Catalog Service
- Búsqueda de productos
- Visualización de productos en tarjetas

### **Carrito de Compras**
- Creación automática de carrito para usuarios autenticados
- Agregar/eliminar productos del carrito
- Cálculo automático de totales
- Sincronización con Cart Service

### **Interfaz de Usuario**
- Componente de login modal
- Sidebar de carrito deslizable
- Notificaciones toast para feedback
- Manejo de estados de carga y errores

## 🔧 Arquitectura de la Conexión

```
Frontend (Next.js - Port 3001)
    ↓
    ├── Auth Context (Gestión de sesiones)
    ├── Custom Hooks (useCart, useProducts)
    └── Services
        ├── Auth Service → Auth Microservice (Port 3001)
        ├── Cart Service → Cart Microservice (Port 3002)
        └── Catalog Service → Catalog Microservice (Port 3000)
```

## 📝 Notas Importantes

### **CORS Configurado**
Todos los servicios backend ahora tienen CORS habilitado para el frontend

### **Headers de Sesión**
Los requests usan el header `x-session-token` para autenticación

### **Manejo de Errores**
Implementado manejo de errores en todos los servicios con feedback visual

### **Estado Reactivo**
Los cambios en el carrito y productos se reflejan automáticamente en la UI

## 🐛 Solución de Problemas

### **Error de CORS**
Si ves errores de CORS, asegúrate de que los servicios backend estén corriendo con la configuración actualizada.

### **Error de Conexión**
Verifica que las URLs en `.env.local` coincidan con los puertos donde corren los servicios.

### **Productos No Cargan**
Asegúrate de que el Catalog Service tenga productos seedeados en la base de datos.

### **Carrito No Funciona**
Verifica que estés logueado, ya que el carrito requiere autenticación.

## 🎯 Próximos Pasos

1. **Implementar register/signup** en el Auth Service y frontend
2. **Agregar gestión de órdenes** (Orders Service)
3. **Implementar upload de imágenes** para productos
4. **Agregar paginación** en la lista de productos
5. **Implementar filtros avanzados** de productos

¡Tu aplicación ahora está completamente conectada entre el frontend y backend! 🎉