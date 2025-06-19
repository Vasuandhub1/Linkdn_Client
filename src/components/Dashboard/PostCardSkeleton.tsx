
import { Box, Skeleton, IconButton, Divider } from '@mui/material';

const PostCardSkeleton = () => {
  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: 'background.paper',
        marginBottom: 3,
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={2}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box>
            <Skeleton variant="text" width={120} height={20} />
            <Skeleton variant="text" width={80} height={15} />
          </Box>
        </Box>
        <IconButton disabled>
          <Skeleton variant="circular" width={24} height={24} />
        </IconButton>
      </Box>

      {/* Description */}
      <Box mt={2}>
        <Skeleton variant="text" width="90%" height={20} />
        <Skeleton variant="text" width="60%" height={20} />
      </Box>

      {/* Image Carousel */}
      <Box mt={2}>
        <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
      </Box>

      {/* Actions */}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Skeleton variant="rounded" width={70} height={32} />
        <Skeleton variant="rounded" width={90} height={32} />
        <Skeleton variant="rounded" width={80} height={32} />
        <Skeleton variant="rounded" width={70} height={32} />
      </Box>

      {/* Comments (if toggled) */}
      <Box mt={2}>
        {[1, 2].map((_, idx) => (
          <Box key={idx} mt={1}>
            <Divider />
            <Box display="flex" alignItems="center" gap={1} p={1}>
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="text" width="70%" height={20} />
            </Box>
          </Box>
        ))}

        {/* Comment Input */}
        <Box mt={1} display="flex" alignItems="center" gap={1}>
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" width="100%" height={30} />
          <Skeleton variant="circular" width={30} height={30} />
        </Box>
      </Box>
    </Box>
  );
};

export default PostCardSkeleton;
