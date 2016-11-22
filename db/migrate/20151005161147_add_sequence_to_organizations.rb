class AddSequenceToOrganizations < ActiveRecord::Migration
  def up
    create_sequence("seq_organizations_id", {
                                  :increment => 5,
                                  :start => Rails.configuration.organizations_id_sequence_start_with ,
                                  :cycle => false
                              })
  end

  def down
    execute <<-SQL
    DROP SEQUENCE "seq_organizations_id" CASCADE;
    SQL
  end
end
