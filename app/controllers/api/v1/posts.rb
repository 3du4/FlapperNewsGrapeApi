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
            requires :link, type: String, desc: 'link'
            requires :title, type: String, desc: 'link'
          end
          Post.create({title: params[:title], link: params[:link]})
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