Rails.application.routes.draw do
  # namespace :api do
  #   post "/signup", to: "users#create"
  #   get "/me", to: "users#show"
  #   post "/login", to: "sessions#create"
  #   delete "/logout", to: "sessions#destroy"
  # end

  resources :portfolios
  resources :positions
  resources :prices, only: [:index, :show, :create]
  resources :stocks, except: [:update]
  resources :users

  # all other routes will be load our React application
  # this route definition matches:
  # - *path: all paths not matched by one of the routes defined above
  # - constraints:
  #   - !req.xhr?: it's not a XHR (fetch) request
  #   - req.format.html?: it's a request for a HTML document
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
