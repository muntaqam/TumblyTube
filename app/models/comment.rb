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
end
