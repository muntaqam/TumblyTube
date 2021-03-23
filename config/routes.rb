Rails.application.routes.draw do
  
  namespace :api, defaults: {format: :json} do
    get "/identify_email/:email", 
    to: "sessions#identify_email", 
    format: false, 
    constraints: { email: %r{[^\/]+}}, 
    param: :email
    get "/identify_username/:username", to: "sessions#identify_username", param: :username
    resource :users, only: [:create]
    resource :session, only: [:create, :destroy, :show]
  end

  root "static_pages#root"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
