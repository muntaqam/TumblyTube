class Like < ApplicationRecord

  validates :liker_id, uniqueness: { scope: [:likeable_id, :likeable_type] }
  validates :version, inclusion: { in: %w(like dislike), 
    message: "%{value} is not a valid version, must be like or dislike"}

  belongs_to :likeable, polymorphic: true
  
  belongs_to :user,
    foreign_key: :liker_id,
    class_name: :User

  # true if liked comment is child comment
  # flase if parent comment
  def find_parent_comment_id
    comment = Comment.find_by_id(self.likeable_id)
    comment.parent_comment_id
  end
end