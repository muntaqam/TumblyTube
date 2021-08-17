json.extract! user, :id, :username, :email

json.likedVideos({})
json.set! :likedVideos do
  user.likes_dislikes.each do |like|
    if like.likeable_type == "Video"
      json.set! like.likeable_id do
        json.extract! like, :version, :likeable_id, :likeable_type, :liker_id
      end
    end
  end
end

json.likedComments({})
json.set! :likedComments do
  user.likes_dislikes.each do |like|
   if like.likeable_type == "Comment"
      json.set! like.likeable_id do
        json.extract! like, :version, :likeable_id, :likeable_type, :liker_id
      end
    end
  end
end

json.likesDislikes user.likes_dislikes