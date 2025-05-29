import React, { useState } from 'react'
import Login from '../features/auth/components/Login'
import AuthLayout from '../layouts/AuthLayout'


function LoginPage() {
    
    
  return (    
     <AuthLayout>
      <Login/>
    </AuthLayout>
  )
}

export default LoginPage
