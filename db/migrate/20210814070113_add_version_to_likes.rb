class AddVersionToLikes < ActiveRecord::Migration[5.2]
  def change
    add_column :likes, :version, :string, null: false
  end
end
