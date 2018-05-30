Rails.application.routes.draw do
  root 'characters#new'
  resources :characters
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
