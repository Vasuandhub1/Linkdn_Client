import React, { useState } from 'react'

import AuthLayout from '../layouts/AuthLayout'
import Register from '../features/auth/components/Register'

function RegisterPage() {
    
    
  return (    
     <AuthLayout>
      <Register/>
    </AuthLayout>
  )
}

export default RegisterPage
