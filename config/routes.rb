Rails.application.routes.draw do
  
  namespace :api, defaults: {format: :json} do
    get "/identify_email/:email", 
    to: "sessions#identify_email", 
    format: false, 
    constraints: { email: %r{[^\/]+}}, 
    param: :email

    get "/identify_username/:username", to: "sessions#identify_username", param: :username

    resource :session, only: [:create, :destroy, :show]
    resource :users, only: [:create]

    resources :videos, only: [:index, :show, :create, :destroy, :update] do 
      resources :comments, only: [:index, :create]
    end
  end

  root "static_pages#root"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
