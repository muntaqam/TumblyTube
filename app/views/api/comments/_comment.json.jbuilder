# Jbuilder Key Formatting / Converting
# camel_case => camelCase
json.key_format! camelize: :lower
json.deep_format_keys!

json.childComments({})
json.set! :childComments do
  comment.child_comments.each do |child_comment|
    json.set! child_comment.id do
      json.extract! child_comment, :id, :commenter_id, :parent_comment_id, :video_id, :body, :num_child_comments, :num_likes, :num_dislikes
      json.set! :commenter do
        json.extract! comment.commenter, :username, :color
      end
      json.commentedAt time_ago_in_words(child_comment.created_at)
    end
  end
end

json.extract! comment, :id, :parent_comment_id, :video_id, :commenter_id,  :body, :num_child_comments, :num_likes, :num_dislikes

json.set! :commenter do
  json.extract! comment.commenter, :username, :color
end

json.commentedAt time_ago_in_words(comment.created_at)