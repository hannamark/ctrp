# == Schema Information
#
# Table name: rep_data_set_methods
#
#  id         :integer          not null, primary key
#  code       :string(255)
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  uuid       :string(255)
#

class RepDataSetMethod < ActiveRecord::Base
end
