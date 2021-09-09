json.extract! video, :id, :title, :description, :views
json.numLikes video.num_likes
json.numDislikes video.num_dislikes
json.numComments video.comments.length
json.videoUrl url_for(video.video_file)
json.uploadedAt time_ago_in_words(video.created_at)

json.set! :creator do
  json.extract! video.creator, :id, :username, :color
  json.numSubscribers video.creator.subscribers.length
end