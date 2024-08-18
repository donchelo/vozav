// src/components/LogoAvatar.tsx
import React from 'react';
import { Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from './assets/logo.png';

const LogoAvatar: React.FC = () => {
  return (
    <RouterLink to="/">
      <Avatar
        src={logo}
        alt="Vozav Logo"
        sx={{
          width: 48,
          height: 48,
          mr: 2,
          img: {
            objectFit: 'cover', // Asegura que la imagen cubra el contenedor
            objectPosition: 'center', // Centra la imagen
            transform: 'scale(5)' // Aplica un zoom de 5x
          }
        }}
      />
    </RouterLink>
  );
};

export default LogoAvatar;
