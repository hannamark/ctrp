class AssignSequenceToOrganizations < ActiveRecord::Migration
  def up
    #add sequence to
    execute <<-SQL
  ALTER TABLE organizations ALTER COLUMN id SET DEFAULT nextval('seq_organizations_id'::regclass);
    SQL
  end

  def down
    execute <<-SQL
		ALTER TABLE organizations ALTER COLUMN id SET NOT NULL;
    SQL
  end
end