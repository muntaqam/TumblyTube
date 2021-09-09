class Api::SubscriptionsController < ApplicationController

  before_action :require_login

  def create
    if current_user.id == params[:subscription][:subscriber_id].to_i
      @subscription = Subscription.new(subscription_params)

      if @subscription.save!
        render :show
      else
        render json: @subscription.errors.full_message, status: :unprocessable_entity
      end
    else
      render json: ["Subscriber must be loggedin"], status: 404
    end
  end

  def destroy
    @subscription = Subscription.find_by(subscriber_id: current_user.id, subscribee_id: params[:id])

    if @subscription.destroy
      render :show
    else
      render json: @subscription.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def subscription_params
    params.require(:subscription).permit(:subscriber_id, :subscribee_id)
  end
end
