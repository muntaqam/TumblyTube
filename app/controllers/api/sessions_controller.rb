class Api::SessionsController < ApplicationController

  def identify_email
    @user = User.find_by_email(params[:email])
    if @user
      render "api/users/show"
    else
      render json: ["Email does not exist"], status: 401
    end
  end
  
  def identify_username
    @user = User.find_by_username(params[:username])
    if @user
      render "api/users/show"
    else
      render json: ["Username does not exist"], status: 401
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      login!(@user)
      render "api/users/show"
    else
      render json: ["Invalid username or password"], status: 401
    end
  end

  def destroy
    if current_user
      logout!
      render json: {}
    else
      render json: ["You're not logged in!"], status: 404
    end
  end
end
