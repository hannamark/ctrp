class AssignSequenceToFamilies < ActiveRecord::Migration
  def up
    #add sequence to
    execute <<-SQL
  ALTER TABLE families ALTER COLUMN id SET DEFAULT nextval('seq_families_id'::regclass);
    SQL
  end

  def down
    execute <<-SQL
		ALTER TABLE families ALTER COLUMN id SET NOT NULL;
    SQL
  end
end
