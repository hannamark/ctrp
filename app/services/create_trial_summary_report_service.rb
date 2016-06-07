
class CreateTrialSummaryReportService

  def initialize(params)
    @trial_id = params[:trial_id]
    @store_file_on_server = params[:store_file_on_server]
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
    @light_red  =                          RTF::Colour.new(255,175,175)
    @red_shade  =                          RTF::Colour.new(180,0,0)


    #Styles
    @styles = {}
    @styles['PS_HEADING']              = RTF::ParagraphStyle.new
    @styles['PS_NORMAL']               = RTF::ParagraphStyle.new
    @styles['PS_NORMAL'].justification = RTF::ParagraphStyle::FULL_JUSTIFY
    @styles['PS_INDENTED']             = RTF::ParagraphStyle.new
    @styles['PS_INDENTED'].left_indent = 300
    @styles['PS_TITLE']                = RTF::ParagraphStyle.new
    @styles['PS_TITLE'].space_before   = 100
    @styles['PS_TITLE'].space_after    = 200
    @styles['CS_HEADING']              = RTF::CharacterStyle.new
    @styles['CS_HEADING'].bold         = true
    @styles['CS_HEADING'].font_size    = 36
    @styles['CS_CODE']                 = RTF::CharacterStyle.new
    @styles['CS_CODE'].font            = fonts[1]
    @styles['CS_CODE'].font_size       = 16

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


  @document = RTF::Document.new(RTF::Font.new(RTF::Font::MODERN, 'Helvetica'))


    ###### TSR Report start #######################
    ###############################################
    ###############################################




    @document.paragraph(@styles['PS_NORMAL']) do |p2|
      p2.foreground(@foreground_th_text_color) << 'Trial Summary Report'
      p2.line_break()
      p2 << 'Date:'
      p2.line_break()
      p2  << 'Record Verification Date:'
      p2.line_break()
    end




    line_break   = @document.table(1, 1) 
    generate_trial_title_table
    line_break   = @document.table(1, 1) 
    generate_trial_identification_table
    line_break   = @document.table(1, 1) 
    generate_general_trial_details
    line_break   = @document.table(1, 1) 
    generate_summary_4_information_table
    line_break   = @document.table(1, 1) 
    generate_regulatory_information_table
    line_break   = @document.table(1, 1) 
    trial_design_table
    line_break   = @document.table(1, 1) 

    generate_trial_description_table
    line_break   = @document.table(1, 1) 

    generate_interventions_table
    line_break   = @document.table(1, 1) 

    generate_arm_groups_table
    line_break   = @document.table(1, 1) 

    generate_eligibility_criteria_table
    line_break   = @document.table(1, 1) 

    #disease condition
    generate_disease_condition_table
    line_break   = @document.table(1, 1) 

    #outcome measures
    #generate_outcome_measures_table
    outcome_measure_type_id = OutcomeMeasureType.find_by_name("Primary").id
    generate_outcome_measures_table(outcome_measure_type_id,"Primary Outcome Measures")
    line_break   = @document.table(1, 1) 

    outcome_measure_type_id = OutcomeMeasureType.find_by_name("Secondary").id
    generate_outcome_measures_table(outcome_measure_type_id,"Secondary Outcome Measures")
    line_break   = @document.table(1, 1) 

    #subgroups
    generate_sub_groups_table
    line_break   = @document.table(1, 1) 

    #markers
    generate_markers_table
    line_break   = @document.table(1, 1) 

    #Participating Sites
    generate_participating_sites_table
    line_break   = @document.table(1, 1) 

    line_break   = @document.table(1, 1) 

      #And the file name will be "TSR_""CTRP Trial ID""_""Current Date YYYY-MM-DD""-
    # "Current Time HHMM(24hr)""_""Current Submission Type (O for original and A for amendment""_""Amendment Number (for amendments)"<examples>

    temp_file = Tempfile.new(['rtf_temp_file',".rtf"])
    temp_file << @document.to_rtf
    file_name = get_rtf_file_name

    if @store_file_on_server
          trial_document_params = {:file => temp_file, :document_type =>"TSR", :file_name => file_name,:trial_id => @trial_id}
          td = TrialDocument.new(trial_document_params)
          td.save!
     else
          return temp_file
     end

  end

  def get_rtf_file_name
    today_date = Date.today()
    time = Time.now

    @trial.nci_id.nil? ? nci_id = "N/A" : nci_id = @trial.nci_id
    file_name = "TSR_" + nci_id + "_" + time.strftime("%d-%h-%Y").to_s+ "-" + time.strftime("%H %M").to_s
    cur_submission = @trial.submissions.last
    cur_submission.nil? ? cur_submission_type=nil : cur_submission_type = cur_submission.submission_type
    if !cur_submission_type.nil?
      if cur_submission_type.name == "Amendment"
        amendment_number = cur_submission.amendment_num
        file_name = file_name + "_" + "A" + "_"+ amendment_number.to_s
      elsif cur_submission_type.name == "Original"
        file_name = file_name + "_" + "O"
      end
    end

    file_name = file_name + ".rtf"
    return file_name
  end

    def create_a_table_row(shading_color, forground_color,text)
      array1 =@document.table(1,1,8000)
      array1.border_width =10
      array1[0].shading_colour = shading_color if shading_color
      forground_color.nil? ? array1[0][0] << text : array1[0][0].foreground(forground_color) << text

    end

  def create_a_table_row_node(table,text)
    array =@document.table(1,1,8000)
    array.border_width =10
    array[0][0] << text
  end

  def generate_trial_title_table
    array =@document.table(4, 1,8000)
    array.border_width =10
    array[0].shading_colour = @grey
    array[0][0].foreground(@foreground_th_text_color) << "Official Title"
    official_title = ""
    official_title = @trial.official_title if @trial.official_title

    array[1][0] << official_title
    array[2][0].foreground(@foreground_th_text_color) << "Acronym"
    array[2].shading_colour = @light_red
    acronym = ""
    acronym = @trial.acronym if @trial.acronym
    array[3][0] << acronym
  end



  def generate_trial_identification_table
    create_a_table_row(@grey,@foreground_th_text_color,"Trial Identification")
    #@trial_identification_table = RTF::TableNode.new(nil, 3, 3, 3000, 2000,2000)
    other_ids = @trial.other_ids.reorder(:protocol_id)
    other_ids_num =0
    other_ids_num = other_ids.size if other_ids
    array =@document.table(2+other_ids_num, 2,4000,4000)
    array.border_width =10


    Hash h = Hash.new
    h.store("NCI Trial Identifier",@trial.nci_id)
    h.store("Lead Organization Identifier",@trial.lead_protocol_id)
    i=0
    h.each do |k,v|
      array[i][0] << k
      array[i][1] << v
      i=i+1
    end


    other_ids.each do |oid|
      pid = ProtocolIdOrigin.find_by_id(oid.protocol_id_origin_id)
      array[i][1] << oid.protocol_id
      array[i][0] << pid.name
      i=i+1
    end
  end

  def generate_general_trial_details
    create_a_table_row(@grey,@foreground_th_text_color,"General Trial Details")
    create_a_table_row(@light_red,@foreground_th_text_color,"General Details")


    array =@document.table(9, 2,4000,4000)
    array.border_width =10

    Hash h = Hash.new
    @trial.research_category_id.nil? ? trail_type = nil : trial_type = ResearchCategory.find_by_id(@trial.research_category_id).name
    @trial.lead_org_id.nil? ? lead_org = nil : lead_org = Organization.find_by_id(@trial.lead_org_id).name
    @trial.sponsor_id.nil? ? sponsor = nil : sponsor = Organization.find_by_id(@trial.sponsor_id).name
    @trial.responsible_party_id.nil? ? responsible_party=nil : responsible_party = ResponsibleParty.find_by_id(@trial.responsible_party_id).name
    h.store("Trial Type",trial_type)
    h.store("Lead Organization",lead_org)
    h.store("Sponsor",sponsor)
    h.store("Responsible Party", responsible_party)


    @trial.investigator_id.nil? ? investigator = nil : investigator = Person.find_by_id(@trial.investigator_id)
    @trial.investigator_aff_id.nil? ? investigator_affiliation = nil : investigator_affiliation = Organization.find_by_id(@trial.investigator_aff_id).name
    @trial.pi_id.nil? ? principle_investigator = nil : principle_investigator = Person.find_by_id(@trial.pi_id)
   # principle_investigator.nil? ? principle_investigator = nil : principle_investigator = principle_investigator.fname + " " + principle_investigator.mname + " " + principle_investigator.lname
   # investigator.nil? ? investigator = nil : investigator = investigator.fname + " " + investigator.mname + " " + investigator.lname

    if principle_investigator.nil?
      principle_investigator = nil
    else
      principle_investigator_name = principle_investigator.fname if principle_investigator.fname
      principle_investigator_name = principle_investigator_name + " " + principle_investigator.mname if principle_investigator.mname
      principle_investigator_name = principle_investigator_name + " " + principle_investigator.lname if principle_investigator.lname
    end


    if investigator.nil?
      investigator = nil
    else
      investigator_name = investigator.fname if investigator.fname
      investigator_name = investigator_name + " " + investigator.mname if investigator.mname
      investigator_name = investigator_name + " " + investigator.lname if investigator.lname
    end

    h.store("Investigator", investigator_name)
    h.store("Investigator Title", @trial.investigator_title)
    h.store("Investigator Affilliation", investigator_affiliation)
    h.store("Principal Investigator",principle_investigator_name )
    h.store("Affilliation", "")

    i=0
    h.each do |k,v|
      array[i][0] << k
      array[i][1] << v
      i = i+1
    end
    create_a_table_row(@light_red,@foreground_th_text_color,"Collaborators")
    create_a_table_row(@grey,@foreground_th_text_color,"Name")

    collaborators = @trial.collaborators
    collaborators_num = 0
    collaborators_num = collaborators.size if collaborators
    array =@document.table(collaborators_num, 2,4000,4000)
    array.border_width =10
    i = 0
    collaborators.each do |col|
      array[i][0] << col.org_name
      i= i+1
    end

    create_a_table_row(@light_red,@foreground_th_text_color,"Status/Dates")
    Hash h = Hash.new

    @trial.trial_status_wrappers.present? ? cur_trial_status = @trial.trial_status_wrappers.last.trial_status.name : cur_trial_status = nil
    @trial.trial_status_wrappers.present? ? cur_trial_status_date = @trial.trial_status_wrappers.last.status_date : cur_trial_status_date = nil
    cur_trial_status = cur_trial_status + " as of " + cur_trial_status_date.to_s     if !cur_trial_status_date.nil?

    start_date = @trial.start_date
    @trial.start_date_qual.nil? ? start_date_qual= "Trial Start Date" : start_date_qual = "Trial Start Date" +  " - " + @trial.start_date_qual

    primary_comp_date = @trial.primary_comp_date
    @trial.primary_comp_date_qual.nil? ? primary_comp_date_qual= "Primary Completion Date" : primary_comp_date_qual = "Primary Completion Date" +  " - " + @trial.primary_comp_date_qual

    comp_date = @trial.comp_date
    @trial.comp_date_qual.nil? ? comp_date_qual= "Trial Completion Date" : comp_date_qual = "Trial Completion Date" +  " - " + @trial.comp_date_qual



    h.store("Current Trial Status", cur_trial_status)
    h.store(start_date_qual,start_date.to_s)
    h.store(primary_comp_date_qual,primary_comp_date.to_s)
    h.store(comp_date_qual,comp_date.to_s)

    array =@document.table(4, 2,4000,4000)
    array.border_width =10

    i =0
    h.each do |k,v|
      array[i][0] << k
      array[i][1] << v
      i = i+1
    end

  end

  def generate_summary_4_information_table

    create_a_table_row(@grey,@foreground_th_text_color,"Summary 4 Information")

    Hash h = Hash.new
    @trial.study_source_id.nil? ? study_source = nil : study_source = StudySource.find_by_id(@trial.study_source_id).name
    h.store("Funding Category",study_source)
    array =@document.table(1, 2,4000,4000)
    array.border_width =10

    i=0
    h.each do |k,v|
      array[i][0] << k
      array[i][1] << v
      i = i+1
    end



    create_a_table_row(@light_red,@foreground_th_text_color,"Funding Sponsor/Source")
    funding_sources = @trial.trial_funding_sources

    funding_sources_num = 0
    funding_sources_num = funding_sources.size if funding_sources
    array =@document.table(funding_sources_num, 2,4000,4000)
    array.border_width =10
    i = 0

    funding_sources.each do |col|
      org_name = Organization.find_by_id(col.organization_id).name
      array[i][0] << org_name
      i = i+1
    end

    create_a_table_row(@light_red,@foreground_th_text_color,"Anatomic Site Code")

    anatomic_sites = @trial.anatomic_site_wrappers
    anatomic_sites_num = 0
    anatomic_sites_num = anatomic_sites.size if anatomic_sites
    array =@document.table(anatomic_sites_num, 2,4000,4000)
    array.border_width =10
    i = 0


    anatomic_sites.each do |col|
      anatomic_site_name = AnatomicSite.find_by_id(col.anatomic_site_id).name
      array[i][0] << anatomic_site_name
      i = i +1
    end
  end


        def generate_regulatory_information_table

          oversight_authorities =@trial.oversight_authorities
          create_a_table_row(@grey,@foreground_th_text_color,"Regulatory Information")
          create_a_table_row(@light_red, nil,"Oversight Authority")

          array =@document.table(1, 2,4000,4000)
          array.border_width =10
          array[0][0] << "Country"
          array[0][1] << "Organization"


          oversight_authorities_num = 0
          oversight_authorities_num = oversight_authorities.size if oversight_authorities
          array =@document.table(oversight_authorities_num, 2,4000,4000)
          array.border_width =10
          i = 0

          oversight_authorities.each do |e|
            row = RTF::TableRowNode.new(@regulatory_info_table, 2)
            array[i][0] << e.country
            array[i][1] << e.organization
            i = i+1
          end



          Hash h = Hash.new
          h.store("FDA Regulated Intervention?", @trial.intervention_indicator)
          h.store("Section 801?",@trial.sec801_indicator)
          h.store("DMC Appointed?",@trial.data_monitor_indicator)
          h.store("IND/IDE Study?",@trial.ind_ide_question)

          array =@document.table(4, 2,4000,4000)
          array.border_width =10
          i=0
          h.each do |k,v|
            array[i][0] << k
            array[i][1] << v
            i = i+1
          end

          array =@document.table(1,1,8000)
          array.border_width =10
          array[0].shading_colour = @light_red
          array[0][0] << "IND/IDE"

          array =@document.table(1,4,2000,2000,2000,2000)
          array.border_width =10
          array[0].shading_colour = @grey
          array[0][0] << "Type"
          array[0][1] << "Grantor"
          array[0][2] << "Number"
          array[0][3] << "Holder Type"

          ind_ides = @trial.ind_ides
          ind_ides_num = 0
          ind_ides_num = ind_ides.size if ind_ides
          array =@document.table(ind_ides_num, 4,2000,2000,2000,2000)
          array.border_width =10
          i = 0
          ind_ides.each do |ind_ide|
            ind_ide.ind_ide_type.nil? ? array[i][0] << ind_ide.ind_ide_type="" : array[i][0] << ind_ide.ind_ide_type
            ind_ide.grantor.nil? ? array[i][1] << ind_ide.grantor="" : array[i][1] << ind_ide.grantor
            ind_ide.ind_ide_number.nil? ? array[i][2] << ind_ide.ind_ide_number="" : array[i][2] << ind_ide.ind_ide_number
            ind_ide.holder_type_id.nil? ?  array[i][3]="" : array[i][3] << HolderType.find_by_id(ind_ide.holder_type_id).name
            i = i +1
          end

          array =@document.table(1,1,8000)
          array.border_width =10
          array[0].shading_colour = @light_red
          array[0][0] << "Human Subject Safety"

          Hash h = Hash.new
          @trial.board_approval_status_id.nil? ? board_approval_status = "N/A" : board_approval_status = BoardApprovalStatus.find_by_id(@trial.board_approval_status_id).name
          h.store("Board Approval Status", board_approval_status)
          h.store("Board Approval Number",@trial.board_approval_num)
          h.store("Board",@trial.board_name)
          @trial.board_affiliation_id.nil? ? org =nil : org = Organization.find_by_id(@trial.board_affiliation_id)

          org.nil? ? address = "N/A" : address = org.address
          org.nil? ? phone = "N/A" : phone = org.phone


          h.store("Address",address)
          h.store("Phone", phone)

          array =@document.table(5,2,4000,4000)
          array.border_width =10
          i = 0
          h.each do |k,v|
            array[i][0] << k
            array[i][1] << v
            i = i +1
          end
        end


        def trial_design_table
          array =@document.table(1,1,8000)
          array.border_width =10
          array[0].shading_colour = @light_red
          array[0][0] << "Trial Design"

          Hash h = Hash.new
          #h.store("Type", board_approval_status)
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
          h.store("Number of Arms",@trial.num_of_arms.to_s)
          h.store("Masking",masking)
          h.store("Allocation",allocation)
          h.store("Classification",classification)
          h.store("Target Enrollment",@trial.target_enrollment.to_s)


          array =@document.table(h.length,2,4000,4000)
          array.border_width =10
          i = 0



          h.each do |k,v|
            array[i][0] << k
            array[i][1] << v
            i = i +1
          end

        end

        def generate_trial_description_table

          create_a_table_row(@grey,@foreground_th_text_color,"Trial Description")
          create_a_table_row(@light_red,@foreground_th_text_color,"Brief Title")

          create_a_table_row_node(@trial_description_table,@trial.brief_title)

          create_a_table_row(@light_red,@foreground_th_text_color,"Brief Summary")
          create_a_table_row_node(@trial_description_table,@trial.brief_summary)

          create_a_table_row(@light_red,@foreground_th_text_color,"Objectives")
          create_a_table_row_node(@trial_description_table,@trial.objective)

          create_a_table_row(@light_red,@foreground_th_text_color,"Detailed Description")
          create_a_table_row_node(@trial_description_table,@trial.detailed_description)

          create_a_table_row(@light_red,@foreground_th_text_color,"Other Details")
          array =@document.table(1,2,4000,4000)
          array.border_width =10
          array[0][0] << "Keywords"
          array[0][1] << @trial.keywords

        end


        def generate_interventions_table
          create_a_table_row(@grey,@foreground_th_text_color,"Intervention(s)")

          array =@document.table(1,4,2000,2000,2000,2000)
          array.border_width =10
          array[0][0] << "Type"
          array[0][1] << "Name"
          array[0][2] << "Alternate Name"
          array[0][3] << "Description"

          interventions = @trial.interventions
          interventions_num = 0
          interventions_num = interventions.size if interventions
          array =@document.table(interventions_num, 4,2000,2000,2000,2000)
          array.border_width =10
          i = 0

          interventions.each do |col|
            col.intervention_type_id.nil? ? type = nil :  type = InterventionType.find_by_id(col.intervention_type_id).name
            array[i][0] << type
            array[i][1] <<  col.name
            array[i][2] << col.other_name
            array[i][3] << col.description
            i = i +1
          end
        end



      def generate_arm_groups_table
          create_a_table_row(@grey,@foreground_th_text_color,"Arm/Group(s)")

          array =@document.table(1,3,2800,2600,2600)
          array.border_width =10
          array[0][0] << "Arm Type"
          array[0][1] << "Label"
          array[0][2] << "Description"

          arms_groups = @trial.arms_groups
          arms_groups_num = 0
          arms_groups_num = arms_groups.size if arms_groups
          array =@document.table(arms_groups_num, 3,2800,2600,2600)
          array.border_width =10
          i = 0
          i = 0
          arms_groups.each do |col|
            array[i][0] << col.arms_groups_type
            array[i][1] <<  col.label
            array[i][2] << col.description
            i=i+1
          end

          create_a_table_row(@grey,@foreground_th_text_color,"Interventions")

          array =@document.table(1,2,4000,4000)
          array.border_width =10
          array[0][0] << "Name"
          array[0][1] << "Description"


          interventions = @trial.interventions
          interventions_num = 0
          interventions_num = interventions.size if interventions
          array =@document.table(interventions_num, 2,4000,4000)
          array.border_width =10
          i = 0
          interventions.each do |col|
            array[i][0] <<  col.name
            array[i][1] << col.description
            i = i +1
           end

      end


      def generate_eligibility_criteria_table


        create_a_table_row(@grey,@foreground_th_text_color,"Eligibility Criteria")

        @trial.gender_id.nil? ? gender= "" : gender = Gender.find_by_id(@trial.gender_id).name
        @trial.min_age_unit_id.nil? ? min_age = @trial.min_age.to_s : min_age = @trial.min_age.to_s + "  " + AgeUnit.find_by_id(@trial.min_age_unit_id).name
        @trial.max_age_unit_id.nil? ? max_age = @trial.max_age.to_s : max_age = @trial.max_age.to_s + "  " + AgeUnit.find_by_id(@trial.max_age_unit_id).name

        Hash h = Hash.new
        h.store("Accepts Healthy Volunteers?",@trial.accept_vol)
        h.store("Gender",gender)
        h.store("Minimum Age",min_age)
        h.store("Maximum Age",max_age)

        array =@document.table(h.length,2,4000,4000)
        array.border_width =10
        i = 0

        h.each do |k,v|
          array[i][0] << k
          array[i][1] << v
          i = i + 1
        end

        create_a_table_row(@light_red,@foreground_th_text_color,"Inclusion Criteria")
        array =@document.table(1,1,8000)
        array.border_width =10
        inclusion_criteria = @trial.other_criteria.where("criteria_type = ?", "Inclusion")
        inclusion_criteria.each do |col|
          array[0][0] << col.criteria_desc
          array[0][0].line_break
        end

        create_a_table_row(@light_red,@foreground_th_text_color,"Exclusion Criteria")
        array =@document.table(1,1,8000)
        array.border_width =10
        exclusion_criteria = @trial.other_criteria.where("criteria_type = ?", "Exclusion")
        exclusion_criteria.each do |col|
          array[0][0] << col.criteria_desc
          array[0][0].line_break
        end

      end


       def generate_disease_condition_table
         create_a_table_row(@grey,@foreground_th_text_color,"Disease/Condition")
         diseases = @trial.diseases
         num_of_rows = diseases.size

         array = @document.table(num_of_rows,1,8000)
         array.border_width =10
         i=0
         diseases.each do |col|
           array[i][0] << col.display_name
           array[i][0].line_break
           i = i+1
         end
       end


        def generate_outcome_measures_table(outcome_measure_type_id,text)
          create_a_table_row(@grey,@foreground_th_text_color,text)
          oms = @trial.outcome_measures
          primary_oms = oms.where("outcome_measure_type_id = ? ", outcome_measure_type_id)
          num_of_rows = primary_oms.size

          array = @document.table(num_of_rows+1,4,2000,2000,2000,2000)
          array[0].shading_colour = @light_red
          array.border_width =10

          array[0][0].foreground(@foreground_th_text_color) << "Title"
          array[0][1].foreground(@foreground_th_text_color) << "Description"
          array[0][2].foreground(@foreground_th_text_color) << "Time Frame"
          array[0][3].foreground(@foreground_th_text_color) << "Safety Issue?"
          i=1

          primary_oms.each do |col|

            array[i][0] << col.title
            array[i][0].line_break

            array[i][1] << col.description
            array[i][1].line_break

            array[i][2] << col.time_frame
            array[i][2].line_break

            array[i][3] << col.safety_issue
            array[i][3].line_break

            i = i+1
          end

        end

        def generate_sub_groups_table
          create_a_table_row(@grey,@foreground_th_text_color,"Sub-groups Stratification Criteria")
          sub_groups = @trial.sub_groups
          num_of_rows = sub_groups.size

          array = @document.table(num_of_rows+1,2,4000,4000)
          array[0].shading_colour = @light_red
          array.border_width =10

          array[0][0].foreground(@foreground_th_text_color) << "Label"
          array[0][1].foreground(@foreground_th_text_color) << "Description"
          i=1

          sub_groups.each do |col|

            array[i][0] << col.label
            array[i][0].line_break

            array[i][1] << col.description
            array[i][1].line_break

            i = i+1
          end
        end

        def generate_markers_table
          create_a_table_row(@grey,@foreground_th_text_color,"Markers")
          markers = @trial.markers
          num_of_rows = markers.size

          array = @document.table(num_of_rows+1,6,1350,1330,1330,1330,1330,1330)
          array[0].shading_colour = @light_red
          array.border_width =10

          array[0][0].foreground(@foreground_th_text_color) << "Marker Name"
          array[0][1].foreground(@foreground_th_text_color) << "Evaluation Type"
          array[0][2].foreground(@foreground_th_text_color) << "Assay Type"
          array[0][3].foreground(@foreground_th_text_color) << "Biomarker Use"
          array[0][4].foreground(@foreground_th_text_color) << "Biomarker Purpose"
          array[0][5].foreground(@foreground_th_text_color) << "Specimen Type"

          i=1

          markers.each do |col|

            array[i][0] << col.name
            array[i][0].line_break


            marker_eval_type_associations = col.marker_eval_type_associations
            marker_eval_type_associations.each do |col|
              col.evaluation_type_id.nil? ? evaluation_type = nil :  evaluation_type = EvaluationType.find_by_id(col.evaluation_type_id).name
              array[i][1] << evaluation_type
              array[i][1].line_break
            end

            marker_assay_type_associations = col.marker_assay_type_associations
            marker_assay_type_associations.each do |col|
              col.assay_type_id.nil? ? assay_type = nil :  assay_type = AssayType.find_by_id(col.assay_type_id).name
              array[i][2] << assay_type
              array[i][2].line_break
            end


            col.biomarker_use_id.nil? ? biomarker_use_name= nil : biomarker_use_name = BiomarkerUse.find_by_id(col.biomarker_use_id).name
            array[i][3] << biomarker_use_name
            array[i][3].line_break

            biomarker_purposes = col.marker_biomarker_purpose_associations
            biomarker_purposes.each do |col|
              col.biomarker_purpose_id.nil? ? biomarker_purpose_name = nil :  biomarker_purpose_name = BiomarkerPurpose.find_by_id(col.biomarker_purpose_id).name
              array[i][4] << biomarker_purpose_name
              array[i][4].line_break
            end

            marker_spec_type_associations = col.marker_spec_type_associations
            marker_spec_type_associations.each do |col|
              col.specimen_type_id.nil? ? specimen_type = nil :  specimen_type = SpecimenType.find_by_id(col.specimen_type_id).name
              array[i][5] << specimen_type
              array[i][5].line_break
            end

            i = i+1
          end

        end

      def generate_participating_sites_table

        create_a_table_row(@grey,@foreground_th_text_color,"Participating Sites")

        participating_sites = @trial.participating_sites
        num_of_rows = participating_sites.size

        array = @document.table(num_of_rows+1,5,1600,1600,1600,1600,1600)
        array.border_width =10
        array[0].shading_colour = @light_red

        array[0][0].foreground(@foreground_th_text_color) << "Facility"
        array[0][1].foreground(@foreground_th_text_color) << "Contact"
        array[0][2].foreground(@foreground_th_text_color) << "Recruitment Status & Date(s)"
        array[0][3].foreground(@foreground_th_text_color) << "Target Accrual"
        array[0][4].foreground(@foreground_th_text_color) << "Investigator(s)"
         i=1

        participating_sites.each do |col|

          col.organization_id.nil? ? facility = nil :  facility = Organization.find_by_id(col.organization_id).name
          col.contact_name.nil? ? contact_name = "" : contact_name = col.contact_name
          array[i][0] << facility

          array[i][1] << "Name: "
          array[i][1] << contact_name
          array[i][1].line_break
          array[i][1] << "Email: "

          array[i][1] << col.contact_email
          array[i][1].line_break
          array[i][1] << "Phone: "

          array[i][1] << col.contact_phone
          array[i][1].line_break
          array[i][1] << "Ext: "

          array[i][1] << col.extension

          col.site_rec_status_wrappers.present? ? current_site_recruitment_status = col.site_rec_status_wrappers.last.site_recruitment_status.name + " as of " + col.site_rec_status_wrappers.last.status_date.to_s: current_site_recruitment_status = nil

          array[i][2] << current_site_recruitment_status
          array[i][3] << @trial.target_enrollment.to_s

          participating_site_investigators = col.participating_site_investigators
          participating_site_investigators.each do |col|
            col.person_id.nil? ? investigator = nil : investigator = Person.find_by_id(col.person_id)
            investigator_name = nil
            if investigator.nil?
              investigator = nil
            else
              investigator_name = investigator.fname if investigator.fname
              investigator_name = investigator_name +  " "  + investigator.mname if investigator.mname
              investigator_name = investigator_name +  " "  + investigator.lname if investigator.lname
            end
            investigator_type = col.investigator_type
            investigator_name = investigator_name + " - " + investigator_type if investigator_type
            array[i][4] << investigator_name
            array[i][4].line_break
          end

          i = i+1
        end

      end
end
