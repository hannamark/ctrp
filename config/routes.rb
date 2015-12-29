Rails.application.routes.draw do

  resources :accrual_disease_terms

  resources :trial_documents


namespace "ws" do
  scope '/api' do
    scope '/v1' do
      scope '/people' do
        get '/' => 'api_people#index'
        get '/:id' =>  'api_people#show'
        post '/' => 'api_people#create'
        put  '/:id' =>  'api_people#update'
        put  '/:id/status' =>  'api_people#change_status'
      end

      scope '/trials' do
        get '/' => 'api_trials#index'
        get '/:id' =>  'api_trials#show'
        post '/' => 'api_trials#create'
        put  '/:id' =>  'api_trials#update'
        put  '/:id/status' =>  'api_trials#change_status'
      end

    end
  end
end


  scope "/ctrp" do
    devise_for :users
    root 'ctrp#index'

    mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

    get '/ctrp/', :to => redirect('/index.html')
    resources :organizations do
      collection do
        get 'search'
        post 'search'
        post 'select'
        post 'curate'
        post 'unique', defaults: {format: 'json'}
      end
    end

    resources :source_statuses

    resources :source_contexts

    resources :families do
      collection do
            get 'search'
            post 'search'
            post 'unique', defaults: {format: 'json'}
          end
    end

    resources :families do
      member do
        get  'get_orgs'
      end
      end

    #TODO put related routs in namespaces
    scope '/familystuff' do

      resources :family_statuses, :family_types, :family_relationships, :family_memberships

    end

    resources :family_statuses

    resources :family_types

    resources :family_relationships

    resources :family_memberships

    resources :pa_trials
    get '/pa/trial/:trial_id/checkout/:type', to: 'trials#checkout_trial'
    get '/pa/trial/:trial_id/checkin/:type', to: 'trials#checkin_trial'

    resources :comments
    get '/instance/:uuid/comments/count(/:field)', to: 'comments#count'
    get '/instance/:uuid/comments(/:field)', to: 'comments#comments_for_instance'

    get '/users/search' => 'users#search'
    get '/users/gsa' => 'users#gsa'
    post '/users/search' => 'users#search'
    # All the User routes(non-devise) should be accessed by username
    # rather that "id" in order to prevent exposing the "id"
    resources :users, param: :username do
      member do
        post 'approve'
        post 'disapprove'
      end
    end

    resources :people do
      collection do
        get 'search'
        post 'search'
        post 'curate'
        post 'unique', defaults: {format: 'json'}
      end
    end

    resources :po_affiliations
    resources :po_affiliation_statuses

    get '/countries' => 'util#get_countries'
    get '/states' => 'util#get_states'
    get '/backoffice' => 'backoffice#index'
    get '/backoffice/download_log'
    get '/backoffice/static_members'

    #DmzUtils routes
    get '/dmzutils/app_version' => 'dmz_utils#get_app_version'
    get '/dmzutils/app_rel_milestone' => 'dmz_utils#get_app_rel_milestone'
    get '/dmzutils/login_bulletin' => 'dmz_utils#get_login_bulletin'
    get '/dmzutils/git_info' => 'dmz_utils#get_git_info'

    # Devise related routes
    devise_scope :user do
      delete "sign_out" => "sessions#destroyrailslogin", :as => :destroyrailslogin_session
    end

    devise_for :ldap_users, :local_users, skip: [ :sessions ]
    devise_for :omniauth_users, :controllers => { :omniauth_callbacks => "omniauth_users/omniauth_callbacks" }
    devise_scope :local_user do
      get 'sign_in' => 'sessions#new', :as => :new_session
      post 'sign_in' => 'sessions#create', :as => :create_session
      post 'sign_out' => 'sessions#destroy', :as => :destroy_session
      post 'sign_up' => 'registrations#create', :as => :create_registration
      get 'change_password' => 'registrations#edit', :as => :edit_registration
      post 'change_password' => 'registrations#update', :as => :update_registration
    end

    scope '/pa' do
      get 'nih_nci_div_pa' => 'util#get_nih_nci_div_pa'
      get 'nih_nci_prog_pa' => 'util#get_nih_nci_prog_pa'
    end

    scope '/registry' do
      resources :study_sources
      resources :phases
      resources :primary_purposes
      resources :secondary_purposes
      resources :accrual_disease_terms
      resources :responsible_parties
      resources :trials do
        collection do
          get 'search'
          post 'search'
          get 'search_pa'
          post 'search_pa'
          post 'validate_status'
        end
      end

      resources :protocol_id_origins
      resources :holder_types
      resources :expanded_access_types
      resources :trial_statuses
      resources :processing_statuses
      resources :milestones
      resources :research_categories
      resources :trial_documents do
        collection do
          get 'download/:id' => 'trial_documents#download'
        end
      end


      get 'funding_mechanisms' => 'util#get_funding_mechanisms'
      get 'institute_codes' => 'util#get_institute_codes'
      get 'nci' => 'util#get_nci'
      get 'nih' => 'util#get_nih'

      get 'accepted_file_types' => 'util#get_accepted_file_types'
    end
  end
  # Devise related routes

  #get '/ctrp/', :to => redirect('/index.html')

  # Devise related routes
  #devise_for :users
  #devise_for :ldap_users, :local_users, skip: [ :sessions ]
  #devise_for :omniauth_users, :controllers => { :omniauth_callbacks => "omniauth_users/omniauth_callbacks" }
  #devise_scope :local_user do
  #   get 'sign_in' => 'sessions#new', :as => :new_session
  #   post 'sign_in' => 'sessions#create', :as => :create_session
  #   delete 'sign_out' => 'sessions#destroy', :as => :destroy_session
  #end


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
