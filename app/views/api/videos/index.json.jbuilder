json.array! @videos do |video|
  json.extract! video, :id, :uploader_id, :title, :description
  json.videoUrl url_for(video.video_file)
end