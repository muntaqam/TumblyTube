class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.string :title, null: false
      t.text :description
      t.integer :creator_id, null: false, foreign_key: true
      t.integer :view_count

      t.timestamps
    end
    add_index :videos, :title
    add_index :videos, :creator_id
  end
end
