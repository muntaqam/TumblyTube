@users.each do |user|
  # current_user already in preloaded state if loggedin
  next if current_user && (user.id == current_user.id)
    json.set! user.id do
      json.extract! user, :id, :username, :color
      json.numVideos user.videos.size
      json.numSubscribers user.subscribers.size
      json.numSubscribees user.subscribees.size
    end
end