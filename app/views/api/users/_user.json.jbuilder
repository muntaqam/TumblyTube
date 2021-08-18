json.extract! user, :id, :username, :email

json.likedVideos({})
json.likedComments({})
user.likes_dislikes.each do |like|
  if like.likeable_type == "Video"
    json.set! :likedVideos do
      json.set! like.likeable_id do
        json.extract! like, :version, :likeable_id, :likeable_type, :liker_id
      end
    end
  else
    json.set! :likedComments do
      json.set! like.likeable_id do
        json.extract! like, :version, :likeable_id, :likeable_type, :liker_id
      end
    end      
  end
end