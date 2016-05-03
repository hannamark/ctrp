class CreateMailLogs < ActiveRecord::Migration
  def change
    create_table :mail_logs do |t|
      t.string :from
      t.string :to
      t.string :cc
      t.string :bcc
      t.string :subject
      t.text :body
      t.string :email_template_name
      t.integer :email_template_id
      t.string :result

      t.timestamps null: false
    end
  end
end
