import { Avatar } from '@mui/material';
import React from 'react';
import Utils from 'utils';
import './style.scss';

const ChatMessage = ({ data }) => {
  return (
    <div className="message">
      <div className="messageAvatar">
        <Avatar
          sx={{
            width: 30,
            height: 30,
            fontSize: '12px',
            backgroundColor: Utils.stringToColor(data.owner),
            backgroundBlendMode: 'darken',
          }}
        >
          {Utils.calculateAvatar(data.owner)}
        </Avatar>
      </div>
      <div className="messageContent">
        <div className="messageHeader">
          <p className="messageOwner">{data.owner}</p>
          <p className="messageDate">{data.date}</p>
        </div>
        <div className="messageBody">{data.message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
