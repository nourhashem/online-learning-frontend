import {
  Avatar,
  Card,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import Utils from 'utils';
import ChatMessage from './ChatMessage';
import './style.scss';
import useEventListener from 'hooks/useEventListener';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import messagesAPI from 'api/message';
import classroomActions from 'store/actions/classroom';
import Socket from 'socket';
import events from 'socket/events';

const ClassChat = () => {
  const [message, setMessage] = useState('');
  const { classroomUuid } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const messages = useSelector(
    (state) => state.classroom.messages[classroomUuid]
  );
  const userFullName = Utils.getFullName(user);
  const userInitials = Utils.getInitials(userFullName);
  const offsetRef = useRef(0);
  const [scroll, setScroll] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const containerRef = useRef();

  const scrollToBottom = (smooth) => {
    containerRef.current &&
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
  };

  useEffect(() => {
    const handler = (data) => {
      if (scroll) scrollToBottom(true);
    };
    Socket.on(events.MESSAGE, handler);
    return () => {
      Socket.off(events.MESSAGE, handler);
    };
  }, [scroll]);

  useEffect(() => {
    messagesAPI
      .getAll(classroomUuid, offsetRef.current)
      .then(({ messages }) => {
        console.log({ messages });
        offsetRef.current = offsetRef.current + messages.length;
        scrollToBottom(false);
        setTimeout(() => {
          scrollToBottom(false);
        }, 200);
        dispatch({
          type: classroomActions.addMessages,
          classroomUuid,
          messages,
        });
      });
  }, [classroomUuid, dispatch]);

  useEffect(() => {
    if (loadMore) {
      const oldHeight = containerRef.current.scrollHeight;
      messagesAPI
        .getAll(classroomUuid, offsetRef.current)
        .then(({ messages }) => {
          console.log({ messages });
          offsetRef.current = offsetRef.current + messages.length;
          if (scroll) scrollToBottom(true);
          else {
            setTimeout(() => {
              containerRef.current.scrollTop =
                containerRef.current.scrollHeight - oldHeight;
            }, 0);
          }
          dispatch({
            type: classroomActions.addMessages,
            classroomUuid,
            messages,
          });
        });
    }
  }, [loadMore, classroomUuid, dispatch, scroll]);

  useEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  });

  useEventListener(
    'scroll',
    () => {
      const scroll =
        containerRef.current &&
        containerRef.current.scrollHeight ===
          containerRef.current.scrollTop + containerRef.current.clientHeight;
      setScroll(scroll);
      const loadMore =
        containerRef.current && containerRef.current.scrollTop === 0;
      setLoadMore(loadMore);
    },
    containerRef.current
  );

  const sendMessage = () => {
    if (!message.trim()) return;
    const messageData = {
      message: message.trim(),
      owner: `${user.firstName} ${user.lastName}`,
      classroomUuid,
    };
    Socket.sendMessage(messageData);
    setMessage('');
  };

  const handleMessageInput = ({ target: { value } }) => {
    setMessage(value);
  };

  return (
    <Box className="classChat">
      <Box>
        <Card className="chatContainer" elevation={0}>
          <Box className="messagesContainer" ref={containerRef}>
            {messages.length === 0 && (
              <div className="noMessages">No messages yet.</div>
            )}
            {!!messages.length &&
              messages.map((message) => (
                <ChatMessage key={message.uuid} data={message} />
              ))}
          </Box>
          <Box className="chatInput">
            <Avatar
              sx={{
                width: 30,
                height: 30,
                fontSize: '12px',
                backgroundColor: Utils.stringToColor(userFullName),
                backgroundBlendMode: 'darken',
              }}
            >
              {userInitials}
            </Avatar>
            <TextField
              autoFocus
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
