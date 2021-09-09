# Jbuilder Key Formatting / Converting
# camel_case => camelCase
json.key_format! camelize: :lower
json.deep_format_keys!

json.extract! @subscription, :subscriber_id, :subscribee_id
json.username @subscription.subscribee.username
json.color @subscription.subscribee.color