class Api::LikesController < ApplicationController

  before_action :require_login

  def create
    @like = Like.new(like_params)
    @like.liker_id = current_user.id

    if @like.save!
      render :show
    else
      render json: @like.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @like = Like.find_by_id(params[:id])
    
    if @like.destroy
      render :show
    else
      render json: @like.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def like_params
    params.require(:like).permit(:version, :likeable_id, :likeable_type)
  end
end
