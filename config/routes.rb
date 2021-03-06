Rails.application.routes.draw do

  scope '', controller: 'application', :format => false do
    get '/health-checker' => :health_checker
  end

  scope '', controller: 'web/home', :format => false do
    get '/' => :index
    get '/unsupported-client' => :unsupported_client
    get '/service-unavailable' => :service_unavailable
  end

  scope '', controller: 'web/user', :format => false do
    get '/login' => :login, as: 'login'
    get '/logout' => :logout
    get '/sign-up' => :sign_up
    get '/reset-password' => :reset_password
    get '/update-password' => :update_password
    get '/verify-email' => :verify_email
    get '/verify-device' => :verify_device
    get '/mfa' => :mfa
    get '/invalid-token' => :invalid_token
  end

  scope 'settings', controller: 'web/user_setting', :format => false do
    get '/team' => :team
    get '/company-information' => :company_information
  end

  scope "#{GlobalConstant::Environment.url_prefix}", controller: 'web/economy', :format => false do
    get '/' => :dashboard, as: 'dashboard'
    get '/token/setup' => :token_setup, as: 'token_setup'
    get '/token/deploy' => :token_deploy, as: 'token_deploy'
    get '/token/mint' => :token_mint, as: 'token_mint'
    get '/token/mint-progress' => :token_mint_progress, as: 'token_mint_progress'
  end

  scope "#{GlobalConstant::Environment.url_prefix}/developer", controller: 'web/developer', :format => false do
    get '/' => :developer, as: 'developer'
  end

  scope "#{GlobalConstant::Environment.url_prefix}/verify-sda", controller: 'web/developer', :format => false do
    get '/' => :verify_sda
  end

  # Enabling this route only for Non Production Sandbox ENV
  scope "#{GlobalConstant::Environment.sandbox_sub_url_prefix}", controller: 'web/test_economy', :format => false do
    get '/wallet' => :test_economy, as: 'wallet'
  end

  namespace "#{GlobalConstant::Environment.url_prefix}" do
    # ST Api sidekiq web interface endpoint
    mount ApiSidekiqServer => '/sidekiq-admin-interface'
  end

  # Route not found handler. Should be the last entry here
  match '*permalink', to: 'application#not_found', via: :all

end