require 'rubygems'
require 'roo'

class DataImport < ActiveRecord::Base

  def self.delete_trial_data
    TrialStatusWrapper.delete_all
    MilestoneWrapper.delete_all
    ProcessingStatusWrapper.delete_all
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
        research_category = trial_spreadsheet.cell(row,'DO')
        unless research_category.blank?
          research_category.gsub! "_", " "
          trial.research_category = ResearchCategory.where("lower(name) = ?", research_category.downcase).first
        end
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
        Rails.logger.info "spreadsheet processing_status = #{processing_status.inspect}"
        processing_status_date = trial_spreadsheet.cell(row,'CD')
        unless processing_status.blank?
          processing_status = ProcessingStatus.where("lower(name) = ?", processing_status.downcase).first
          puts "processing_status = #{processing_status.inspect}"
          psw = ProcessingStatusWrapper.new
          psw.trial = trial
          psw.processing_status = processing_status
          #psw.status_date = processing_status_date
          psw.status_date = Time.now
          trial.processing_status_wrappers << psw
        end
        # randomly assign the rest of the data
        trial.lead_protocol_id = "CTRP_01_" + rand(0..10000).to_s
        trial.sponsor = Organization.all[rand(0..13)]
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
    spreadsheet = Roo::Excel.new(Rails.root.join('db', 'ctrp-dw-milestones_for_20_sample_trials_in_prod.xls'))
    spreadsheet.default_sheet = spreadsheet.sheets.first
    ((spreadsheet.first_row+1)..spreadsheet.last_row).each do |row|
      t = spreadsheet.cell(row,'A')
      trial = Trial.find_by_nci_id(t)
      unless trial.nil?
        current_milestone = spreadsheet.cell(row,'B')
        submission_num = spreadsheet.cell(row,'E')
        current_submission = Submission.find_by_trial_id_and_submission_num(trial.id, submission_num)
        if current_submission.blank?
          current_submission = Submission.new
          current_submission.submission_num = submission_num
          trial.submissions << current_submission
          trial.save!
        end
        unless current_milestone.nil?
          current_milestone = Milestone.where("lower(name) = ?", current_milestone.downcase).first
          cmw = MilestoneWrapper.new
          cmw.trial = trial
          cmw.milestone = current_milestone
          cmw.submission = current_submission
          trial.milestone_wrappers << cmw
          trial.save!
        end
      end
    end
  end
end
