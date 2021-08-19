class Like < ApplicationRecord

  # validates :liker_id, uniqueness: { scope: [:likeable_id, :likeable_type] }
  validates :version, inclusion: { in: %w(like dislike), 
    message: "%{value} is not a valid version, must be like or dislike"}

  belongs_to :likeable, polymorphic: true
  
  belongs_to :user,
    foreign_key: :liker_id,
    class_name: :User
end