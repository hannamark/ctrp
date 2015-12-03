class TrialsController < ApplicationController
  before_action :set_trial, only: [:show, :edit, :update, :destroy]
  #before_filter :wrapper_authenticate_user unless Rails.env.test?
  #load_and_authorize_resource unless Rails.env.test?

  # GET /trials
  # GET /trials.json
  def index
    @trials = Trial.all
  end

  # GET /trials/1
  # GET /trials/1.json
  def show
  end

  # GET /trials/new
  def new
    @trial = Trial.new
  end

  # GET /trials/1/edit
  def edit
  end

  # POST /trials
  # POST /trials.json
  def create
    @trial = Trial.new(trial_params)

    @trial.created_by = @current_user.username unless @current_user.nil?
    @trial.updated_by = @trial.created_by

    respond_to do |format|
      if @trial.save
        format.html { redirect_to @trial, notice: 'Trial was successfully created.' }
        format.json { render :show, status: :created, location: @trial }
      else
        format.html { render :new }
        format.json { render json: @trial.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /trials/1
  # PATCH/PUT /trials/1.json
  def update
    @trial.updated_by = @current_user.username unless @current_user.nil?

    respond_to do |format|
      if @trial.update(trial_params)
        format.html { redirect_to @trial, notice: 'Trial was successfully updated.' }
        format.json { render :show, status: :ok, location: @trial }
      else
        format.html { render :edit }
        format.json { render json: @trial.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /trials/1
  # DELETE /trials/1.json
  def destroy
    @trial.destroy
    respond_to do |format|
      format.html { redirect_to trials_url, notice: 'Trial was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def search
    # Pagination/sorting params initialization
    params[:start] = 1 if params[:start].blank?
    params[:rows] = 10 if params[:rows].blank?
    params[:sort] = 'lead_protocol_id' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?

    if params[:protocol_id].present? || params[:official_title].present? || params[:phase].present? || params[:purpose].present? || params[:pilot].present? || params[:pi].present? || params[:org].present?  || params[:study_source].present?
      @trials = Trial.all
      @trials = @trials.with_protocol_id(params[:protocol_id]) if params[:protocol_id].present?
      @trials = @trials.matches_wc('official_title', params[:official_title]) if params[:official_title].present?
      @trials = @trials.with_phase(params[:phase]) if params[:phase].present?
      @trials = @trials.with_purpose(params[:purpose]) if params[:purpose].present?
      @trials = @trials.matches('pilot', params[:pilot]) if params[:pilot].present?
      if params[:pi].present?
        splits = params[:pi].split(',').map(&:strip)
        @trials = @trials.with_pi_lname(splits[0])
        @trials = @trials.with_pi_fname(splits[1]) if splits.length > 1
      end
      if params[:org].present?
        if params[:org_type] == 'Lead Organization'
          @trials = @trials.with_lead_org(params[:org])
        elsif params[:org_type] == 'Sponsor'
          @trials = @trials.with_sponsor(params[:org])
        else
          @trials = @trials.with_any_org(params[:org])
        end
      end
      @trials = @trials.with_study_source(params[:study_source]) if params[:study_source].present?
      @trials = @trials.sort_by_col(params[:sort], params[:order]).group(:'trials.id').page(params[:start]).per(params[:rows])

      # TODO further add another scope
      if params[:trial_status].present?
        Rails.logger.info "params trial_status = #{params[:trial_status].inspect}"
        @trials = @trials.select{|trial| trial.trial_status_wrappers.latest.trial_status.code == params[:trial_status]}
      end
    else
      @trials = []
    end
  end


  def search_pa
    # Pagination/sorting params initialization
    params[:start] = 1 if params[:start].blank?
    params[:rows] = 10 if params[:rows].blank?
    params[:sort] = 'lead_protocol_id' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?

    if params[:protocol_id].present? || params[:official_title].present? || params[:phase].present? || params[:purpose].present? || params[:pilot].present? || params[:pi].present? || params[:org].present?  || params[:study_source].present?
      @trials = Trial.all
      @trials = @trials.with_protocol_id(params[:protocol_id]) if params[:protocol_id].present?
      @trials = @trials.matches_wc('official_title', params[:official_title]) if params[:official_title].present?
      @trials = @trials.with_phase(params[:phase]) if params[:phase].present?
      @trials = @trials.with_purpose(params[:purpose]) if params[:purpose].present?
      @trials = @trials.matches('pilot', params[:pilot]) if params[:pilot].present?
      if params[:pi].present?
        splits = params[:pi].split(',').map(&:strip)
        @trials = @trials.with_pi_lname(splits[0])
        @trials = @trials.with_pi_fname(splits[1]) if splits.length > 1
      end
      if params[:org].present?
        if params[:org_type] == 'Lead Organization'
          @trials = @trials.with_lead_org(params[:org])
        elsif params[:org_type] == 'Sponsor'
          @trials = @trials.with_sponsor(params[:org])
        else
          @trials = @trials.with_any_org(params[:org])
        end
      end
      @trials = @trials.with_study_source(params[:study_source]) if params[:study_source].present?
      @trials = @trials.sort_by_col(params[:sort], params[:order]).group(:'trials.id').page(params[:start]).per(params[:rows])

      # PA fields
      if params[:research_category].present?
        @trials = @trials.with_research_category(params[:research_category])
      end
      if params[:trial_status].present?# && params[:trial_status_latest].present? && params[:trial_status_latest] == "YES"
        @trials = @trials.select{|trial| trial.trial_status_wrappers.latest.trial_status.code == params[:trial_status]}
      end
      #if params[:milestone].present? #&& params[:milestone_latest].present? && params[:milestone_latest] == "YES"
      #  @trials = @trials.select{|trial| !trial.milestone_wrappers.blank? &&  trial.milestone_wrappers.last.milestone.code == params[:milestone]}
      #end
      if params[:processing_status].present? #&& params[:trial_status_latest].present? && params[:trial_status_latest] == "YES"
        Rails.logger.debug " Before params[:processing_status] = #{params[:processing_status].inspect}"
        @trials = @trials.select{|trial| !trial.processing_status_wrappers.blank? && trial.processing_status_wrappers.last.processing_status.code == params[:processing_status]}
        Rails.logger.debug "After @trials = #{@trials.inspect}"
      end
    else
      @trials = []
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_trial
      @trial = Trial.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def trial_params
      params.require(:trial).permit(:nci_id, :lead_protocol_id, :official_title, :pilot, :research_category_id,
                                    :primary_purpose_other, :secondary_purpose_other, :investigator_title,
                                    :program_code, :grant_question, :start_date, :start_date_qual, :primary_comp_date,
                                    :primary_comp_date_qual, :comp_date, :comp_date_qual, :ind_ide_question,
                                    :intervention_indicator, :sec801_indicator, :data_monitor_indicator, :history,
                                    :study_source_id, :phase_id, :primary_purpose_id, :secondary_purpose_id,
                                    :accrual_disease_term_id, :responsible_party_id, :lead_org_id, :pi_id, :sponsor_id,
                                    :investigator_id, :investigator_aff_id, :is_draft, :lock_version,
                                    other_ids_attributes: [:id, :protocol_id_origin_id, :protocol_id, :_destroy],
                                    trial_funding_sources_attributes: [:id, :organization_id, :_destroy],
                                    grants_attributes: [:id, :funding_mechanism, :institute_code, :serial_number, :nci, :_destroy],
                                    trial_status_wrappers_attributes: [:id, :status_date, :why_stopped, :trial_status_id, :_destroy],
                                    ind_ides_attributes: [:id, :ind_ide_type, :ind_ide_number, :grantor, :holder_type_id,
                                                          :nih_nci, :expanded_access, :expanded_access_type_id, :exempt, :_destroy],
                                    oversight_authorities_attributes: [:id, :country, :organization, :_destroy],
                                    trial_documents_attributes: [:id, :_destroy],
                                    submissions_attributes: [:id, :amendment_num, :amendment_date, :_destroy])
    end
end
