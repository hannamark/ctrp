class AddSequenceToFamilies < ActiveRecord::Migration
  def up
    create_sequence("seq_families_id", {
                                        :increment => 5,
                                        :start => Rails.configuration.families_id_sequence_start_with ,
                                        :cycle => false
                                    })
  end

  def down
    execute <<-SQL
    DROP SEQUENCE "seq_families_id" CASCADE;
    SQL
  end
end
