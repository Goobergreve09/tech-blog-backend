const router = require("express").Router();
const { Comment } = require("../../models");


router.post("/", async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const commentToDelete = await Comment.findByPk(req.params.id);
  
      if (!commentToDelete) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Check if the user trying to delete the comment is the one who created it
      if (commentToDelete.user_id !== req.session.user_id) {
        return res.status(403).json({ message: 'You are not authorized to delete this comment' });
      }
  
      // Delete the comment
      await commentToDelete.destroy();
  
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;