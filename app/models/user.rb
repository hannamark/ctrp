# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#  failed_attempts        :integer          default(0), not null
#  unlock_token           :string
#  locked_at              :datetime
#  created_at             :datetime
#  updated_at             :datetime
#
# Indexes
#
#  index_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_unlock_token          (unlock_token) UNIQUE
#

class  User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  #devise  :registerable,
  #       :recoverable, :trackable, :validatable,
   #      :confirmable, :lockable, :timeoutable, :omniauthable
  devise   :timeoutable,  :validatable

  ROLES = %i[ROLE_ADMIN ROLE_CURATOR]
  validates :username, presence: true, uniqueness: { case_sensitive: false }

  attr_accessor :password

  def ldap_before_save
    Rails.logger.info "Hi in ldap_before_save"
    self.email = Devise::LDAP::Adapter.get_ldap_param(self.username,"mail").first
    Rails.logger.info "Hi in ldap_before_save email = #{email.inspect}"
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
end

=begin
class LdapUser < User
  devise :ldap_authenticatable, :rememberable, :trackable
end

class LocalUser < User
  devise :database_authenticatable, :registerable, :confirmable, :recoverable, :trackable
end
=end
