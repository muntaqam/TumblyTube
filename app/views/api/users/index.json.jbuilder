@users.each do |user|
  # current_user already in preloaded state if loggedin
  next if current_user && (user.id == current_user.id)
    json.set! user.id do
      json.extract! user, :id, :username, :color
      json.numVideos user.videos.count
      json.numSubscribers user.subscribers.length
      json.numSubscribees user.subscribees.length
    end
end