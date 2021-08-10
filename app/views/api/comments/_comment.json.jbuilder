json.extract! comment, :id, :commenter_id, :video_id, :body
json.childComments comment.child_comments
json.numChildComments comment.num_child_comments
json.extract! comment.commenter, :username
json.commentedAt time_ago_in_words(comment.created_at)