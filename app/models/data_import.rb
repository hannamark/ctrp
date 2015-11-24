require 'rubygems'
require 'roo'

class DataImport < ActiveRecord::Base

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
        current_milestone = trial_spreadsheet.cell(row,'S')
        unless current_milestone.blank?
          current_milestone = Milestone.where("lower(name) = ?", current_milestone.downcase).first
          cmw = MilestoneWrapper.new
          cmw.trial = trial
          cmw.milestone = current_milestone
          trial.milestone_wrappers << cmw
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
      Rails.logger.info "Exception thrown while reading Trial spreadsheet #{e.inspect}"
    end

  end

end