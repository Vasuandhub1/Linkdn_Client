import React from 'react';
import { SceenWrapper } from '../components/component';
import { Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <SceenWrapper>
        <div>
              <Typography variant="h2" align="center" gutterBottom>
            LinkedIn
          </Typography>
          {children}
        </div>
    </SceenWrapper>
  );
};

export default AuthLayout;
