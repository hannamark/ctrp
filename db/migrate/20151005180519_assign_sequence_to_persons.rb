class AssignSequenceToPersons < ActiveRecord::Migration
  def up
    #add sequence to
    execute <<-SQL
  ALTER TABLE people ALTER COLUMN id SET DEFAULT nextval('seq_persons_id'::regclass);
    SQL
  end

  def down
    execute <<-SQL
		ALTER TABLE people ALTER COLUMN id SET NOT NULL;
    SQL
  end
end