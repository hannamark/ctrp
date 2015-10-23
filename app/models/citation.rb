# == Schema Information
#
# Table name: citations
#
#  id                :integer          not null, primary key
#  pub_med_id        :string(255)
#  description       :text
#  results_reference :string(255)
#  trial_id          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  lock_version      :integer          default(0)
#
# Indexes
#
#  index_citations_on_trial_id  (trial_id)
#

class Citation < ActiveRecord::Base
end
