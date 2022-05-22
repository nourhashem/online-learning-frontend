import { Avatar } from '@mui/material';
import React from 'react';
import Utils from 'utils';
import Moment from 'react-moment';
import Linkify from 'react-linkify';
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
          <p className="messageDate">
            <Moment unix fromNow interval={10 * 1000}>
              {data.timestamp / 1000}
            </Moment>
          </p>
        </div>
        <div className="messageBody">
          <Linkify>{data.message}</Linkify>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
