class Api::VideosController < ApplicationController

  before_action :require_login, only: [:create, :destroy]
  
  def index
    @videos = Video.all
    render :index
  end

  def create
    @video = Video.new(video_params)
    @video.creator_id = current_user.id
    if @video.save
      render :show
    else
      render json: @video.errors.full_messages, status: 401
    end
  end

  def destroy
    @video = Video.find(params[:id])

    if @video.destroy
      render :index
    else
      render json: @video.errors.full_messages, status: 401
    end
  end

  def add_views
    @video = Video.find_by_id(params[:id])
    @video.views += 1
    @video.save
    render :views
  end

  private
  def video_params 
    params.require(:video).permit(:title, :description, :video_file)
  end
end