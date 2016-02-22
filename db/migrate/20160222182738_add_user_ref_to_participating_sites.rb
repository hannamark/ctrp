class AddUserRefToParticipatingSites < ActiveRecord::Migration
  def change
    add_reference :participating_sites, :user, index: true
    add_foreign_key :participating_sites, :users
  end
end
