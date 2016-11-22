class DeviseCreateUsers < ActiveRecord::Migration
  def change
    create_table(:users) do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: "", :limit => 255
      t.string :username,           null: false, default: "", :limit => 255
      t.string :encrypted_password, null: false, default: "", :limit => 255

      ## Add type for Single-table-Inheritance
      t.string :type 
      
      ## Add provider and uid for Omniauth users
      t.string :provider,  :limit => 255
      t.string :uid,  :limit => 255

      ## Add Role
      t.string :role,  :limit => 255

      ## Recoverable
      t.string   :reset_password_token, :limit => 255
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string     :current_sign_in_ip, :limit => 255
      t.string     :last_sign_in_ip, :limit => 255

      ## Lockable
      t.integer  :failed_attempts, default: 0, null: false # Only if lock strategy is :failed_attempts
      t.string   :unlock_token, :limit => 255 # Only if unlock strategy is :email or :both
      t.datetime :locked_at


      t.timestamps
    end

    add_index :users, :email,                unique: true
    add_index :users, :reset_password_token, unique: true
    add_index :users, :unlock_token,         unique: true
    add_index :users, :username,             unique: true

  end
end
