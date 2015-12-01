require 'rubygems'
require 'roo'

class DataImport < ActiveRecord::Base

  def self.delete_trial_data
    TrialStatusWrapper.delete_all
    MilestoneWrapper.delete_all
    Submission.delete_all
    ProcessingStatusWrapper.delete_all
    OtherId.delete_all
    Trial.delete_all
  end

  def self.import_trials
    begin
      trial_spreadsheet = Roo::Excel.new(Rails.root.join('db', 'ctrp-dw-trials-random-2014.xls'))
      trial_spreadsheet.default_sheet = trial_spreadsheet.sheets.first
      ((trial_spreadsheet.first_row+1)..trial_spreadsheet.last_row).each do |row|
        trial = Trial.new
        trial.official_title = trial_spreadsheet.cell(row,'BP')
        nci_id = trial_spreadsheet.cell(row,'BL')
        trial_db_exists = Trial.find_by_nci_id(nci_id)
        if trial_db_exists
          next
        end
        trial.nci_id = nci_id
        trial.phase = Phase.find_by_name(trial_spreadsheet.cell(row,'BS'))
        primary_purpose = trial_spreadsheet.cell(row,'BY')
        unless primary_purpose.blank?
          primary_purpose.gsub! "_", " "
          trial.primary_purpose = PrimaryPurpose.where("lower(name) = ?", primary_purpose.downcase).first
        end
        secondary_purpose = trial_spreadsheet.cell(row,'BZ')
        unless secondary_purpose.blank?
          trial.secondary_purpose = SecondaryPurpose.where("lower(name) = ?", secondary_purpose.downcase).first
        end
=begin
        research_category = trial_spreadsheet.cell(row,'DO')
        unless research_category.blank?
          research_category.gsub! "_", " "
          trial.research_category = ResearchCategory.where("lower(name) = ?", research_category.downcase).first
        end
=end
        study_source = trial_spreadsheet.cell(row,'CZ')
        unless study_source.blank?
          study_source.gsub! "_", " "
          study_source = "EXTERNALLY PEER-REVIEWED" if study_source == "EXTERNALLY PEER REVIEWED"
          trial.study_source = StudySource.where("lower(name) = ?", study_source.downcase).first
        end
        current_trail_status = trial_spreadsheet.cell(row,'T')
        current_trail_status_date = trial_spreadsheet.cell(row,'U')
        unless current_trail_status.blank?
          trial_status = TrialStatus.where("lower(name) = ?", current_trail_status.downcase).first
          tsw = TrialStatusWrapper.new
          tsw.trial = trial
          tsw.trial_status = trial_status
          tsw.status_date = current_trail_status_date
          trial.trial_status_wrappers << tsw
        end
        processing_status = trial_spreadsheet.cell(row,'CC')
        processing_status_date = trial_spreadsheet.cell(row,'CD')
        unless processing_status.blank?
          processing_status = ProcessingStatus.where("lower(name) = ?", processing_status.downcase).first
          #puts "processing_status = #{processing_status.inspect}"
          psw = ProcessingStatusWrapper.new
          psw.trial = trial
          psw.processing_status = processing_status
          #psw.status_date = processing_status_date
          psw.status_date = Time.now
          trial.processing_status_wrappers << psw
        end
        rc= trial_spreadsheet.cell(row,'DO')
        if rc.present?
          research_category = ResearchCategory.where("lower(name) = ?", rc.downcase).first
          trial.research_category = research_category if research_category.present?
        end
        #other_ids
        ctep_id = trial_spreadsheet.cell(row,'R')
        if ctep_id.present?
          other_id_record = OtherId.new
          other_id_record.protocol_id = ctep_id
          other_id_record.protocol_id_origin = ProtocolIdOrigin.find_by_code("CTEP")
          other_id_record.trial = trial
          trial.other_ids << other_id_record
        end
        dcp_id = trial_spreadsheet.cell(row,'Y')
        if dcp_id.present?
          other_id_record = OtherId.new
          other_id_record.protocol_id = dcp_id
          other_id_record.protocol_id_origin = ProtocolIdOrigin.find_by_code("DCP")
          other_id_record.trial = trial
          trial.other_ids << other_id_record
        end
        ccr_id = trial_spreadsheet.cell(row,'DS')
        if ccr_id.present?
          other_id_record = OtherId.new
          other_id_record.protocol_id = ccr_id
          other_id_record.protocol_id_origin = ProtocolIdOrigin.find_by_code("CCR")
          other_id_record.trial = trial
          trial.other_ids << other_id_record
        end
        nct_id = trial_spreadsheet.cell(row,'BM')
        if nct_id.present?
          other_id_record = OtherId.new
          other_id_record.protocol_id = nct_id
          other_id_record.protocol_id_origin = ProtocolIdOrigin.find_by_code("NCT")
          other_id_record.trial = trial
          trial.other_ids << other_id_record
        end
        #Regulatory information
        trial.intervention_indicator = trial_spreadsheet.cell(row,'AM') == "YES" ? "Yes" : "No"
        trial.sec801_indicator = trial_spreadsheet.cell(row,'CN') == "YES" ? "Yes" : "No"
        trial.data_monitor_indicator = trial_spreadsheet.cell(row,'V') == "YES" ? "Yes" : "No"
        # Sponsor
        trial.sponsor = Organization.all[rand(0..13)]
        resp_party = trial_spreadsheet.cell(row,'CJ')
        responsible_party = ResponsibleParty.find_by_code(resp_party)
        if resp_party.present? && responsible_party.blank?
          puts "missed resonsible party = #{resp_party} "
        else
          trial.responsible_party = responsible_party
        end
        # randomly assign the rest of the data
        trial.lead_protocol_id = "CTRP_01_" + rand(0..10000).to_s
        trial.lead_org = Organization.all[rand(0..13)]
        trial.pilot = "Yes"
        trial.pi = Person.all[rand(0..11)]
        trial.investigator = Person.all[rand(0..11)]
        trial.save!
        #puts "trial = #{trial.inspect}"
      end
    rescue Exception => e
      puts "Exception thrown while reading Trial spreadsheet #{e.inspect}"
    end
  end

  def self.import_milestones
    missed_milestones = []
    spreadsheet = Roo::Excel.new(Rails.root.join('db', 'ctrp-dw-milestones_for_20_sample_trials_in_prod.xls'))
    spreadsheet.default_sheet = spreadsheet.sheets.first
    ((spreadsheet.first_row+1)..spreadsheet.last_row).each do |row|
      t = spreadsheet.cell(row,'A')
      trial = Trial.find_by_nci_id(t)
      unless trial.nil?
        submission_num = spreadsheet.cell(row,'E')
        current_submission = Submission.find_by_trial_id_and_submission_num(trial.id, submission_num)
        if current_submission.blank?
          current_submission = Submission.new
          current_submission.submission_num = submission_num
          trial.submissions << current_submission
          trial.save!
        end
        current_milestone = spreadsheet.cell(row,'B')
        unless current_milestone.nil?
          milestone = Milestone.where("lower(name) = ?", current_milestone.downcase).first
          if milestone.nil?
            missed_milestones << current_milestone
            next
          end
          cmw = MilestoneWrapper.new
          cmw.trial = trial
          cmw.milestone = milestone
          cmw.submission = current_submission
          trial.milestone_wrappers << cmw
          trial.save!
        end
      end
    end
    puts "List of missed milestones = #{missed_milestones.uniq.inspect}" if missed_milestones.count() > 0
  end
end
