json.extract! video, :id, :creator_id, :title, :description, :created_at
json.extract! video.creator, :username
json.videoUrl url_for(video.video_file)
