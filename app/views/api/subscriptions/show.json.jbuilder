# Jbuilder Key Formatting / Converting
# camel_case => camelCase
json.key_format! camelize: :lower
json.deep_format_keys!

json.set! @subscription.subscribee.username do
  json.extract! @subscription.subscribee.id
  json.extract! @subscription.subscribee.username
  json.extract! @subscription.subscribee.color
end