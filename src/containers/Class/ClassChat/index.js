import {
  Avatar,
  Card,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Utils from 'utils';
import ChatMessage from './ChatMessage';
import './style.scss';
import useEventListener from 'hooks/useEventListener';

const ClassChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  useEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  });
  useEffect(() => {
    setMessages([
      {
        message: 'Hello',
        date: new Date().toISOString(),
        owner: 'Nour Hachem',
      },
      {
        message: 'Hello',
        date: new Date().toISOString(),
        owner: 'Nour Hachem',
      },
      {
        message: 'Hello',
        date: new Date().toISOString(),
        owner: 'Nour Hachem',
      },
    ]);
    // setMessages([]);
  }, []);

  const sendMessage = () => {
    const newMessages = [
      ...messages,
      {
        message,
        date: new Date().toISOString(),
        owner: 'Nour Hashem',
      },
    ];
    setMessages(newMessages);
    setMessage('');
  };

  const handleMessageInput = ({ target: { value } }) => {
    setMessage(value);
  };

  return (
    <Box className="classChat">
      <Box>
        <Card className="chatContainer" elevation={0}>
          <Box className="messagesContainer">
            {messages.length === 0 && (
              <div className="noMessages">No messages yet.</div>
            )}
            {!!messages.length &&
              messages.map((message) => <ChatMessage data={message} />)}
          </Box>
          <Box className="chatInput">
            <Avatar
              sx={{
                width: 30,
                height: 30,
                fontSize: '12px',
                backgroundColor: Utils.stringToColor('Nour Hachem'),
                backgroundBlendMode: 'darken',
              }}
            >
              NH
            </Avatar>
            <TextField
              autoComplete="off"
              variant="standard"
              placeholder="Chat with classroom"
              size="small"
              onChange={handleMessageInput}
              value={message}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      color="primary"
                      onClick={sendMessage}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
            />
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default ClassChat;
