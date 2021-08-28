class Api::CommentsController < ApplicationController

  before_action :require_login, only: [:create, :destroy]

  def index 
    num_limit = params[:numLimit]
    
    video = Video.find_by_id(params[:video_id])
    @comments = video.comments.where(parent_comment_id: nil).order(:id).limit(num_limit)
  end
  
  # send more comments for Intersection Observer
  def more_comments
    num_offset = params[:numOffset]
    num_limit = params[:numLimit]
    
    video = Video.find_by_id(params[:video_id])
    @comments = video.comments.where(parent_comment_id: nil).order(:id).offset(num_offset).limit(num_limit)

    render :index
  end

  def create
    @comment = current_user.comments.new(comment_params)

    if @comment.save!
      render :show
    else
      render json: @comment.errors.full_messages, status: 401
    end
  end

  def destroy
    @comment = Comment.find_by_id(params[:id])

    if @comment.destroy
      render :show
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :video_id, :commenter_id, :parent_comment_id)
  end
end