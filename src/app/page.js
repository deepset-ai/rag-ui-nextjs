// src/app/page.js

'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { addReferences } from '@/utils/ragUtils';

const HomePage = () => {
  const [inputText, setInputText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [referenceText, setReferenceText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Make an API call with the input text
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputText }),
      });
      
      const data = await res.json();
      console.log('Response Data:', data);
      const { answer, file, meta } = data.response.results[0].answers[0];

      if (meta && typeof meta === 'object' && !Array.isArray(meta) && Object.keys(meta).length > 0) {
        const { referenceList, answerWithReferences } = addReferences(answer, meta);
        setAnswerText(answerWithReferences);
        setReferenceText(referenceList);
      } else {
        setAnswerText(answer);
        setReferenceText("No references available.")
      }

    } catch (error) {
      console.error('Error:', error);
      setAnswerText('An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingMessage = () => (
    <Box display="flex" alignItems="center">
      <CircularProgress size={20} style={{ marginRight: '10px' }} />
      <Typography>Generating an answer...</Typography>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', mt: 4, p: 4, width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', mr: 4, width: '30%' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Welcome!
        </Typography>
        <TextField
          label="Type your question here"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? '...' : 'Submit'}
        </Button>
      </Box>
      <Box
        sx={{
          width: '50%',
          height: '650px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          p: 2,
          borderRadius: '4px',
          mr: 2
        }}
      >
        {isLoading ? <LoadingMessage /> : <ReactMarkdown>{answerText}</ReactMarkdown>}
      </Box>
      <Box
        sx={{
          width: '25%',
          height: '650px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          p: 2,
          borderRadius: '4px',
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          References:
        </Typography>
        <ReactMarkdown>{referenceText}</ReactMarkdown>
      </Box>
    </Box>
  );
};

export default HomePage;