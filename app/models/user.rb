# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  
  validates :username, :email, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  after_initialize :ensure_session_token
  attr_reader :password

  scope :filter_by_search, -> (search) { where("username like ?", "%#{search}%") }

  has_many :comments,
    foreign_key: :commenter_id,
    class_name: :Comment,
    dependent: :destroy

  has_many :videos,
    foreign_key: :creator_id,
    class_name: :Video,
    dependent: :destroy

  has_many :likes,
    foreign_key: :liker_id,
    class_name: :Like,
    dependent: :destroy

  has_many :liked_videos,
    through: :likes,
    source: :likeable,
    source_type: :Video

  def self.search(filter)
    if filter
      users = self.where("LOWER(username) like ?", "%#{filter}%")
      if users
        users
      else
        self.all
      end
    else
      self.all
    end
  end

  def likes_dislikes
    self.likes
  end

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    if user && user.is_password?(password)
      return user
    else
      return nil
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    password_obj = BCrypt::Password.new(self.password_digest)
    password_obj.is_password?(password)
  end

  def reset_session_token!
    generate_unique_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  private
  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def generate_unique_session_token
    self.session_token = new_session_token
    while User.find_by_session_token(self.session_token)
      self.session_token = new_session_token
    end
    self.session_token
  end
end
