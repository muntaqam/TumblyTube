# == Schema Information
#
# Table name: comments
#
#  id                :bigint           not null, primary key
#  body              :text             not null
#  video_id          :integer          not null
#  commenter_id      :integer          not null
#  parent_comment_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class Comment < ApplicationRecord
  
  validates :body, :commenter_id, :video_id, presence: true

  belongs_to :video

  belongs_to :commenter,
    foreign_key: :commenter_id,
    class_name: :User

  belongs_to :parent_comment,
    foreign_key: :parent_comment_id,
    class_name: :Comment,
    optional: true

  has_many :child_comments,
    foreign_key: :parent_comment_id,
    class_name: :Comment

  def num_child_comments
    self.child_comments.count
  end
end
