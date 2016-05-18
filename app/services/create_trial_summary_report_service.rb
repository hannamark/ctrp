
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


  @document = RTF::Document.new(RTF::Font.new(RTF::Font::MODERN, 'Helvetica'),style)


    ###### TSR Report start #######################
    ###############################################
    ###############################################



    @document.page_break
    generate_trial_title_table
    @document.page_break
    generate_trial_identification_table
    @document.page_break
    generate_general_trial_details
    @document.page_break
    generate_summary_4_information_table
    @document.page_break
    generate_regulatory_information_table
    @document.page_break
    trial_design_table

    @document.page_break

    generate_trial_description_table
    @document.page_break

    generate_interventions_table
    @document.page_break

    generate_arm_groups_table
    @document.page_break

    generate_eligibility_criteria_table
    @document.page_break

    #disease condition
    generate_disease_condition_table
    @document.page_break

    #outcome measures
    #generate_outcome_measures_table
    outcome_measure_type_id = OutcomeMeasureType.find_by_name("Primary").id
    generate_outcome_measures_table(outcome_measure_type_id,"Primary Outcome Measures")
    @document.page_break

    outcome_measure_type_id = OutcomeMeasureType.find_by_name("Secondary").id
    generate_outcome_measures_table(outcome_measure_type_id,"Secondary Outcome Measures")
    @document.page_break

    #subgroups
    generate_sub_groups_table
    @document.page_break

    #markers
    generate_markers_table
    @document.page_break

    #Participating Sites
    generate_participating_sites_table
    @document.page_break

    @document.page_break







    #And the file name will be "TSR_""CTRP Trial ID""_""Current Date YYYY-MM-DD""-
    # "Current Time HHMM(24hr)""_""Current Submission Type (O for original and A for amendment""_""Amendment Number (for amendments)"<examples>

    temp_file = Tempfile.new(['Sample2',".rtf"])
    temp_file << @document.to_rtf

    today_date = Date.today()
    @trial.nci_id.nil? ? nci_id = "N/A" : nci_id = @trial.nci_id
    file_name = "TSR_" + nci_id + "_" + today_date.strftime("%d-%h-%Y").to_s+".rtf"

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

  def create_a_table_row_node(table,text)
    row = RTF::TableRowNode.new(table, 1)
    row[0] << text
    @document << row.to_rtf
  end

  def generate_trial_title_table
    array =@document.table(4, 1)
    array.border_width =30
    array[0].shading_colour = @grey
    array[0][0].foreground(@foreground_th_text_color) << "Official Title"
    array[1][0] << @trial.official_title

    array[2][0].foreground(@foreground_th_text_color) << "Acronym"
    array[2].shading_colour = @light_red
    array[3][0] << @trial.acronym
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
      principle_investigator_name = " " + principle_investigator.mname if principle_investigator.mname
      principle_investigator_name = " " + principle_investigator.lname if principle_investigator.lname
    end


    if investigator.nil?
      investigator = nil
    else
      investigator_name = investigator.fname if investigator.fname
      investigator_name = " " + investigator.mname if investigator.mname
      investigator_name = " " + investigator.lname if investigator.lname
    end

    h.store("Investigator", investigator_name)
    h.store("Investigator Title", @trial.investigator_title)
    h.store("Investigator Affilliation", investigator_affiliation)
    h.store("Principal Investigator",principle_investigator_name )
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


    h.each do |k,v|
      row = RTF::TableRowNode.new(@general_trial_details_table, 2)
      row[0] << k
      row[1] << v
      @document << row.to_rtf
    end


  end

  def generate_summary_4_information_table
    @summary_4_information_table = RTF::TableNode.new(nil, 3, 3, 100, 100)

    create_a_table_row(@grey,@foreground_th_text_color,"Summary 4 Information")
    Hash h = Hash.new
    @trial.study_source_id.nil? ? study_source = nil : study_source = StudySource.find_by_id(@trial.study_source_id).name
    h.store("Funding Category",study_source)
    h.each do |k,v|
      row = RTF::TableRowNode.new(@summary_4_information_table, 2)
      row[0] << k
      row[1] << v
      @document << row.to_rtf
    end
    create_a_table_row(@light_red,@foreground_th_text_color,"Funding Sponsor/Source")
    funding_sources = @trial.trial_funding_sources

    funding_sources.each do |col|
      row = RTF::TableRowNode.new(@summary_4_information_table, 1)
      org_name = Organization.find_by_id(col.organization_id).name
      row[0] << org_name
      @document << row.to_rtf
    end
    create_a_table_row(@light_red,@foreground_th_text_color,"Anatomic Site Code")

    anatomic_sites = @trial.anatomic_site_wrappers

    anatomic_sites.each do |col|
      row = RTF::TableRowNode.new(@summary_4_information_table, 1)
      anatomic_site_name = AnatomicSite.find_by_id(col.anatomic_site_id).name
      row[0] << anatomic_site_name
      @document << row.to_rtf
    end
  end


        def generate_regulatory_information_table

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
          @trial.board_affiliation_id.nil? ? org =nil : org = Organization.find_by_id(@trial.board_affiliation_id)

          org.nil? ? address = "N/A" : address = org.address
          org.nil? ? phone = "N/A" : phone = org.phone


          h.store("Address",address)
          h.store("Phone", phone)

          h.each do |k,v|
            row = RTF::TableRowNode.new(@regulatory_info_table, 2)
            row[0] << k
            row[1] << v
            @document << row.to_rtf
          end
        end


        def trial_design_table
          array1 =@document.table(1,1)
          array1[0].shading_colour = @light_red
          array1[0][0] << "Trial Design"

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
          h.store("Target Enrollment",@trial.target_enrollment)

          h.each do |k,v|
            row = RTF::TableRowNode.new(@regulatory_info_table, 2)
            row[0] << k
            row[1] << v
            @document << row.to_rtf
          end

        end

        def generate_trial_description_table
          @trial_description_table = RTF::TableNode.new(nil, 3, 3, 100, 100)

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
          row = RTF::TableRowNode.new(@summary_4_information_table, 2)
          row[0] << "Keywords"
          row[1] << @trial.keywords
          @document << row.to_rtf
        end


        def generate_interventions_table
          @interventions_table = RTF::TableNode.new(nil, 3, 4, 100, 100)
          create_a_table_row(@grey,@foreground_th_text_color,"Intervention(s)")

          row = RTF::TableRowNode.new(@interventions_table, 4)
          row[0] << "Type"
          row[1] << "Name"
          row[2] << "Alternate Name"
          row[3] << "Description"
          @document << row.to_rtf

          interventions = @trial.interventions


          interventions.each do |col|
            row = RTF::TableRowNode.new(@interventions_table, 4)
            col.intervention_type_id.nil? ? type = nil :  type = InterventionType.find_by_id(col.intervention_type_id).name
            row[0] << type
            row[1] <<  col.name
            row[2] << col.other_name
            row[3] << col.description
            @document << row.to_rtf
          end
        end



      def generate_arm_groups_table

          @arm_groups_table = RTF::TableNode.new(nil, 3, 3, 100, 100)

          create_a_table_row(@grey,@foreground_th_text_color,"Arm/Group(s)")

          row = RTF::TableRowNode.new(@interventions_table, 3)

          row[0] << "Arm Type"
          row[1] << "Label"
          row[2] << "Description"
          @document << row.to_rtf

          arms_groups = @trial.arms_groups

          arms_groups.each do |col|
            row = RTF::TableRowNode.new(@arm_groups_table, 3)
            row[0] << col.arms_groups_type
            row[1] <<  col.label
            row[2] << col.description
            @document << row.to_rtf
          end
          create_a_table_row(@grey,@foreground_th_text_color,"Interventions")

          row = RTF::TableRowNode.new(@arm_groups_table, 2)
          row[0] << "Name"
          row[1] << "Description"
          @document << row.to_rtf

          interventions = @trial.interventions
          interventions.each do |col|
            row = RTF::TableRowNode.new(@arm_groups_table, 2)
            row[0] <<  col.name
            row[1] << col.description
            @document << row.to_rtf
          end

      end

      def generate_eligibility_criteria_table

        @eligibility_criteria_table = RTF::TableNode.new(nil, 3, 3, 100, 100)

        create_a_table_row(@grey,@foreground_th_text_color,"Eligibility Criteria")

        @trial.gender_id.nil? ? gender= "" : gender = Gender.find_by_id(@trial.gender_id).name
        @trial.min_age_unit_id.nil? ? min_age = @trial.min_age.to_s : min_age = @trial.min_age.to_s + "  " + AgeUnit.find_by_id(@trial.min_age_unit_id).name
        @trial.max_age_unit_id.nil? ? max_age = @trial.max_age.to_s : max_age = @trial.max_age.to_s + "  " + AgeUnit.find_by_id(@trial.max_age_unit_id).name

        Hash h = Hash.new
        h.store("Accepts Healthy Volunteers?",@trial.accept_vol)
        h.store("Gender",gender)
        h.store("Minimum Age",min_age)
        h.store("Maximum Age",max_age)

        h.each do |k,v|
          row = RTF::TableRowNode.new(@eligibility_criteria_table, 2)
          row[0] << k
          row[1] << v
          @document << row.to_rtf
        end

        create_a_table_row(@light_red,@foreground_th_text_color,"Inclusion Criteria")

        create_a_table_row(@light_red,@foreground_th_text_color,"Exclusion Criteria")


      end


       def generate_disease_condition_table
         @disease_condition_table = RTF::TableNode.new(nil, 5, 5,10)
         create_a_table_row(@grey,@foreground_th_text_color,"Disease/Condition")
         diseases = @trial.diseases
         num_of_rows = diseases.size

         array = @document.table(num_of_rows,1,10)
         i=0
         diseases.each do |col|
           array[i][0] << col.name
           array[i][0].line_break
           i = i+1
         end
       end


        def generate_outcome_measures_table(outcome_measure_type_id,text)
          create_a_table_row(@grey,@foreground_th_text_color,text)
          oms = @trial.outcome_measures
          primary_oms = oms.where("outcome_measure_type_id = ? ", outcome_measure_type_id)
          num_of_rows = primary_oms.size

          array = @document.table(num_of_rows+1,4,10)
          array[0].shading_colour = @light_red

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

          array = @document.table(num_of_rows+1,2,10)
          array[0].shading_colour = @light_red

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

          array = @document.table(num_of_rows+1,6,10)
          array[0].shading_colour = @light_red

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
        @participating_sites_table = RTF::TableNode.new(nil, 5, 5,10)
        #@participating_sites_table[0].shading_colour = @grey

        create_a_table_row(@grey,@foreground_th_text_color,"Participating Sites")

        participating_sites = @trial.participating_sites
        num_of_rows = participating_sites.size

        array = @document.table(num_of_rows+1,5,10)
        array[0].shading_colour = @light_red

        array[0][0].foreground(@foreground_th_text_color) << "Facility"
        array[0][1].foreground(@foreground_th_text_color) << "Contact"
        array[0][2].foreground(@foreground_th_text_color) << "Recruitment Status & Date(s)"
        array[0][3].foreground(@foreground_th_text_color) << "Target Accrual"
        array[0][4].foreground(@foreground_th_text_color) << "Investigator(s)"
         i=1

        participating_sites.each do |col|
          #row = nil
          #row = RTF::TableRowNode.new(@participating_sites_table, 5)
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
          array[i][3] << @trial.target_enrollment

          participating_site_investigators = col.participating_site_investigators
          participating_site_investigators.each do |col|
            col.person_id.nil? ? investigator = nil : investigator = Person.find_by_id(col.person_id)
            investigator_name = nil
            if investigator.nil?
              investigator = nil
            else
              investigator_name = investigator.fname if investigator.fname
              investigator_name = " " + investigator.mname if investigator.mname
              investigator_name = " " + investigator.lname if investigator.lname
            end
            investigator_type = col.investigator_type
            investigator_name = investigator_name + " - " + investigator_type if investigator_type
            array[i][4] << investigator_name
            array[i][4].line_break
          end

          i = i+1
        end

         #@document << @participating_sites_table.to_rtf

      end
end
