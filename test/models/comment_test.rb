# == Schema Information
#
# Table name: comments
#
#  id            :integer          not null, primary key
#  instance_uuid :string(255)
#  content       :text
#  username      :string(255)
#  fullname      :string(255)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  uuid          :string(255)
#  model         :string
#  field         :string
#  parent_id     :integer
#

require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
