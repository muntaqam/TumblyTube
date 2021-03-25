class RemoveVeiwColumnFromVideos < ActiveRecord::Migration[5.2]
  def change
    remove_column :videos, :view_count
  end
end
