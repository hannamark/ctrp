json.array!(@accrual_disease_terms) do |accrual_disease_term|
  json.extract! accrual_disease_term, :id, :code, :name
  json.url accrual_disease_term_url(accrual_disease_term, format: :json)
end
