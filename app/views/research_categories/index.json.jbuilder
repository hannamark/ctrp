json.array!(@research_categories) do |research_category|
  json.extract! research_category, :id
  json.url research_category_url(research_category, format: :json)
end
