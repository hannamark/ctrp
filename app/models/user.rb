# == Schema Information
#
# Table name: users
#
#  id                          :integer          not null, primary key
#  email                       :string(255)      default(""), not null
#  username                    :string(255)      default(""), not null
#  encrypted_password          :string(255)      default(""), not null
#  type                        :string
#  provider                    :string(255)
#  uid                         :string(255)
#  role                        :string(255)
#  reset_password_token        :string(255)
#  reset_password_sent_at      :datetime
#  remember_created_at         :datetime
#  sign_in_count               :integer          default(0), not null
#  current_sign_in_at          :datetime
#  last_sign_in_at             :datetime
#  current_sign_in_ip          :string(255)
#  last_sign_in_ip             :string(255)
#  failed_attempts             :integer          default(0), not null
#  unlock_token                :string(255)
#  locked_at                   :datetime
#  created_at                  :datetime
#  updated_at                  :datetime
#  first_name                  :string
#  last_name                   :string
#  street_address              :text
#  zipcode                     :string
#  country                     :string
#  state                       :string
#  middle_name                 :string
#  prs_organization_name       :string
#  receive_email_notifications :boolean
#  role_requested              :string
#  approved                    :boolean          default(FALSE), not null
#  organization_id             :integer
#  source                      :string
#
# Indexes
#
#  index_users_on_approved              (approved)
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_organization_id       (organization_id)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_unlock_token          (unlock_token) UNIQUE
#  index_users_on_username              (username) UNIQUE
#

class  User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  #devise  :registerable,
  #       :recoverable, :trackable, :validatable,
   #      :confirmable, :lockable, :timeoutable, :omniauthable
  devise   :timeoutable,  :validatable
  belongs_to :organization

  scope :approved, -> { where(approved: true) }
  scope :not_approved, -> { where(approved: false) }

  #ROLES = %i[ROLE_READONLY ROLE_SITE_ADMIN ROLE_SUPER ROLE_ADMIN ROLE_CURATOR]
  ROLES = %i[ROLE_READONLY ROLE_SUPER ROLE_CURATOR]

  validates :username, presence: true, uniqueness: { case_sensitive: false }

  attr_accessor :password

  def to_param
    username
  end

  def self.get_roles
    ROLES
  end

  def get_all_users_by_role
    users = []
    if !self.role.blank? && self.approved
      # A Super Admin User can see all the Users and can approve access to the user
      if self.role == "ROLE_SUPER" && self.organization_id.blank?
        users = User.all
       elsif self.role == "ROLE_SUPER"   && !self.organization_id.blank? #self.role == "ROLE_SITE_ADMIN"
        # A Site Admin User can see all the Users in its respective organization and
        # also can approve the user's site admin privileges
        unless self.organization_id.nil?
          users = User.all.select{|x| x.organization_id==self.organization_id}
        end
      end
    end
    users
  end

  def process_approval
    # When an ADMIN approves of the user request for privileges, the role is updated
    # if it is not already chosen and the approved field is set to true
    if self.role.blank?
      if self.organization_id.blank?
        self.role = "ROLE_READONLY"
      else
        self.role = "ROLE_SITE_ADMIN"
      end
    end

    self.approved = true
    self.save!

  end

  def process_disapproval
    unless self.role.blank?
      self.approved = false
      # TODO should role be nullified?
      self.save!
    end
  end

  def get_privileges
    privileges_json = []
    if self.role.nil?
      return []
    end

    privileges_json = case self.role
                        when "ROLE_READONLY"
                          [{type: "READONLY", enabled: true}]
                        when  "ROLE_SITE_ADMIN"
                          [{type: "READONLY", enabled: true}, {type: "ADMIN", enabled: true}]
                        when  "ROLE_SUPER"
                          [{type: "READONLY", enabled: true}, {type: "CURATOR", enabled: true}, {type: "ADMIN", enabled: true}]
                        when  "ROLE_ADMIN"
                          [{type: "READONLY", enabled: true}, {type: "ADMIN", enabled: true}]
                        when  "ROLE_CURATOR"
                          [{type: "READONLY", enabled: true}, {type: "CURATOR", enabled: true}]
                      end
  end

  def ldap_before_save
    Rails.logger.info "In ldap_before_save"
    self.email = Devise::LDAP::Adapter.get_ldap_param(self.username,"mail").first
    Rails.logger.info "In ldap_before_save email = #{email.inspect}"
  end

  def self.find_for_google_oauth2(access_token, signed_in_resource=nil)
    data = access_token.info
    user = User.where(:provider => access_token.provider, :uid => access_token.uid ).first
    if user
      return user
    else
      registered_user = User.where(:email => access_token.info.email).first
      if registered_user
        return registered_user
      else
        user = User.new(provider:access_token.provider,
                        username: data["email"],
                        email: data["email"],
                        uid: access_token.uid ,
                        password: Devise.friendly_token[0,20]
        )
        user.skip_confirmation!
        user.save
        user
      end
    end
  end

  def self.custom_find_by_username(username_value)
    user = nil
    unless username_value.blank?
      user = User.find_by_username(username_value.downcase)
    end
    Rails.logger.debug "User, custom_find_by_username user = #{user.inspect}"
    user
  end

  def log_debug
    if self.is_a?(LocalUser)
      Rails.logger.debug "\nIn User, log_debug, LocalUser #{self.inspect} " unless self.blank?
    elsif self.is_a?(LdapUser)
      Rails.logger.debug "In User, log_debug, LdapUser #{self.inspect} " unless self.blank?
    else
      Rails.logger.debug "In User, log_debug,OmniauthUser #{self.inspect} " unless self.blank?
    end
  end

  private

  def compare_username(username_value)
    self.username.downcase == username_value.downcase
  end


end
