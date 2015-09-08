Rails.application.routes.draw do

  scope "/ctrp" do
    devise_for :users

    mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

    get '/ctrp/', :to => redirect('/index.html')
    resources :organizations do
      collection do
        get 'search'
        post 'search'
        post 'curate'
      end
    end

    resources :source_statuses

    resources :source_contexts

    resources :families do
      collection do
            get 'search'
            post 'search'
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

    resources :comments

    resources :users

    resources :after_signup

    resources :people do
      collection do
        get 'search'
        post 'search'
        post 'curate'
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
    get '/dmzutils/appver' => 'dmz_utils#get_appver'


    # Devise related routes
    devise_scope :user do
      delete "sign_out" => "sessions#destroyrailslogin", :as => :destroyrailslogin_session
      #get "sign_up" => "registrations#new"
    end

    devise_for :ldap_users, :local_users, skip: [ :sessions ]
    devise_for :omniauth_users, :controllers => { :omniauth_callbacks => "omniauth_users/omniauth_callbacks" }
    devise_for :local_users, :controllers => { :registrations => :registrations }
    devise_scope :local_user do
      get 'sign_in' => 'sessions#new', :as => :new_session
      post 'sign_in' => 'sessions#create', :as => :create_session
      post 'sign_out' => 'sessions#destroy', :as => :destroy_session
      post 'sign_up' => 'registrations#create', :as => :create_registration
    end

    resources :study_sources
    resources :phases
    resources :primary_purposes
    resources :secondary_purposes
    resources :responsible_parties
    resources :trials
    resources :protocol_id_origins
    resources :holder_types
    resources :expanded_access_types
    resources :trial_statuses
    resources :research_categories

    get 'funding_mechanisms' => 'util#get_funding_mechanisms'
    get 'institute_codes' => 'util#get_institute_codes'
    get 'nci' => 'util#get_nci'
    get 'nih' => 'util#get_nih'
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
