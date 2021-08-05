json.extract! comment, :id, :commenter_id, :video_id, :parent_comment_id, :body
json.extract! comment.commenter, :username
json.commentedAt time_ago_in_words(comment.created_at)