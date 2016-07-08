class ValidationRuleController < ApplicationController
  def index
    @validation_rules = ValidationRule.all
  end

  def show
  end

  def validate
  end
end
