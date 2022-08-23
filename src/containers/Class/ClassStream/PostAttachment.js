import FilePresentIcon from '@mui/icons-material/FilePresent';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';

const PostAttachment = (props) => {
  const { file, onRemove } = props;

  return (
    <Box
      style={{
        border: '1px solid #d0d0d0',
        // gridTemplateColumns: '50px 50px 50px',
        // gridTemplateRows: 'auto',
        width: '260px',
        height: '60px',
        textOverflow: 'ellipsis',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box
        style={{
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FilePresentIcon size="large" sx={{ color: 'd0d0d0' }} />
      </Box>
      <Box
        style={{
          width: '140px',
          padding: '5px',
        }}
      >
        <Typography
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '140px',
            height: '100%',
            whiteSpace: 'nowrap',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          {file.name}
        </Typography>
      </Box>
      <Box
        style={{
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={onRemove} size="large" sx={{ color: 'd0d0d0' }}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PostAttachment;
