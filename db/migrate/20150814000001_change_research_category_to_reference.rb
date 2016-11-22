class ChangeResearchCategoryToReference < ActiveRecord::Migration
  def change
    remove_column :trials, :research_category, :string
    add_reference :trials, :research_category, index: true
    add_foreign_key :trials, :research_categories
  end
end
