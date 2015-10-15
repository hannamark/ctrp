class AddLockVersion < ActiveRecord::Migration
  def change
    tables = ActiveRecord::Base.connection.tables - ["schema_migrations", "versions", "sessions"]
    tables.each do |table|
      add_column table, :lock_version, :integer, default: 0
    end
  end
end
