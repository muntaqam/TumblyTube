# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# User.create!(
#   username: 'demo',
#   email: 'demo@demouser.com',
#   password: 'demouser123'
# )

User.find_or_create_by!(
  username: 'demo',
  email: 'demo@demouser.com'
) do |user|
  user.password = 'demouser123' # Set the password only if creating a new user
end

