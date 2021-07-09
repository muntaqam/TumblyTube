class Api::VideosController < ApplicationController

  def index
    @videos = Video.all
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

  private
  def video_params 
    params.require(:video).permit(:title, :description, :video_file)
  end
end