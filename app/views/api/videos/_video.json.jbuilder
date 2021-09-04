json.extract! video, :id, :creator_id, :title, :description, :views
json.extract! video.creator, :username
json.numLikes video.num_likes
json.numDislikes video.num_dislikes
json.numComments video.comments.length
json.uploadedAt time_ago_in_words(video.created_at)
json.videoUrl url_for(video.video_file)
