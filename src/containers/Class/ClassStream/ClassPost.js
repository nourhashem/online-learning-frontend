import SendIcon from '@mui/icons-material/Send';
import {
	Avatar,
	Box,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import Utils from 'utils';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import PostComment from './PostComment';
import CommentIcon from '@mui/icons-material/Comment';
import { useSelector } from 'react-redux';
import postAPI from 'api/post';
import LinkifyNewTab from 'components/LinkifyNewTab';
import useEventListener from 'hooks/useEventListener';

const ClassPost = (props) => {
	const { data: post, onAddComment } = props;
	const comments = post.comments.sort((a, b) => a.timestamp - b.timestamp);
	const [showComments, setShowComments] = useState(comments.length > 3);
	const [visibleComments, setVisibleComments] = useState([]);
	const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
	const user = useSelector((state) => state.app.user);
	const [comment, setComment] = useState('');
	const userFullName = Utils.getFullName(user);
	const userInitials = Utils.getInitials(userFullName);
	const open = Boolean(menuAnchorEl);

	const handleMenuClick = (event) => {
		setMenuAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setMenuAnchorEl(null);
	};

	const handleSendComment = async () => {
		if (!comment.trim()) return;
		postAPI
			.addComment(comment.trim(), post.uuid)
			.then(() => {
				setComment('');
				onAddComment(post.uuid);
			})
			.catch((error) => {
				setComment('');
			});
	};

	const handleCommentChange = ({ target: { value } }) => {
		setComment(value);
	};

	useEffect(() => {
		const comments = post.comments.sort(
			(a, b) => a.timestamp - b.timestamp
		);
		if (showComments) {
			setVisibleComments(comments.slice(-3));
		} else {
			setVisibleComments(comments);
		}
	}, [showComments, post]);

	useEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleSendComment();
		}
	});

	return (
		<Box className="classPost">
			<Box className="postHeader">
				<Box className="postOwner">
					<Avatar
						sx={{
							backgroundColor: Utils.stringToColor(post.owner),
							backgroundBlendMode: 'darken',
						}}
					>
						{Utils.getInitials(post.owner)}
					</Avatar>
					<Box className="postMetadata">
						<Typography variant="body1">{post.owner}</Typography>
						<Typography variant="body2">
							<Moment
								interval={0}
								format="DD/MM/YYYY hh:mm A"
								className="postTime"
							>
								{post.date}
							</Moment>
						</Typography>
					</Box>
				</Box>
			</Box>
			<Box className="postBody">
				<Typography variant="body1" className="postTitle">
					{post.title}
				</Typography>
				<Typography variant="body2" className="postContent">
					<LinkifyNewTab>{post.body}</LinkifyNewTab>
				</Typography>
			</Box>
			{!!comments.length && (
				<div className="commentsContainer">
					<div className="commentsHeader">
						<CommentIcon className="commentIcon" />
						<Typography
							variant="heading1"
							className="commentsCount"
						>
							{`${comments.length} comments`}
						</Typography>
					</div>
					{showComments && (
						<span
							className="showComments"
							onClick={() => {
								setShowComments(false);
							}}
						>
							Show All {post.comments.length} Comments
						</span>
					)}
					<Box className="postComments">
						{visibleComments.length &&
							visibleComments.map((comment) => (
								<PostComment
									key={comment.uuid}
									data={comment}
								/>
							))}
					</Box>
				</div>
			)}
			<Box className="postFooter">
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
					variant="standard"
					placeholder="write a comment"
					size="small"
					fullWidth
					value={comment}
					onChange={handleCommentChange}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									edge="end"
									color="primary"
									onClick={handleSendComment}
								>
									<SendIcon />
								</IconButton>
							</InputAdornment>
						),
						disableUnderline: true,
					}}
				/>
			</Box>
		</Box>
	);
};

export default ClassPost;
