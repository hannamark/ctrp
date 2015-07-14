# == Schema Information
#
# Table name: app_settings
#
#  id          :integer          not null, primary key
#  description :text
#  value       :string(255)
#  big_value   :text
#  code        :string(255)
#  name        :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  uuid        :string(255)
#

class AppSetting < ActiveRecord::Base
end
