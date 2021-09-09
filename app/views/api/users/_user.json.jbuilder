# Jbuilder Key Formatting / Converting
# camel_case => camelCase
json.key_format! camelize: :lower
json.deep_format_keys!

json.extract! user, :id, :username, :email, :color
json.numVideos user.videos.count
json.numSubscribers user.subscribers.length
json.numSubscribees user.subscribees.length

json.subscribees({})
user.subscribees.each do |subscribee|
  json.set! :subscribees do
    json.set! subscribee.username do
      json.extract! subscribee, :id, :username, :color
    end
  end
end

json.likedVideos({})
json.likedComments({})
user.likes_dislikes.each do |like|
  if like.likeable_type == "Video"
    json.set! :likedVideos do
      json.set! like.likeable_id do
        json.extract! like, :id, :liker_id, :likeable_id, :likeable_type, :version
      end
    end
  end

  if like.likeable_type == "Comment"
    json.set! :likedComments do
      json.set! like.likeable_id do
        json.extract! like, :id, :liker_id, :likeable_id, :likeable_type, :version
      end
    end      
  end
end