class CreateResearchCategories < ActiveRecord::Migration
  def change
    create_table :research_categories do |t|

      t.static_member_base_columns
      t.timestamps null: false
      t.ctrp_base_columns
    end
  end
end
