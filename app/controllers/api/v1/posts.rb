module API
  module V1
    class Posts < Grape::API
      include API::V1::Defaults

      resource :posts do
        desc 'Return all posts'
        get '', root: :posts do
          Post.all
        end

        desc 'create new post'
        post '', root: :posts do
          params do
            requires :content, type: String, desc: 'content'
            requires :title, type: String, desc: 'title'
          end
          Post.create({title: params[:title], content: params[:content]})
        end

        desc 'upvote'
        put '/:id', root: :posts do
          post = Post.find(params[:id])
          post.increment!(:upvotes)
        end


      end
    end
  end
end