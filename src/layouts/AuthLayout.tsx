import React, { ReactNode } from 'react';
import { SceenWrapper } from '../components/component';
import { Typography } from '@mui/material';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <SceenWrapper>
        <div>
              <Typography variant="h2" align="center" gutterBottom>
            Linkdin
          </Typography>
          {children}
        </div>
    </SceenWrapper>
  );
};

export default AuthLayout;
