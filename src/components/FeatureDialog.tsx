import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface FeatureDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  detailedContent: string; // Incluido en la interfaz
  Icon: SvgIconComponent;
}

const FeatureDialog: React.FC<FeatureDialogProps> = ({ open, onClose, title, content, detailedContent, Icon }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Icon sx={{ fontSize: 40, marginRight: 2 }} />
          {title}
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          {content}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {detailedContent}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeatureDialog;
