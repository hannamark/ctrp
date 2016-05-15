
class CreateTrialSummaryReportService

  def initialize(params)
    @trial_id = params[:trial_id]
    @trial = Trial.find_by_id(@trial_id)

  end


  def generate_tsr_in_rtf
    #Fonts
    fonts = [RTF::Font.new(RTF::Font::ROMAN, 'Times New Roman'),
             RTF::Font.new(RTF::Font::MODERN, 'Courier')]

    #Colours
  @foreground_th_text_color        =     RTF::Colour.new(138,21,21)
  @green                           =     RTF::Colour.new(0,255,0)
  @grey       =                          RTF::Colour.new(210,210,210)
  @light_red  =                          RTF::Colour.new(255,153,153)
  @red_shade  =                          RTF::Colour.new(180,0,0)


    #Styles
    styles = {}
    styles['PS_HEADING']              = RTF::ParagraphStyle.new
    styles['PS_NORMAL']               = RTF::ParagraphStyle.new
    styles['PS_NORMAL'].justification = RTF::ParagraphStyle::FULL_JUSTIFY
    styles['PS_INDENTED']             = RTF::ParagraphStyle.new
    styles['PS_INDENTED'].left_indent = 300
    styles['PS_TITLE']                = RTF::ParagraphStyle.new
    styles['PS_TITLE'].space_before   = 100
    styles['PS_TITLE'].space_after    = 200
    styles['CS_HEADING']              = RTF::CharacterStyle.new
    styles['CS_HEADING'].bold         = true
    styles['CS_HEADING'].font_size    = 36
    styles['CS_CODE']                 = RTF::CharacterStyle.new
    styles['CS_CODE'].font            = fonts[1]
    styles['CS_CODE'].font_size       = 16

    style1 = RTF::CharacterStyle.new
    style1.font = RTF::Font.new(RTF::Font::MODERN, 'Calibri')
    style1.foreground =@foreground_th_text_color
    style1.underline = true

     style     = RTF::DocumentStyle.new
     style.paper = RTF::Paper::A4
     style.left_margin =3000
     style.right_margin =3000
     style.bottom_margin =3000
     style.top_margin = 3000


  @document = RTF::Document.new(RTF::Font.new(RTF::Font::MODERN, 'Helvetica'),style)



   @document.paragraph(styles['PS_HEADING']) do |p1|
      p1.apply(styles['CS_HEADING']) << 'Trial Summary Report'
    end

   @document.paragraph(styles['PS_NORMAL']) do |p1|
      p1 << 'This document is automatically generated using the RTF Ruby '
      p1 << 'library. This serves as an example of what can be achieved '
      p1 << 'in document creation via the library. The source code that '
      p1 << 'was used to generate it is listed below...'
    end



    @document.page_break 
    @document.page_break

    array =@document.table(2, 2)
    array.border_width =30
    array[0].shading_colour = @green

    array1 =@document.table(1,1)
    array1[0][0].background(@grey) << "Hellow1111"



   @document.paragraph(styles['PS_NORMAL']) do |p2|
      p2 << 'This document is automatically generated using the RTF Ruby '
      p2 << 'library. This serves as an example of what can be achieved '
      p2 << 'in document creation via the library. The source code that '
      p2 << 'was used to generate it is listed below...'
    end


    array1 =@document.table(2,2,2000,4000,2000)
    array1[0][0].background(@grey) << "Hellow1111"

    #array1.add_row();

    table    =@document.table(3, 3, 2000, 4000, 2000)
    table.border_width = 5
    table[0][0] << 'Cell 0,0'
    table[0][1].top_border_width = 10
    table[0][1] << 'This is a little preamble text for '
    table[0][1].apply(styles['CS_HEADING']) << 'Cell 0,1'
    table[0][1].line_break
    table[0][1] << ' to help in examining how formatting is working.'
    table[0][2] << 'Cell 0,2'
    table[1][0] << 'Cell 1,0'
    table[1][1] << 'Cell 1,1'
    table[1][2] << 'Cell 1,2'
    table[2][0] << 'Cell 2,0'
    table[2][1] << 'Cell 2,1'
    table[2][2] << 'Cell 2,2'



   @document.paragraph(styles['PS_TITLE']) do |p1|
      p1.italic do |p2|
        p2.bold << 'Listing 1:'
        p2 << ' Generator program code listing.'
      end
    end

   @document.paragraph(styles['PS_NORMAL']) do |p1|
      p1 << "This example shows the creation of a new document and the "
      p1 << "of textual content to it. The example also provides examples "
      p1 << "of using block scope to delimit style scope (lines 40-51)."
    end


   @document.page_break


    #array1 = document.table(1,1,2000,4000,2000)
    #array1[0][0].background(@grey) << "Trial Identification"



    trial_identification_table    =@document.table(3, 3, 2000, 4000, 2000)
    #trial_identification_table.add()

=begin
    table.border_width = 5
    table[0][0] << 'Cell 0,0'
    table[0][1].top_border_width = 10
    table[0][1] << 'This is a little preamble text for '
    table[0][1].apply(styles['CS_HEADING']) << 'Cell 0,1'
    table[0][1].line_break
    table[0][1] << ' to help in examining how formatting is working.'
    table[0][2] << 'Cell 0,2'
    table[1][0] << 'Cell 1,0'
    table[1][1] << 'Cell 1,1'
    table[1][2] << 'Cell 1,2'
    table[2][0] << 'Cell 2,0'
    table[2][1] << 'Cell 2,1'
    table[2][2] << 'Cell 2,2'
=end


    ###### TSR Report start #######################
    ###############################################
    ###############################################
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break

    #row RTF::TableRowNode()
    array =@document.table(4, 1)
    array.border_width =30
    array[0].shading_colour = @grey
    array[0][0].foreground(@foreground_th_text_color) << "Official Title"
    array[1][0] << @trial.official_title

    array[2][0].foreground(@foreground_th_text_color) << "Acronym"
    array[2].shading_colour = @light_red
    array[3][0] << @trial.acronym




   @document.page_break
   @document.page_break
   @document.page_break
   @document.page_break


    generate_trial_identification_table
    @document.page_break
    generate_general_trial_details
    @document.page_break



     @document.page_break
     @document.page_break
     @document.page_break
     @document.page_break

      @regulatory_info_table = RTF::TableNode.new(nil, 3, 3, 100, 100)
      Hash h = Hash.new
      oversight_authorities =@trial.oversight_authorities


      create_a_table_row(@grey,@foreground_th_text_color,"Regulatory Information")


      create_a_table_row(@light_red, nil,"Oversight Authority")



      row = RTF::TableRowNode.new(@regulatory_info_table, 2)
      row[0] << "Country"
      row[1] << "Organization"
     @document << row.to_rtf

      oversight_authorities.each do |e|
          row = RTF::TableRowNode.new(@regulatory_info_table, 2)
          row[0] << e.country
          row[1] << e.organization
         @document << row.to_rtf
      end

      Hash h = Hash.new
      h.store("FDA Regulated Intervention?", @trial.intervention_indicator)
      h.store("Section 801?",@trial.sec801_indicator)
      h.store("DMC Appointed?",@trial.data_monitor_indicator)
      h.store("IND/IDE Study?",@trial.ind_ide_question)

      h.each do |k,v|
          row = RTF::TableRowNode.new(@regulatory_info_table, 2)
          row[0] << k
          row[1] << v
         @document << row.to_rtf
      end

      array1 =@document.table(1,1)
      array1[0].shading_colour = @light_red
      array1[0][0] << "IND/IDE"

      array1 =@document.table(1,5)
      array1[0].shading_colour = @grey
      array1[0][0] << "Type"
      array1[0][1] << "Grantor"
      array1[0][2] << "Number"
      array1[0][3] << "Holder Type"
      #array1[0][4] << "Holder"

      ind_ides = @trial.ind_ides

      ind_ides.each do |ind_ide|
          row = RTF::TableRowNode.new(@regulatory_info_table, 4)
          row[0] << ind_ide.ind_ide_type
          row[1] << ind_ide.grantor
          row[2] << ind_ide.ind_ide_number
          row[3] << HolderType.find_by_id(ind_ide.holder_type_id).name
         @document << row.to_rtf
      end

      array1 =@document.table(1,1)
      array1[0].shading_colour = @light_red
      array1[0][0] << "Human Subject Safety"

      Hash h = Hash.new
      @trial.board_approval_status_id.nil? ? board_approval_status = "N/A" : board_approval_status = BoardApprovalStatus.find_by_id(@trial.board_approval_status_id).name
      h.store("Board Approval Status", board_approval_status)
      h.store("Board Approval Number",@trial.board_approval_num)
      h.store("Board",@trial.board_name)
      org = Organization.find_by_id(@trial.board_affiliation_id)

      org ? address = "N/A" : address = org.address
      org ? phone = "N/A" : phone = org.phone


      h.store("Address",address)
      h.store("Phone", phone)

      h.each do |k,v|
          row = RTF::TableRowNode.new(@regulatory_info_table, 2)
          row[0] << k
          row[1] << v
         @document << row.to_rtf
      end


     @document.page_break
     @document.page_break
     @document.page_break
     @document.page_break





      array1 =@document.table(1,1)
      array1[0].shading_colour = @light_red
      array1[0][0] << "Trial Design"



      Hash h = Hash.new
      h.store("Type", board_approval_status)
      @trial.primary_purpose_id.nil? ? primary_purpose="N/A" : primary_purpose = PrimaryPurpose.find_by_id(@trial.primary_purpose_id).name
      @trial.secondary_purpose_id.nil? ? secondary_purpose="N/A" : secondary_purpose = PrimaryPurpose.find_by_id(@trial.secondary_purpose_id).name
      @trial.phase_id.nil? ? phase="N/A" : phase = Phase.find_by_id(@trial.phase_id).name
      @trial.intervention_model_id.nil? ? interventional_model="N/A" : interventional_model = InterventionModel.find_by_id(@trial.intervention_model_id).name
      @trial.masking_id.nil? ? masking="N/A" : masking = Masking.find_by_id(@trial.intervention_model_id).name
      @trial.allocation_id.nil? ? allocation="N/A" : allocation = Allocation.find_by_id(@trial.allocation_id).name
      @trial.study_classification_id.nil? ? classification="N/A" : classification = StudyClassification.find_by_id(@trial.study_classification_id).name

      h.store("Primary Purpose",primary_purpose)
      h.store("Secondary Purpose",secondary_purpose)
      h.store("Phase",phase)
      h.store("Intervention Model",interventional_model)
      h.store("Number of Arms",@trial.num_of_arms)
      h.store("Masking",masking)
      h.store("Allocation",allocation)
      h.store("Classification",classification)
      h.store("Target Enrollment",@trial.target_enrollment)

      h.each do |k,v|
          row = RTF::TableRowNode.new(@regulatory_info_table, 2)
          row[0] << k
          row[1] << v
         @document << row.to_rtf
      end

     @document.page_break
     @document.page_break
     @document.page_break
     @document.page_break



    #And the file name will be "TSR_""CTRP Trial ID""_""Current Date YYYY-MM-DD""-
    # "Current Time HHMM(24hr)""_""Current Submission Type (O for original and A for amendment""_""Amendment Number (for amendments)"<examples>

    temp_file = Tempfile.new(['Sample2',".rtf"])
    temp_file << @document.to_rtf

    today_date = Date.today()
    file_name = "TSR_" + @trial.nci_id + "_" + today_date.strftime("%d-%h-%Y").to_s+".rtf"

    trial_document_params = {:file => temp_file, :document_type =>"Trial Summary Report", :file_name => file_name,:trial_id => @trial_id}
    td = TrialDocument.new(trial_document_params)
    td.save!

   return td.id

  end

    def create_a_table_row(shading_color, forground_color,text)
      array1 =@document.table(1,1)
      array1[0].shading_colour = shading_color if shading_color
      forground_color.nil? ? array1[0][0] << text : array1[0][0].foreground(forground_color) << text
    end

  def generate_trial_identification_table
    create_a_table_row(@grey,@foreground_th_text_color,"Trial Identification")
    @trial_identification_table = RTF::TableNode.new(nil, 3, 3, 100, 100)

    Hash h = Hash.new
    h.store("NCI Trial Identifier",@trial.nci_id)
    h.store("Lead Organization Identifier",@trial.lead_protocol_id)
    h.each do |k,v|
      row = RTF::TableRowNode.new(@trial_identification_table, 2)
      row[0] << k
      row[1] << v
      @document << row.to_rtf
    end
    other_ids = @trial.other_ids.reorder(:protocol_id)
    other_ids.each do |oid|
      row = RTF::TableRowNode.new(@trial_identification_table, 2)
      pid = ProtocolIdOrigin.find_by_id(oid.protocol_id_origin_id)
      row[1] << oid.protocol_id
      row[0] << pid.name
      @document << row.to_rtf
    end
  end

  def generate_general_trial_details
    create_a_table_row(@grey,@foreground_th_text_color,"General Trial Details")
    create_a_table_row(@light_red,@foreground_th_text_color,"General Details")

    @general_trial_details_table = RTF::TableNode.new(nil, 3, 3, 100, 100)

    Hash h = Hash.new
    trial_type = ResearchCategory.find_by_id(@trial.research_category_id).name
    lead_org = Organization.find_by_id(@trial.lead_org_id).name
    sponsor = Organization.find_by_id(@trial.sponsor_id).name
    @trial.responsible_party_id.nil? ? responsible_party=nil : responsible_party = ResponsibleParty.find_by_id(@trial.responsible_party_id).name
    h.store("Trial Type",trial_type)
    h.store("Lead Organization",lead_org)
    h.store("Sponsor",sponsor)
    h.store("Responsible Party", responsible_party)


    @trial.investigator_id.nil? ? investigator = nil : investigator = Person.find_by_id(@trial.investigator_id)
    @trial.investigator_aff_id.nil? ? investigator_affiliation = nil : investigator_affiliation = Organization.find_by_id(@trial.investigator_aff_id).name
    @trial.pi_id.nil? ? principle_investigator = nil : principle_investigator = Person.find_by_id(@trial.pi_id)
    principle_investigator.nil? ? principle_investigator = nil : principle_investigator = principle_investigator.fname + " " + principle_investigator.mname + " " + principle_investigator.lname
    investigator.nil? ? investigator = nil : investigator = investigator.fname + " " + investigator.mname + " " + investigator.lname

    h.store("Investigator", investigator)
    h.store("Investigator Title", @trial.investigator_title)
    h.store("Investigator Affilliation", investigator_affiliation)
    h.store("Principal Investigator",principle_investigator )
    h.store("Affilliation", "")


    h.each do |k,v|
      row = RTF::TableRowNode.new(@general_trial_details_table, 2)
      row[0] << k
      row[1] << v
      @document << row.to_rtf
    end
    create_a_table_row(@light_red,@foreground_th_text_color,"Collaborators")
    create_a_table_row(@grey,@foreground_th_text_color,"Name")

    collaborators = @trial.collaborators

    collaborators.each do |col|
      row = RTF::TableRowNode.new(@general_trial_details_table, 1)
      row[0] << col.org_name
      @document << row.to_rtf
    end
    create_a_table_row(@light_red,@foreground_th_text_color,"Status/Dates")
    Hash h = Hash.new

    @trial.trial_status_wrappers.present? ? cur_trial_status = @trial.trial_status_wrappers.last.trial_status.name : cur_trial_status = nil
    @trial.trial_status_wrappers.present? ? cur_trial_status_date = @trial.trial_status_wrappers.last.status_date : cur_trial_status_date = nil
    cur_trial_status = cur_trial_status + " as of " + cur_trial_status_date.to_s     if !cur_trial_status_date.nil?



    h.store("Current Trial Status", cur_trial_status)

    h.each do |k,v|
      row = RTF::TableRowNode.new(@general_trial_details_table, 2)
      row[0] << k
      row[1] << v
      @document << row.to_rtf
    end


  end


  def trial_params
      params.require(:trial).permit(:nci_id, :lead_protocol_id, :allocation_id, :official_title, :acronym, :pilot, :research_category_id,
                                    :primary_purpose_other, :secondary_purpose_other, :investigator_title, :intervention_model_id, :accept_vol, :min_age, :max_age, :min_age_unit_id, :max_age_unit_id, :gender_id,
                                    :program_code, :grant_question, :start_date, :start_date_qual, :primary_comp_date, :num_of_arms, :biospecimen_retention_id, :biospecimen_desc,
                                    :primary_comp_date_qual, :comp_date, :comp_date_qual, :ind_ide_question, :masking_id, :masking_role_caregiver,
                                    :masking_role_investigator, :masking_role_outcome_assessor, :masking_role_subject,
                                    :intervention_indicator, :sec801_indicator, :data_monitor_indicator, :history, :study_pop_desc, :sampling_method,
                                    :study_source_id, :phase_id, :primary_purpose_id, :secondary_purpose_id, :study_model_id, :study_model_other,
                                    :accrual_disease_term_id, :responsible_party_id, :lead_org_id, :pi_id, :sponsor_id, :time_perspective_id, :time_perspective_other,
                                    :investigator_id, :investigator_aff_id, :is_draft, :edit_type, :lock_version, :intervention_name,
                                    :brief_title, :brief_summary, :objective, :detailed_description, :study_classification_id, :target_enrollment, :final_enrollment,
                                    :process_priority, :process_comment, :nci_specific_comment, :nih_nci_div, :nih_nci_prog, :keywords,
                                    :board_name, :board_affiliation_id, :board_approval_num, :board_approval_status_id, :send_trial_flag, :verification_date,
                                    other_ids_attributes: [:id, :protocol_id_origin_id, :protocol_id, :_destroy],
                                    alternate_titles_attributes: [:id, :category, :title, :source, :_destroy],
                                    arms_groups_attributes: [:id, :label, :arms_groups_type, :description, :intervention_text, :trial_id, :_destroy],
                                    central_contacts_attributes: [:id, :country, :phone, :email, :central_contact_type_id, :person_id, :trial_id, :fullname, :extension],
                                    trial_funding_sources_attributes: [:id, :organization_id, :_destroy],
                                    collaborators_attributes: [:id, :organization_id, :org_name, :_destroy],
                                    grants_attributes: [:id, :funding_mechanism, :institute_code, :serial_number, :nci, :_destroy],
                                    trial_status_wrappers_attributes: [:id, :status_date, :why_stopped, :trial_status_id,
                                                                       :comment, :_destroy],
                                    ind_ides_attributes: [:id, :ind_ide_type, :ind_ide_number, :grantor, :holder_type_id,
                                                          :nih_nci, :expanded_access, :expanded_access_type_id, :exempt, :_destroy],
                                    oversight_authorities_attributes: [:id, :country, :organization, :_destroy],
                                    associated_trials_attributes: [:id, :trial_identifier, :identifier_type_id, :trial_id, :official_title, :research_category_name, :_destroy],
                                    trial_documents_attributes: [:id, :file_name, :document_type, :document_subtype,:source_document, :file, :_destroy, :status, :added_by_id, :why_deleted, :source_document],
                                    interventions_attributes: [:id, :name, :description, :other_name, :trial_id, :intervention_type_id, :index, :_destroy],
                                    other_criteria_attributes: [:id, :index, :criteria_type, :trial_id, :lock_version, :criteria_desc, :_destroy],
                                    submissions_attributes: [:id, :amendment_num, :amendment_date, :_destroy],
                                    sub_groups_attributes:[:id,:index,:label,:description,:_destroy],
                                    anatomic_site_wrappers_attributes: [:id, :anatomic_site_id, :_destroy],
                                    outcome_measures_attributes: [:id, :index,:title, :time_frame, :description, :safety_issue, :outcome_measure_type_id, :_destroy],
                                    markers_attributes: [:id,:name,:protocol_marker_name,:biomarker_use_id,:evaluation_type_other,:assay_type_other,:_destroy,:record_status,
                                                         :specimen_type_other,:cadsr_marker_id,
                                                         marker_eval_type_associations_attributes:[:id,:evaluation_type_id,:_destroy],
                                                         marker_assay_type_associations_attributes:[:id,:assay_type_id,:_destroy],
                                                         marker_spec_type_associations_attributes:[:id,:specimen_type_id,:_destroy],
                                                         marker_biomarker_purpose_associations_attributes:[:id,:biomarker_purpose_id,:_destroy]],
                                    diseases_attributes:[:id, :preferred_name, :code, :thesaurus_id, :display_name, :parent_preferred, :rank, :_destroy],
                                    milestone_wrappers_attributes:[:id, :milestone_id, :milestone_date, :comment, :submission_id, :created_by, :_destroy],
                                    onholds_attributes:[:id, :onhold_reason_id, :onhold_desc, :onhold_date, :offhold_date, :_destroy])
  end




end
