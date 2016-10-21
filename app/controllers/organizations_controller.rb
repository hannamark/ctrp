class OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :edit, :update, :destroy]
  ## Please comment the next two lines if you donot want the Authorization checks
  before_filter :wrapper_authenticate_user, :except => [:search, :select] unless Rails.env.test?
  before_action :set_paper_trail_whodunnit, only: [:create,:update, :destroy, :curate]

  respond_to :html, :json
  before_filter :set_controller_variables

  def set_controller_variables
    @ctepId = SourceContext.find_by_code("CTEP").id
    @nlmId = SourceContext.find_by_code("NLM").id
    @ctrpId = SourceContext.find_by_code("CTRP").id
  end

  # GET /organizations
  # GET /organizations.json
  def index
    @organizations = Organization.all_orgs_data()
  end

  # GET /organizations/1
  # GET /organizations/1.json
  def show
  end

  # GET /organizations/new
  def new
    @organization = Organization.new
  end

  # GET /organizations/1/edit
  def edit
  end

  # POST /organizations
  # POST /organizations.json
  def create
    @organization = Organization.new(organization_params)
    @organization.processing_status = 'Incomplete'
    @organization.source_status_id = SourceStatus.ctrp_context_source_statuses.find_by_code('ACT').id
    @organization.source_context_id = SourceContext.find_by_code('CTRP').id
    @organization.created_by = @current_user.username unless @current_user.nil?
    @organization.updated_by = @organization.created_by
    @organization.created_at = Time.zone.now
    @organization.updated_at = Time.zone.now

    respond_to do |format|
      if @organization.save
        format.html { redirect_to @organization, notice: 'Organization was successfully created.' }
        format.json { render :show, status: :created, location: @organization }
      else

        format.html { render :new }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /organizations/1
  # PATCH/PUT /organizations/1.json
  def update
    @organization.updated_by = @current_user.username unless @current_user.nil?
    if organization_params[:ctrp_id] && @organization.ctrp_id != organization_params[:ctrp_id] && ( @organization.source_context_id == @ctepId || @organization.source_context_id == @nlmId ) then
      respond_to do |format|
        @organization = associateTwoOrgs organization_params[:ctrp_id], @organization
        if @organization.source_context_id == @ctepId
          old_orgs = Organization.where({:ctrp_id => organization_params[:ctrp_id], :source_context_id => @organization.source_context_id})
                         .where('id <> ' + (@organization.id).to_s).where('source_context_id <> ' + (@nlmId).to_s)
          old_orgs.update_all(ctrp_id: nil) if !old_orgs.blank?
        end
        if @organization.save
          @associated_orgs = filterSearch Organization.all_orgs_data().where(:ctrp_id => @organization.ctrp_id)
          format.json { render :associated }
        else
          format.html { render :edit }
          format.json { render json: @organization.errors, status: :unprocessable_entity }
        end
      end
    elsif @organization.source_context_id == @ctrpId
      respond_to do |format|
        if @organization.update(organization_params.except(:ctrp_id))
          format.html { redirect_to @organization, notice: 'Organization was successfully updated.' }
          format.json { render :show, status: :ok, location: @organization }
        else
          format.html { render :edit }
          format.json { render json: @organization.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # DELETE /organizations/1
  # DELETE /organizations/1.json
  def destroy
    respond_to do |format|
      if @organization.destroy
        format.html { redirect_to organizations_url, notice: 'Organization was successfully destroyed.' }
        format.json { head :no_content }
      else
        format.html { redirect_to people_url, alert: @person.errors }
        format.json { render json: @organization.errors, status: :unprocessable_entity  }
      end
    end
  end



  def curate

    respond_to do |format|
      if Organization.nullify_duplicates(params)
        format.html { redirect_to organizations_url, notice: 'Organization was successfully curated.' }
      else
        format.json { render json: @organization.errors, status: :unprocessable_entity  }
      end

    end

  end

  def select

    Rails.logger.debug "In Organization Controller, select"
    Rails.logger.debug "In Organization Controller, params = #{params.select}"

    if local_user_signed_in?
      user = current_local_user
      Rails.logger.debug "In Organization Controller, current_local_user = #{current_local_user.inspect}"
    elsif ldap_user_signed_in?
      user = current_ldap_user
      Rails.logger.debug "In Organization Controller, current_ldap_user = #{current_ldap_user.inspect}"
    end
    if !params.blank? && !params["selected_org_id"].blank?
      org_id = params["selected_org_id"]
      old_org_id = user.organization_id
      if org_id == "0"
        user.organization_id = nil
      else
        user.organization_id = org_id
        # When a User changes his organization, he must be reapproved
        if !old_org_id.nil?
          user.user_status_id = UserStatus.find_by_code('INR').id
        end
      end
      user.save!
    end
    respond_to do |format|
        format.html { redirect_to users_path }
    end

  end

  def associated
    @associated_orgs = []
    if params[:id]
      active_org = Organization.find(params[:id])
      if !active_org.blank? && !active_org.ctrp_id.blank? && User.org_write_access(@current_user)
        @active_context = SourceContext.find(active_org.source_context_id).name
        @associated_orgs = filterSearch Organization.all_orgs_data().where(:ctrp_id => active_org.ctrp_id)
      elsif !active_org.blank?
        @associated_orgs = filterSearch Organization.all_orgs_data().where(:id => active_org.id)
        @active_context = SourceContext.find(active_org.source_context_id).name unless @associated_orgs.blank?
      end
    elsif User.org_write_access(@current_user) && params[:remove_ids] && params[:remove_ids] & params[:ctrp_id]
      params[:remove_ids].each do |org_id|
        (disAssociateTwoOrgs ctrpOrgId, Organization.find(org_id)).save
        @associated_orgs = filterSearch Organization.all_orgs_data().where(:ctrp_id => active_org.ctrp_id)
      end
    end

  end

  def search
    # Pagination/sorting params initialization
    Rails.logger.info "In Organization Controller, search"
    params[:start] = 1 if params[:start].blank?
    if params[:allrows] != true
      params[:rows] = 20 if params[:rows].blank?
    else
      params[:rows] = nil
    end
    params[:sort] = 'name' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?
    # Param alias is boolean, use has_key? instead of blank? to avoid false positive when the value of alias is false
    params[:alias] = true if !params.has_key?(:alias)
    if parse_request_header
      wrapper_authenticate_user
    end
    @organizations = []
    org_keys = %w[ name source_context source_id source_status family_name address address2 city
                    ctrp_id state_province country postal_code email phone updated_by date_range_arr]
    # Scope chaining, reuse the scope definition
    if (params.keys & org_keys).any?
      # get complete resultset
      @organizations = filterSearch Organization.all_orgs_data()
      # order
      sortBy = params[:sort]
      if ['source_context', 'source_status'].include? sortBy
        sortBy  += "_name"
      end
      @organizations = @organizations.order("#{sortBy} #{params[:order]}")
      # get total: faster here than in jbuilder (jbuilder counts array; here we use SQL COUNT(*) - faster)
      @total = @organizations.distinct.size
      # finally paginate
      unless params[:rows].nil? || @organizations.blank?
        @organizations = Kaminari.paginate_array(@organizations).page(params[:start]).per(params[:rows])
      end
    end
  end

  def filterSearch resultOrgs
    if @current_user && User.org_write_access(@current_user)
      resultOrgs = resultOrgs.where("source_contexts.name" => params[:source_contextfilter]) if params[:source_contextfilter].present?
      resultOrgs = resultOrgs.matches("source_statuses.name", params[:source_status]) if params[:source_status].present?
      resultOrgs = resultOrgs.matches("source_contexts.name", params[:source_context]) if params[:source_context].present?
    else
      resultOrgs = resultOrgs.matches("source_statuses.name", "Active").matches("source_contexts.name", "CTRP")
    end
    # direct matches from model
    matches_to_accept = 'ctrp_id,country,processing_status'
    matches_to_accept.split(",").each do |filter|
      resultOrgs = resultOrgs.matches(filter, params[filter]) if params[filter].present?
    end
    wc_matches_to_accept = 'address,address2,updated_by,city,state_province,postal_code,email,phone'
    wc_matches_to_accept.split(",").each do |filter|
      resultOrgs = resultOrgs.matches_wc(filter, params[filter], params[:wc_search]) if params[filter].present? && params[filter] != '*'
    end
    # direct from joins
    resultOrgs = resultOrgs.where("unexpired_family_membership.family_name" => nil) if params[:no_family].present?
    resultOrgs = resultOrgs.where("service_requests.name" => params[:service_request_name]) if params[:service_request_name].present?
    # manipulated
    resultOrgs = resultOrgs.match_source_id_from_joins(params[:source_id]) if params[:source_id].present?
    resultOrgs = resultOrgs.match_name_from_joins(params[:name], params[:alias], params[:wc_search]) if params[:name].present?
    resultOrgs = resultOrgs.updated_date_range(params[:date_range_arr]) if params[:date_range_arr].present? and params[:date_range_arr].count == 2
    resultOrgs = resultOrgs.with_family(params[:family_name]) if params[:family_name].present? && params[:family_name] != '*'
    return resultOrgs
  end

  def clone
    ctepOrg = Organization.find(params[:org_id])
    ctepOrg.processing_status = 'Complete'
    ctepOrg.updated_by = @current_user.username unless @current_user.nil?
    ctepOrg.updated_at = Time.zone.now
    @organization = Organization.new(ctepOrg.attributes)
    @organization.id                = nil
    @organization.source_context_id = SourceContext.find_by_code("CTRP").id
    @organization.created_by = ctepOrg.updated_by
    @organization.created_at = Time.zone.now
    respond_to do |format|
      if @organization.save
        ctepOrg = associateTwoOrgs @organization.ctrp_id, ctepOrg
        ctepOrg.save
        @associated_orgs = filterSearch Organization.all_orgs_data().where(:ctrp_id => @organization.ctrp_id)
        format.json { render :associated }
      else
        format.html { render :edit }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  def associateTwoOrgs ctrpOrgId, org
    org.ctrp_id            = ctrpOrgId
    org.service_request_id = ServiceRequest.find_by_code('NULL').id
    org.association_date = DateTime.now
    return org
  end

  def disAssociateTwoOrgs ctrpOrgId, org
    org.ctrp_id            = nil
    org.service_request_id = nil
    org.association_date = nil
    return org
  end

  def countOrgsWithSameName
    count = 0
    #Get count of organization record with the same name - can be the existing record (if the user is on the edit screen)
    if params.has_key?(:org_name) && params.has_key?(:source_context_id)
      count = Organization.where("lower(name)=?", params[:org_name].downcase).where("source_context_id=?", params[:source_context_id]).count;
    end
    return count
  end

  #Method to check for Uniqueness while creating organizations - check on name & source context. These are to be presented as warnings and not errors, hence cannot be part of before-save callback.
  def unique
    is_unique = true
    if params[:org_exists] == true && params[:org_name] && params[:org_id]
      #edit
      @dbOrgs = Organization.where("id <> #{params[:org_id]} AND name = '#{params[:org_name]}'")
      #if on the Edit screen, then check for name changes and ignore if database & screen names are the same.
      #if params[:org_name] == @dbOrg.name, both are equal. Must not warn
      #However if on the edit screen and the user types in a name that is the same as another org, then complain, both are different. Must warn.
      if !@dbOrgs.blank?
        is_unique = false
      end
    elsif params[:org_exists] == true && params[:org_name]
      #new
      @dbOrgs = Organization.find_by_name(params[:org_name])

      is_unique = true unless !@dbOrgs.blank?
    end

    respond_to do |format|
      format.json {render :json => {:name_unique => is_unique}}
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_organization
    @organization = Organization.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def organization_params
    params.require(:organization).permit(:source_id, :name, :address, :address2, :address3, :city, :state_province, :postal_code,
                                         :country, :email, :phone, :extension, :source_status_id, :ctrp_id, :association_date,
                                         :source_context_id, :lock_version, :processing_status,
                                         name_aliases_attributes: [:id,:organization_id,:name,:_destroy])
  end
end
