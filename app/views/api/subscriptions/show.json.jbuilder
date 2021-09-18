# Jbuilder Key Formatting / Converting
# camel_case => camelCase
json.key_format! camelize: :lower
json.deep_format_keys!

json.extract! @subscription, :subscriber_id
json.id @subscription.subscribee.id
json.username @subscription.subscribee.username
json.color @subscription.subscribee.color
json.numSubscribers @subscription.subscribee.subscribers.size
json.numVideos @subscription.subscribee.videos.size