@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :username
    json.numVideos user.videos.count
  end
end