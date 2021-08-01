json.extract! video, :id, :creator_id, :title, :description
json.extract! video.creator, :username
json.uploadedAt time_ago_in_words(video.created_at)
json.videoUrl url_for(video.video_file)
