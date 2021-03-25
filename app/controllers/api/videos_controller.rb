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
    @video = Video.new(video_pararms)
    if @video.save
      render :show
    else
      render json: @video.errors.full_messages, status: 401
    end
  end

  def destroy
      @video = Video.find(params[:id])
      @video.destroy
  end

  private
  def video_params 
    params.require(:video).permit(:creator_id, :title, :description)
  end
end