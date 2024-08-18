// src/components/QuestionManager.tsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Typography 
} from '@mui/material';
import { db } from '../services/firebase'; // Asegúrate de que la ruta es correcta
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  updateDoc, 
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';  // Asegúrate de que la ruta es correcta
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Question {
  id: string;
  text: string;
  userEmail: string;
  createdAt: Timestamp;
}

const QuestionManager: React.FC = () => {
  const { user } = useAuth();  // Obtener el usuario autenticado
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'questions'));
        const questionsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          userEmail: doc.data().userEmail,
          createdAt: doc.data().createdAt,
        }));
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAddQuestion = async () => {
    if (newQuestion.trim() && user?.email) {
      try {
        if (editMode && currentQuestionId) {
          const questionDoc = doc(db, 'questions', currentQuestionId);
          await updateDoc(questionDoc, { text: newQuestion });
          setQuestions((prevQuestions) =>
            prevQuestions.map((q) => (q.id === currentQuestionId ? { ...q, text: newQuestion } : q))
          );
          setEditMode(false);
          setCurrentQuestionId(null);
        } else {
          const docRef = await addDoc(collection(db, 'questions'), { 
            text: newQuestion, 
            userEmail: user.email,  // Guardar el correo del usuario
            createdAt: serverTimestamp(),  // Guardar la fecha de creación automática
          });
          const newQuestionData: Question = {
            id: docRef.id,
            text: newQuestion,
            userEmail: user.email,
            createdAt: new Timestamp(0, 0)
          };
          setQuestions([...questions, newQuestionData]);
        }
        setNewQuestion('');
      } catch (error) {
        console.error("Error adding question: ", error);
        alert("Hubo un error al guardar la pregunta. Por favor, inténtalo de nuevo.");
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
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (error) {
      console.error("Error deleting question: ", error);
    }
  };

  return (
    <Box sx={{ maxWidth: '400px', margin: 'auto', padding: 4 }}>
      <Typography variant="h6" gutterBottom>
        Preguntas ({user?.email})
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Nueva pregunta"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleAddQuestion}
      >
        {editMode ? 'Editar Pregunta' : 'Añadir Pregunta'}
      </Button>

      <List sx={{ mt: 4 }}>
        {questions.map((question) => (
          <ListItem
            key={question.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditQuestion(question.id, question.text)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteQuestion(question.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText 
              primary={question.text} 
              secondary={`Asked by: ${question.userEmail} on ${question.createdAt?.toDate().toLocaleString()}`}  // Mostrar correo y fecha
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default QuestionManager;
