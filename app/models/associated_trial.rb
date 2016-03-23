# == Schema Information
#
# Table name: associated_trials
#
#  id                 :integer          not null, primary key
#  trial_identifier   :string(255)
#  identifier_type_id :integer
#  trial_id           :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  uuid               :string(255)
#  lock_version       :integer          default(0)
#  official_title     :text
#
# Indexes
#
#  index_associated_trials_on_identifier_type_id  (identifier_type_id)
#  index_associated_trials_on_trial_id            (trial_id)
#

class AssociatedTrial < ActiveRecord::Base
  include BasicConcerns

  belongs_to :identifier_type
  belongs_to :trial
  after_save :create_reverse

  scope :search_trial_associations, -> (trial_identifier, identifier_type_id, trial_id) {
    where(trial_identifier: trial_identifier, identifier_type_id: identifier_type_id, trial_id: trial_id)
    # where(trial_identifier: trial_identifier)
  }

  def create_reverse

    @parent_trial = Trial.find_by_nci_id(self.trial_identifier) # reverse child to this parent
    @child_trial = Trial.find_by_id(self.trial_id) # reverse parent to this child


    if (!@parent_trial.nil? and !@child_trial.nil?)
      Rails.logger.info "parent_trial nci_id: #{@parent_trial.nci_id}"
      Rails.logger.info "child_trial.id: #{@child_trial.id}"

      identifier_type_id = IdentifierType.find_by_name('CTRP').id
      isExisted = AssociatedTrial.search_trial_associations(@child_trial.nci_id, identifier_type_id, @parent_trial.id).count > 0

      if (!isExisted)
        Rails.logger.info "creating a reverse trial association"
        Rails.logger.info "parent_trial.id: #{@parent_trial.id}, child_trial.nci_id: #{@child_trial.nci_id}"
        at = AssociatedTrial.new(trial_identifier: @child_trial.nci_id, identifier_type_id: identifier_type_id, trial_id: @parent_trial.id, official_title: @child_trial.official_title)
        at.save!
      else
        Rails.logger.error "reverse trial already exists!"
      end

    end

  end




end
