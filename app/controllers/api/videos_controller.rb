class Api::VideosController < ApplicationController

  before_action :require_login, only: [:create, :destroy]
  
  def index
    if params[:filter]
      @videos = Video.search(params[:filter])
    else
      @videos = Video.all
    end
    render :index
  end

  def show
    @video = Video.find(params[:id])
    render :show
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
    @video.destroy
    render :index
  end

  def add_views
    @video = Video.find_by_id(params[:id])
    @video.views += 1
    @video.save
    render :show
  end

  private
  def video_params 
    params.require(:video).permit(:title, :description, :video_file)
  end
end