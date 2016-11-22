class AddSequenceToPersons < ActiveRecord::Migration
  def up
    create_sequence("seq_persons_id", {
                                              :increment => 5,
                                              :start => Rails.configuration.persons_id_sequence_start_with ,
                                              :cycle => false
                                          })
  end

  def down
    execute <<-SQL
    DROP SEQUENCE "seq_persons_id" CASCADE;
    SQL
  end
  end