# Jbuilder Key Formatting / Converting
# camel_case => camelCase
json.key_format! camelize: :lower
json.deep_format_keys!

json.extract! @like, :id, :liker_id, :likeable_id, :likeable_type, :version

if @like.likeable_type == "Comment"
  json.parent_comment_id @like.find_parent_comment_id
end