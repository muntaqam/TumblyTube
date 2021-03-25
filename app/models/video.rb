class Video < ApplicationRecord

  validates :title, :creator_id, presence: true

  belongs_to :creator,
    foreign_key: :creator_id,
    class_name: :User

  has_one_attached :video_file
end
