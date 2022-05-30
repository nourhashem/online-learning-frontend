import { Avatar } from '@mui/material';
import LinkifyNewTab from 'components/LinkifyNewTab';
import React from 'react';
import Moment from 'react-moment';
import Utils from 'utils';
import './style.scss';

const PostComment = ({ data }) => {
  const { owner } = data;
  const fullName = `${owner.firstName} ${owner.lastName}`;
  return (
    <div className="comment">
      <div className="commentAvatar">
        <Avatar
          sx={{
            width: 30,
            height: 30,
            fontSize: '12px',
            backgroundColor: Utils.stringToColor(fullName),
            backgroundBlendMode: 'darken',
          }}
        >
          {Utils.calculateAvatar(fullName)}
        </Avatar>
      </div>
      <div className="commentContent">
        <div className="commentHeader">
          <p className="commentOwner">{fullName}</p>
          <p className="commentDate">
            <Moment unix fromNow interval={10 * 1000}>
              {data.timestamp / 1000}
            </Moment>
          </p>
        </div>
        <div className="commentBody">
          <LinkifyNewTab>{data.comment}</LinkifyNewTab>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
