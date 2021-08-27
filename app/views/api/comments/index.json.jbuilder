@comments.each do |comment|
  if comment.parent_comment_id.nil?
    json.set! comment.id do
      json.partial! "api/comments/comment", comment: comment
    end
  end
end