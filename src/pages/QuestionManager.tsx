import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Typography,
  Paper,
  Snackbar,
  Container,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { db } from '../services/firebase';
import { 
  collection, 
  addDoc, 
  query,
  orderBy,
  onSnapshot,
  deleteDoc, 
  updateDoc, 
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface Question {
  id: string;
  text: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[1],
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
}));

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const formatDate = (date: Date): string => {
  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

const QuestionManager: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const questionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Question[];
      setQuestions(questionsData);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddQuestion = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newQuestion.trim() && user) {
      try {
        const now = serverTimestamp();
        if (editMode && currentQuestionId) {
          const questionDoc = doc(db, 'questions', currentQuestionId);
          await updateDoc(questionDoc, { 
            text: newQuestion,
            updatedAt: now
          });
          setEditMode(false);
          setCurrentQuestionId(null);
          setSnackbar({ open: true, message: 'Pregunta actualizada con éxito', severity: 'success' });
        } else {
          await addDoc(collection(db, 'questions'), { 
            text: newQuestion, 
            userId: user.uid,
            createdAt: now,
            updatedAt: now
          });
          setSnackbar({ open: true, message: 'Pregunta añadida con éxito', severity: 'success' });
        }
        setNewQuestion('');
      } catch (error) {
        console.error("Error managing question: ", error);
        setSnackbar({ open: true, message: 'Error al gestionar la pregunta', severity: 'error' });
      }
    }
  };

  const handleEditQuestion = (id: string, text: string) => {
    setEditMode(true);
    setCurrentQuestionId(id);
    setNewQuestion(text);
  };

  const handleDeleteQuestion = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'questions', id));
      setSnackbar({ open: true, message: 'Pregunta eliminada con éxito', severity: 'success' });
    } catch (error) {
      console.error("Error deleting question: ", error);
      setSnackbar({ open: true, message: 'Error al eliminar la pregunta', severity: 'error' });
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Preguntas
        </Typography>
        
        <StyledPaper elevation={3}>
          <StyledForm onSubmit={handleAddQuestion}>
            <TextField
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              label="Nueva pregunta"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!user || !newQuestion.trim()}
              endIcon={<SendIcon />}
              fullWidth={isMobile}
            >
              {editMode ? 'Editar' : 'Enviar'}
            </Button>
          </StyledForm>
        </StyledPaper>

        <List>
          {questions.map((question) => (
            <StyledListItem
              key={question.id}
              disablePadding
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        {question.text}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {question.updatedAt && question.updatedAt !== question.createdAt
                          ? `Editado: ${formatDate(question.updatedAt.toDate())}`
                          : formatDate(question.createdAt.toDate())}
                      </Typography>
                    }
                  />
                </Grid>
                {user && user.uid === question.userId && (
                  <Grid item>
                    <IconButton size="small" onClick={() => handleEditQuestion(question.id, question.text)} color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteQuestion(question.id)} color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </StyledListItem>
          ))}
        </List>

        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default QuestionManager;