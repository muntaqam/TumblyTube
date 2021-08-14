class AddNullConstraintsInLikes < ActiveRecord::Migration[5.2]
  def change
    change_column_null :likes, "likeable_id", false
    change_column_null :likes, "likeable_type", false
  end
end
