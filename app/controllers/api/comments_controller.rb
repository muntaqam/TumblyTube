class Api::CommentsController < ApplicationController
  
  def index 
    @comments = Comment.all
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

  end

  private
  def comment_params
    params.require(:comment).permit(:body, :video_id, :parent_comment_id)
  end
end