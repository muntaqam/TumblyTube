class Subscription < ApplicationRecord

  validates :subscribee_id, :subscribee_id, presence: true
  validates :subscriber_id, uniqueness: { scope: :subscribee_id}
  validates :subscribee_id, uniqueness: { scope: :subscriber_id}

  # subscriber is creating the subscription
  # subscribee is getting the subscription
  belongs_to :subscriber, class_name: "User"
  belongs_to :subscribee, class_name: "User"
end
