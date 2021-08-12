json.childComments comment.child_comments do |child_comment|
  json.extract! child_comment, :id, :commenter_id, :parent_comment_id, :video_id, :body
  json.extract! child_comment.commenter, :username
  json.numChildComments child_comment.num_child_comments
  json.commentedAt time_ago_in_words(child_comment.created_at)
end  

# json.childComments comment.child_comments
json.extract! comment, :id, :commenter_id, :parent_comment_id, :video_id, :body
json.extract! comment.commenter, :username
json.numChildComments comment.num_child_comments
json.commentedAt time_ago_in_words(comment.created_at)