class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :instance_uuid, :limit => 255
      t.text :content
      t.string :username, :limit => 255
      t.string :fullname, :limit => 255
      t.string :org, :limit => 255

      t.timestamps null: false
      t.ctrp_base_columns
    end
  end
end
