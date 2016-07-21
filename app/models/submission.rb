# == Schema Information
#
# Table name: submissions
#
#  id                   :integer          not null, primary key
#  submission_num       :integer
#  submission_date      :date
#  amendment_date       :date
#  amendment_reason_id  :integer
#  trial_id             :integer
#  created_at           :datetime
#  updated_at           :datetime
#  uuid                 :string(255)
#  lock_version         :integer          default(0)
#  amendment_num        :string(255)
#  submission_type_id   :integer
#  submission_source_id :integer
#  submission_method_id :integer
#  user_id              :integer
#  acknowledge          :string(255)
#  acknowledge_comment  :text
#  acknowledge_date     :date
#  acknowledged_by      :string(255)
#  status               :string
#
# Indexes
#
#  index_submissions_on_amendment_reason_id   (amendment_reason_id)
#  index_submissions_on_submission_method_id  (submission_method_id)
#  index_submissions_on_submission_source_id  (submission_source_id)
#  index_submissions_on_submission_type_id    (submission_type_id)
#  index_submissions_on_trial_id              (trial_id)
#  index_submissions_on_user_id               (user_id)
#

class Submission < TrialBase
  include BasicConcerns

  belongs_to :amendment_reason
  belongs_to :trial
  belongs_to :submission_type
  belongs_to :submission_source
  belongs_to :submission_method
  belongs_to :user
  has_many :milestone_wrappers, -> { order 'milestone_wrappers.id' }
  has_many :processing_status_wrappers, -> { order 'processing_status_wrappers.id' }
  has_many :trial_documents, -> { order 'trial_documents.id' }

  before_create :set_acknowledge_as_no
  before_create :set_submission_status
  before_create :set_expected_abstraction_completion_date

  ## Audit Trail Callbacks
  #after_save :touch_trial      ##Commented out since When a trial updated , amended, or created then only submission create.
  #after_destroy :touch_trial   ##Commented out since A submission will never be destroyed

  def set_acknowledge_as_no
    self.acknowledge = 'No'
  end

  def set_submission_status
    self.status = 'Active'
  end

  def set_expected_abstraction_completion_date
    self.expected_abstraction_completion_date = 10.business_days.from_now
  end

  def business_days_since_submitted
    business_days = 0
    date = DateTime.now.to_date
    date2 = self.created_at.to_date
    while date > date2
      business_days = business_days + 1 unless !date.workday?
      date = date - 1.day
    end
    business_days
  end

  scope :matches, -> (column, value) {
    join_clause  = "LEFT JOIN trials submitted_trial ON submissions.trial_id = submitted_trial.id "
    join_clause += "LEFT JOIN users ON submissions.user_id = users.id "

    if column == 'internal_source_id'
      joins(join_clause).where("submitted_trial.internal_source_id = #{value}")
    elsif column == 'user_id'
      joins(join_clause).where("submissions.user_id = #{value} AND submissions.trial_id is not null")
    end
  }

  scope :matchesImpPro, -> (userId, getAll, protocol_source_id_imp, protocol_source_id_pro) {
    join_clause  = "INNER JOIN trials ON submissions.trial_id = trials.id "
    join_clause += "INNER JOIN users ON submissions.user_id = users.id "
    join_clause += "LEFT JOIN organizations as trial_lead_org ON trial_lead_org.id = trials.lead_org_id "
    join_clause += "LEFT JOIN source_contexts as trial_lead_org_source_context ON trial_lead_org_source_context.id = trial_lead_org.source_context_id "
    join_clause += "LEFT JOIN (
                        select DISTINCT ON (trial_id) onhold_date, trial_id from onholds
                        where offhold_date is null OR offhold_date > now()::date
                        order by trial_id, onhold_date desc
                    ) as trial_onholds ON trials.id = trial_onholds.trial_id "
    join_clause += "LEFT JOIN (
                        with temp as (
                            select milestone_wrappers.id, milestone_wrappers.trial_id, milestone_wrappers.created_at, submission_id, milestones.name, milestones.code
                              from milestone_wrappers inner join milestones
                              on milestones.id = milestone_wrappers.milestone_id
                              order by trial_id desc, id desc
                        )
                        select DISTINCT ON (trial_id)
                            submission_id,
                            current_milestone_name,
                            submission_received_date,
                            validation_processing_start_date,
                            validation_processing_completed_date,
                            submission_acceptance_date,
                            submission_terminated_date,
                            submission_reactivated_date,
                            submission_rejected_date,
                            administrative_processing_start_date,
                            administrative_processing_completed_date,
                            administrative_qc_ready_date,
                            administrative_qc_start_date,
                            administrative_qc_completed_date,
                            scientific_processing_start_date,
                            scientific_processing_completed_date,
                            scientific_qc_ready_date,
                            scientific_qc_start_date,
                            scientific_qc_completed_date,
                            trial_summary_report_ready_date,
                            trial_summary_report_date,
                            submitter_trial_summary_report_feedback_date,
                            initial_abstraction_verified_date,
                            ongoing_abstraction_verified_date,
                            late_rejection_date

                        from (
                        temp
                        left join
                        ( select DISTINCT ON (submission_id) submission_id as id1, created_at as submission_received_date from temp where code = 'SRD'
                         order by submission_id, id desc) as submission_received_milestone
                         on submission_received_milestone.id1 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id2, created_at as validation_processing_start_date from temp where code = 'VPS'
                         order by submission_id, id desc) as validation_processing_started_milestone
                        on validation_processing_started_milestone.id2 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id3, created_at as validation_processing_completed_date from temp where code = 'VPC'
                         order by submission_id, id desc) as validation_processing_completed_milestone
                        on validation_processing_completed_milestone.id3 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id4, created_at as submission_acceptance_date from temp where code = 'SAC'
                         order by submission_id, id desc) as submission_acceptance_milestone
                        on submission_acceptance_milestone.id4 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id5, created_at as submission_terminated_date from temp where code = 'STR'
                         order by submission_id, id desc) as submission_terminated_milestone
                        on submission_terminated_milestone.id5 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id6, created_at as submission_reactivated_date from temp where code = 'SRE'
                         order by submission_id, id desc) as submission_reactivated_milestone
                        on submission_reactivated_milestone.id6 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id7, created_at as submission_rejected_date from temp where code = 'SRJ'
                         order by submission_id, id desc) as submission_rejected_milestone
                        on submission_rejected_milestone.id7 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id8, created_at as administrative_processing_start_date from temp where code = 'APS'
                         order by submission_id, id desc) as administrative_processing_start_milestone
                        on administrative_processing_start_milestone.id8 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id9, created_at as administrative_processing_completed_date from temp where code = 'APC'
                         order by submission_id, id desc) as administrative_processing_completed_milestone
                        on administrative_processing_completed_milestone.id9 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id10, created_at as administrative_qc_ready_date from temp where code = 'RAQ'
                         order by submission_id, id desc) as administrative_qc_ready_milestone
                        on administrative_qc_ready_milestone.id10 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id11, created_at as administrative_qc_start_date from temp where code = 'AQS'
                         order by submission_id, id desc) as administrative_qc_start_milestone
                        on administrative_qc_start_milestone.id11 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id12, created_at as administrative_qc_completed_date from temp where code = 'AQC'
                         order by submission_id, id desc) as administrative_qc_completed_milestone
                        on administrative_qc_completed_milestone.id12 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id13, created_at as scientific_processing_start_date from temp where code = 'SPS'
                         order by submission_id, id desc) as scientific_processing_start_milestone
                        on scientific_processing_start_milestone.id13 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id14, created_at as scientific_processing_completed_date from temp where code = 'SPC'
                         order by submission_id, id desc) as scientific_processing_completed_milestone
                        on scientific_processing_completed_milestone.id14 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id15, created_at as scientific_qc_ready_date from temp where code = 'RSQ'
                         order by submission_id, id desc) as scientific_qc_ready_milestone
                        on scientific_qc_ready_milestone.id15 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id16, created_at as scientific_qc_start_date from temp where code = 'SQS'
                         order by submission_id, id desc) as scientific_qc_start_milestone
                        on scientific_qc_start_milestone.id16 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id17, created_at as scientific_qc_completed_date from temp where code = 'SQC'
                         order by submission_id, id desc) as scientific_qc_completed_milestone
                        on scientific_qc_completed_milestone.id17 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id18, created_at as trial_summary_report_ready_date from temp where code = 'RTS'
                         order by submission_id, id desc) as trial_summary_report_ready_milestone
                        on trial_summary_report_ready_milestone.id18 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id19, created_at as trial_summary_report_date from temp where code = 'TSR'
                         order by submission_id, id desc) as trial_summary_report_milestone
                        on trial_summary_report_milestone.id19 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id20, created_at as submitter_trial_summary_report_feedback_date from temp where code = 'STS'
                         order by submission_id, id desc) as submitter_trial_summary_report_feedback_milestone
                        on submitter_trial_summary_report_feedback_milestone.id20 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id21, created_at as initial_abstraction_verified_date from temp where code = 'IAV'
                         order by submission_id, id desc) as initial_abstraction_verified_milestone
                        on initial_abstraction_verified_milestone.id21 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id22, created_at as ongoing_abstraction_verified_date from temp where code = 'ONG'
                         order by submission_id, id desc) as ongoing_abstraction_verified_milestone
                        on ongoing_abstraction_verified_milestone.id22 = temp.submission_id

                        left join
                        (select DISTINCT ON (submission_id) submission_id as id23, created_at as late_rejection_date from temp where code = 'LRD'
                         order by submission_id, id desc) as late_rejection_milestone
                        on late_rejection_milestone.id23 = temp.submission_id


                        left join
                        (select DISTINCT ON (submission_id) submission_id as id24, name as current_milestone_name, id as mileston_wrapper_id from temp
                         order by submission_id, mileston_wrapper_id desc) as current_milestone
                        on current_milestone.id24 = temp.submission_id

                        )

                        order by trial_id desc, submission_id desc, id desc

                    ) AS latest_milestones
                   ON submissions.id = latest_milestones.submission_id "

    where_clause = "trials.internal_source_id in
                      (#{protocol_source_id_imp}, #{protocol_source_id_pro})
                    AND submissions.trial_id is not null AND submissions.status = 'Active'
                    AND trials.is_rejected IS NOT true "
    if userId
      where_clause += " AND submissions.user_id = #{userId} "
    end

    if getAll
      where_clause += " AND (
        submission_received_date IS NOT null
        OR validation_processing_start_date IS NOT null
        OR validation_processing_completed_date IS NOT null
        OR submission_acceptance_date IS NOT null
        OR submission_reactivated_date IS NOT null
        OR administrative_processing_start_date IS NOT null
        OR administrative_processing_completed_date IS NOT null
        OR administrative_qc_ready_date IS NOT null
        OR administrative_qc_start_date IS NOT null
        OR administrative_qc_completed_date IS NOT null
        OR scientific_processing_start_date IS NOT null
        OR scientific_processing_completed_date IS NOT null
        OR scientific_qc_ready_date IS NOT null
        OR scientific_qc_start_date IS NOT null
        OR scientific_qc_completed_date IS NOT null
        OR trial_summary_report_ready_date IS NOT null
        )"
    end

    joins(join_clause).where(where_clause).select("
       submissions.*,

       trials.nci_id,
       trials.lead_protocol_id,
       trials.official_title,
       trials.start_date,
       trials.primary_comp_date,
       trials.comp_date,
       trials.admin_checkout,
       trials.scientific_checkout,
        onhold_date,

        latest_milestones.*,

       trial_lead_org.id as lead_org_id,
       trial_lead_org.name as lead_org_name,
       (
          CASE
            WHEN trials.internal_source_id =  #{protocol_source_id_imp}
            THEN 'Imported'
            WHEN trials.internal_source_id =  #{protocol_source_id_pro}
              THEN CASE
                WHEN submissions.submission_num = 1
                THEN 'Original'
                WHEN submissions.submission_num > 1
                THEN 'Amendment'
              END
            ELSE ''
          END
       ) as submission_type_label,
       (
          CASE
            WHEN trial_lead_org_source_context.code = 'CTEP'
            THEN
                (
                  SELECT string_agg(organizations.source_id, ',') from organizations
                  INNER JOIN source_contexts ON source_contexts.id = organizations.source_context_id
                  where ctrp_id = trial_lead_org.ctrp_id and source_contexts.code = 'CTEP'
                )
            ELSE ''
          END
       ) as ctep_id
    ")
  }
  scope :matchesImpProPro, -> (userId, protocol_source_id_imp, protocol_source_id_pro) {
    join_clause  = "LEFT JOIN trials submitted_trial ON submissions.trial_id = submitted_trial.id "
    join_clause += "LEFT JOIN users ON submissions.user_id = users.id"

    joins(join_clause).where(" submitted_trial.internal_source_id in (#{protocol_source_id_imp}, #{protocol_source_id_pro})
       and submissions.user_id = #{userId} AND submissions.trial_id is not null")

  }

end
