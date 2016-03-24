class PostsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote]
  # def index
  #   respond_with Post.all
  #   puts 'juasjuas' * 100
  #   puts Post.all.inspect
  # end

  def create
    respond_with Post.create(post_params)
  end

  def show
    respond_with Post.find(params[:id])
  end

  def upvote

  end

  private
  def post_params
    params.require(:post).permit(:content, :title)
  end

end
