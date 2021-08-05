class Api::CommentsController < ApplicationController

  before_action :require_login, only: [:create, :destroy]

  def index 
    @comments = Video.find_by_id(params[:video_id]).comments
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
      render json: @comment.body
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :video_id, :parent_comment_id)
  end
end